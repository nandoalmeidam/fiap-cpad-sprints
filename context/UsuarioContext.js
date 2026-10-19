import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { auth, db } from '../firebaseConfig';

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregouUsuarios, setCarregouUsuarios] = useState(false);

  // Aguarda a restauração da sessão do Firebase.
  useEffect(() => {
    const cancelarObservador = onAuthStateChanged(
      auth,
      () => {
        setCarregouUsuarios(true);
      },
      (erro) => {
        console.log('Erro na sessão Firebase:', erro);
        setCarregouUsuarios(true);
      }
    );

    return cancelarObservador;
  }, []);

  // Busca os dados do usuário no Firestore.
  async function buscarPerfil(uid) {
    const referencia = doc(db, 'usuarios', uid);
    const resultado = await getDoc(referencia);

    if (!resultado.exists()) {
      throw new Error('Perfil não encontrado no Firestore.');
    }

    return {
      uid,
      ...resultado.data(),
    };
  }

    // Lista os agentes de Campo cadastrados no Firestore.
    async function listarAgentesCampo() {
      if (
        !auth.currentUser ||
        !usuarioLogado ||
        usuarioLogado.perfil !== 'Supervisor'
      ) {
        throw new Error('Acesso permitido apenas ao Supervisor.');
      }

      const referencia = collection(db, 'usuarios');

      const consulta = query(
        referencia,
        where('perfil', '==', 'Campo')
      );

      const resultado = await getDocs(consulta);

            return resultado.docs.map((documento) => ({
              ...documento.data(),
              uid: documento.id,
            }));
          }

        // Atualiza os dados operacionais de um agente de Campo.
        async function atualizarDadosAgente(uid, equipe, trecho, regiao) {
          if (
            !auth.currentUser ||
            !usuarioLogado ||
            usuarioLogado.perfil !== 'Supervisor' ||
            usuarioLogado.ativo !== true
          ) {
            return {
              sucesso: false,
              mensagem: 'Acesso permitido apenas ao Supervisor.',
            };
          }

          const equipeLimpa = equipe.trim();
          const trechoLimpo = trecho.trim();
          const regiaoLimpa = regiao.trim();

          if (
            !uid ||
            !equipeLimpa ||
            !trechoLimpo ||
            !regiaoLimpa ||
            equipeLimpa.length > 100 ||
            trechoLimpo.length > 100 ||
            regiaoLimpa.length > 100
          ) {
            return {
              sucesso: false,
              mensagem: 'Preencha os campos com até 100 caracteres.',
            };
          }

          try {
            const referencia = doc(db, 'usuarios', uid);
            const resultado = await getDoc(referencia);

            if (
              !resultado.exists() ||
              resultado.data().perfil !== 'Campo'
            ) {
              return {
                sucesso: false,
                mensagem: 'Agente de Campo não encontrado.',
              };
            }

            await updateDoc(referencia, {
              equipe: equipeLimpa,
              trecho: trechoLimpo,
              regiao: regiaoLimpa,
            });

            return {
              sucesso: true,
              mensagem: 'Dados do agente atualizados com sucesso.',
            };
          } catch (erro) {
            console.log(
              'Erro ao atualizar agente:',
              erro.code || erro.message
            );

            return {
              sucesso: false,
              mensagem: 'Não foi possível atualizar o agente.',
            };
          }
        }

        // Autentica e confere o perfil de acesso.
        async function autenticar(email, senha, perfil) {
    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        senha
      );

      const dadosUsuario = await buscarPerfil(
        credencial.user.uid
      );

      if (
        dadosUsuario.ativo !== true ||
        dadosUsuario.perfil !== perfil
      ) {
        await signOut(auth);

        return {
          sucesso: false,
          usuario: null,
          mensagem: 'Perfil de acesso não autorizado.',
        };
      }

      setUsuarioLogado(dadosUsuario);

      return {
        sucesso: true,
        usuario: dadosUsuario,
      };
    } catch (erro) {
      console.log('Erro no login Firebase:', erro.code || erro.message);

      await signOut(auth).catch(() => {});
      setUsuarioLogado(null);

      return {
        sucesso: false,
        usuario: null,
        mensagem:
          erro.code === 'auth/invalid-credential'
            ? 'E-mail ou senha incorretos.'
            : 'Não foi possível autenticar. Verifique sua conexão e tente novamente.',
      };
    }
  }

  // Encerra a sessão autenticada.
  async function sair() {
    await signOut(auth);
    setUsuarioLogado(null);
  }

  // Altera a senha do usuário autenticado no Firebase.
  async function alterarSenha(perfil, senhaAtual, novaSenha) {
    const usuario = auth.currentUser;

    if (!usuario || !usuario.email || !usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Nenhum usuário autenticado.',
      };
    }

    if (usuarioLogado.perfil !== perfil) {
      return {
        sucesso: false,
        mensagem: 'Perfil de acesso não autorizado.',
      };
    }

    if (!senhaAtual || !novaSenha || novaSenha.length < 6) {
      return {
        sucesso: false,
        mensagem: 'Verifique os campos e a nova senha.',
      };
    }

    if (senhaAtual === novaSenha) {
      return {
        sucesso: false,
        mensagem: 'A nova senha deve ser diferente da atual.',
      };
    }

    try {
      const credencial = EmailAuthProvider.credential(
        usuario.email,
        senhaAtual
      );

      await reauthenticateWithCredential(usuario, credencial);

      await updatePassword(usuario, novaSenha);

      return {
        sucesso: true,
        mensagem: 'Senha alterada com sucesso.',
      };
    } catch (erro) {
      console.log(
        'Erro ao alterar senha:',
        erro.code || erro.message
      );

      let mensagem = 'Não foi possível alterar a senha. Tente novamente.';

      if (erro.code === 'auth/invalid-credential' ||
          erro.code === 'auth/wrong-password') {
        mensagem = 'A senha atual está incorreta.';
      } else if (erro.code === 'auth/weak-password') {
        mensagem = 'A nova senha não atende aos requisitos de segurança.';
      } else if (erro.code === 'auth/too-many-requests') {
        mensagem = 'Muitas tentativas. Aguarde e tente novamente.';
      } else if (erro.code === 'auth/network-request-failed') {
        mensagem = 'Erro de conexão. Verifique sua internet.';
      }

      return {
        sucesso: false,
        mensagem,
      };
    }
  }

  // Atualiza o nome do usuário autenticado no Firestore.
  async function atualizarNome(novoNome) {
    const usuario = auth.currentUser;
    const nomeLimpo = novoNome.trim();

    if (!usuario || !usuarioLogado) {
      return {
        sucesso: false,
        mensagem: 'Nenhum usuário autenticado.',
      };
    }

    if (nomeLimpo.length < 2 || nomeLimpo.length > 100) {
      return {
        sucesso: false,
        mensagem: 'O nome deve ter entre 2 e 100 caracteres.',
      };
    }

    try {
      const referencia = doc(db, 'usuarios', usuario.uid);

      await updateDoc(referencia, {
        nome: nomeLimpo,
      });

      setUsuarioLogado((anterior) => ({
        ...anterior,
        nome: nomeLimpo,
      }));

      return {
        sucesso: true,
        mensagem: 'Nome atualizado com sucesso.',
      };
    } catch (erro) {
      console.log(
        'Erro ao atualizar nome:',
        erro.code || erro.message
      );

      return {
        sucesso: false,
        mensagem:
          'Não foi possível atualizar o nome no Firestore.',
      };
    }
  }

    return (
      <UsuarioContext.Provider
        value={{
          usuarioLogado,
          carregouUsuarios,
          autenticar,
          listarAgentesCampo,
          atualizarDadosAgente,
          alterarSenha,
          atualizarNome,
          sair,
        }}
      >

      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UsuarioContext);
}
