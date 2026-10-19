
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator';
import { auth, db, storage } from '../firebaseConfig';

const OcorrenciasContext = createContext(null);

const critMap = {
  'Crítico': 'Crítica',
  'Alto': 'Alta',
  'Médio': 'Média',
  'Baixo': 'Baixa',
};

const critApp = {
  'Crítica': 'Crítico',
  'Alta': 'Alto',
  'Média': 'Médio',
  'Baixa': 'Baixo',
};

const cor = {
  'Crítico': '#C62828',
  'Alto': '#F77F00',
  'Médio': '#F4B400',
  'Baixo': '#5FAF6D',
};

const pontos = {
  'Crítico': 10,
  'Alto': 8,
  'Médio': 5,
  'Baixo': 2,
};

const statusApp = {
  Pendente: 'Aberta',
};

const statusDb = {
  Aberta: 'Pendente',
};

const LIMITE_FOTO = 5 * 1024 * 1024;

function mapear(d, id) {
  const criticidade = critApp[d.criticidade] || d.criticidade;

  return {
    ...d,
    id,
    km: d.km || d.trecho || '',
    foto: d.fotoUrl || '',
    status: statusApp[d.status] || d.status,
    criticidade,
    cor: cor[criticidade],
    pontuacao: pontos[criticidade],
    dataRegistro: d.criadoEm?.toMillis?.() || Date.now(),
  };
}

function erroAmigavel(e) {
  console.error('EcoTrack Firebase:', e);
  throw e;
}

async function prepararFoto(uri) {
  // Reduz imagens grandes e converte para JPEG.
  // Mantemos o limite de 5 MB exigido pelo Storage.
  const imagem = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 1280 } }],
    {
      compress: 0.65,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  const resposta = await fetch(imagem.uri);

  if (!resposta.ok) {
    throw new Error('Não foi possível processar a foto selecionada.');
  }

  const blob = await resposta.blob();

  if (blob.size >= LIMITE_FOTO) {
    throw new Error(
      'A foto comprimida ainda ultrapassa 5 MB. Selecione outra imagem.'
    );
  }

  return blob;
}

export function OcorrenciasProvider({ children }) {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [carregandoOcorrencias, setCarregandoOcorrencias] = useState(true);
  const [erroOcorrencias, setErroOcorrencias] = useState(null);

  useEffect(() => {
    let unsubscribeDados = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeDados();
      setOcorrencias([]);
      setErroOcorrencias(null);

      if (!user) {
        setCarregandoOcorrencias(false);
        return;
      }

      setCarregandoOcorrencias(true);

      unsubscribeDados = onSnapshot(
        collection(db, 'ocorrencias'),
        (snap) => {
          const registros = snap.docs
            .map((documento) =>
              mapear(documento.data(), documento.id)
            )
            .sort((a, b) => b.dataRegistro - a.dataRegistro);

          setOcorrencias(registros);
          setErroOcorrencias(null);
          setCarregandoOcorrencias(false);
        },
        (err) => {
          setErroOcorrencias(err.message);
          setCarregandoOcorrencias(false);
          console.error('Erro ao consultar ocorrências:', err);
        }
      );
    });

    return () => {
      unsubscribeDados();
      unsubscribeAuth();
    };
  }, []);

  async function adicionarOcorrencia(item) {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      throw new Error('Faça login para registrar a ocorrência.');
    }

    let fotoUrl = '';
    let fotoCaminho = '';
    let fotoEnviada = false;

    try {
      // 1. Comprimir e enviar a foto, quando existir.
      if (item.foto) {
        const blob = await prepararFoto(item.foto);

        fotoCaminho =
          `ocorrencias/${uid}/${Date.now()}_` +
          `${Math.random().toString(36).slice(2)}.jpg`;

        const arquivoRef = ref(storage, fotoCaminho);

        await uploadBytes(arquivoRef, blob, {
          contentType: 'image/jpeg',
        });

        fotoEnviada = true;
        fotoUrl = await getDownloadURL(arquivoRef);
      }

      // 2. Registrar a ocorrência no Firestore.
      const criado = await addDoc(
        collection(db, 'ocorrencias'),
        {
          titulo: `${item.tipo} - KM ${item.km}`,
          descricao: item.descricao,
          tipo: item.tipo,
          criticidade:
            critMap[item.criticidade] || item.criticidade,
          status: 'Pendente',
          usuarioId: uid,
          responsavelId: uid,
          km: item.km,
          trecho: item.km,
          protocolo: item.protocolo,
          perfilRegistro: item.perfilRegistro,
          latitude:
            item.latitude === '' || item.latitude == null
              ? null
              : Number(item.latitude),
          longitude:
            item.longitude === '' || item.longitude == null
              ? null
              : Number(item.longitude),
          fotoUrl,
          fotoCaminho,
          criadoEm: serverTimestamp(),
          atualizadoEm: serverTimestamp(),
        }
      );

      return {
        ...item,
        id: criado.id,
        foto: fotoUrl,
        status: 'Aberta',
      };
    } catch (e) {
      // Se a foto foi enviada, mas o registro falhou,
      // tentamos remover o arquivo para evitar lixo no Storage.
      if (fotoEnviada && fotoCaminho) {
        await deleteObject(ref(storage, fotoCaminho)).catch(
          (erroExclusao) => {
            console.warn(
              'Não foi possível limpar a foto após o erro:',
              erroExclusao
            );
          }
        );
      }

      erroAmigavel(e);
    }
  }

  async function editarOcorrencia(id, dados) {
    const campos = {};

    for (const chave of ['tipo', 'descricao', 'criticidade']) {
      if (dados[chave] !== undefined) {
        campos[chave] =
          chave === 'criticidade'
            ? critMap[dados[chave]] || dados[chave]
            : dados[chave];
      }
    }

    campos.atualizadoEm = serverTimestamp();

    try {
      await updateDoc(
        doc(db, 'ocorrencias', String(id)),
        campos
      );
    } catch (e) {
      erroAmigavel(e);
    }
  }

  async function editarDescricao(id, descricao) {
    return editarOcorrencia(id, { descricao });
  }

  async function atualizarStatus(id) {
    const item = ocorrencias.find((o) => o.id === id);

    if (!item || item.status === 'Concluída') {
      return;
    }

    const status =
      item.status === 'Aberta'
        ? 'Em andamento'
        : 'Concluída';

    try {
      await updateDoc(
        doc(db, 'ocorrencias', String(id)),
        {
          status: statusDb[status] || status,
          atualizadoEm: serverTimestamp(),
        }
      );

      return status;
    } catch (e) {
      erroAmigavel(e);
    }
  }

  async function removerOcorrencia(id) {
    const item = ocorrencias.find((o) => o.id === id);

    try {
      await deleteDoc(
        doc(db, 'ocorrencias', String(id))
      );

      if (item?.fotoCaminho) {
        await deleteObject(
          ref(storage, item.fotoCaminho)
        ).catch((e) => {
          console.warn('Foto não excluída:', e);
        });
      }
    } catch (e) {
      erroAmigavel(e);
    }
  }

  return (
    <OcorrenciasContext.Provider
      value={{
        ocorrencias,
        carregandoOcorrencias,
        erroOcorrencias,
        adicionarOcorrencia,
        atualizarStatus,
        editarDescricao,
        editarOcorrencia,
        removerOcorrencia,
      }}
    >
      {children}
    </OcorrenciasContext.Provider>
  );
}

export function useOcorrencias() {
  return useContext(OcorrenciasContext);
}
