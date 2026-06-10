import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from
'@react-native-async-storage/async-storage';

/*
 * Contexto global responsável pelo gerenciamento
 * das ocorrências da aplicação.
 *
 * Centraliza operações de leitura, atualização,
 * remoção e persistência dos registros.
 */

const OcorrenciasContext =
  createContext();

export function OcorrenciasProvider({
  children,
}) {

  const [
    ocorrenciaSelecionada,
    setOcorrenciaSelecionada,
  ] = useState(null);

  // Dados iniciais utilizados quando não existem
  // ocorrências persistidas no dispositivo.
  const [ocorrencias, setOcorrencias] =
    useState([
      {
        id: 1,
        km: '123+400',
        tipo: 'Vegetação',
        criticidade: 'Crítico',
        cor: '#E53935',
        pontuacao: 9.8,
        status: 'Aberta',
      },

      {
        id: 2,
        km: '98+200',
        tipo: 'Erosão',
        criticidade: 'Alto',
        cor: '#FB8C00',
        pontuacao: 8.3,
        status: 'Em andamento',
      },

      {
        id: 3,
        km: '44+300',
        tipo: 'Descarte irregular',
        criticidade: 'Médio',
        cor: '#FBC02D',
        pontuacao: 5.4,
        status: 'Aberta',
      },

      {
        id: 4,
        km: '160+100',
        tipo: 'Vegetação',
        criticidade: 'Baixo',
        cor: '#43A047',
        pontuacao: 3.1,
        status: 'Concluída',
      },
    ]);

  // Mantém a persistência sincronizada sempre
  // que a lista de ocorrências for alterada.
  useEffect(function () {

    async function carregarOcorrencias() {

      const dados =
        await AsyncStorage.getItem(
          'ocorrencias'
        );

      if (dados) {

        setOcorrencias(
          JSON.parse(dados)
        );
      }
    }

    carregarOcorrencias();

  }, []);

  useEffect(function () {

    async function salvarOcorrencias() {

      await AsyncStorage.setItem(
        'ocorrencias',

        JSON.stringify(
          ocorrencias
        )
      );
    }

    salvarOcorrencias();

  }, [ocorrencias]);

  function adicionarOcorrencia(
    novaOcorrencia
  ) {

    setOcorrencias([
      novaOcorrencia,
      ...ocorrencias,
    ]);
  }

  // Fluxo de status:
  // Aberta -> Em andamento -> Concluída
  function atualizarStatus(id) {
    const novaLista =
      ocorrencias.map(function (item) {

        if (item.id === id) {

          if (item.status === 'Aberta') {

            return {
              ...item,
              status: 'Em andamento',
            };
          }

          if (
            item.status ===
            'Em andamento'
          ) {

            return {
              ...item,
              status: 'Concluída',
            };
          }

          return {
            ...item,
            status: 'Aberta',
          };
        }

        return item;
      });

    setOcorrencias(novaLista);
  }

  function editarDescricao(
    id,
    novaDescricao
  ) {

    const novaLista =
      ocorrencias.map(function (item) {

        if (item.id === id) {

          return {
            ...item,
            descricao:
              novaDescricao,
          };
        }

        return item;
      });

    setOcorrencias(novaLista);
  }

  function removerOcorrencia(id) {
    const novaLista =
      ocorrencias.filter(function (item) {

        return item.id !== id;
      });

    setOcorrencias(novaLista);
  }

  return (
    <OcorrenciasContext.Provider
      value={{
        ocorrencias,
        adicionarOcorrencia,
        atualizarStatus,
        editarDescricao,
        removerOcorrencia,
        ocorrenciaSelecionada,
        setOcorrenciaSelecionada,
      }}
    >
      {children}
    </OcorrenciasContext.Provider>
  );
}

// Hook de acesso ao contexto de ocorrências.
export function useOcorrencias() {
  return useContext(
    OcorrenciasContext
  );
}