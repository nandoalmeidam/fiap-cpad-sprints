import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from
  '@react-native-async-storage/async-storage';

/*
 * Contexto global responsável pelo gerenciamento
 * das notificações da aplicação.
 *
 * As notificações são armazenadas localmente para
 * permanecerem disponíveis após fechar o aplicativo.
 */

const NotificacoesContext = createContext();

export function NotificacoesProvider({
  children,
}) {

  const [notificacoes, setNotificacoes] =
    useState([]);

  const [carregouNotificacoes, setCarregouNotificacoes] =
    useState(false);

  /*
   * Recupera as notificações armazenadas
   * anteriormente no dispositivo.
   */
  useEffect(function () {

    async function carregarNotificacoes() {

      try {

        const dados =
          await AsyncStorage.getItem(
            'notificacoes'
          );

        if (dados) {

          setNotificacoes(
            JSON.parse(dados)
          );
        }

      } catch (erro) {

        console.log(
          'Erro ao carregar notificações:',
          erro
        );

      } finally {

        setCarregouNotificacoes(true);
      }
    }

    carregarNotificacoes();

  }, []);

  /*
   * Mantém as notificações sincronizadas
   * com o armazenamento local.
   */
  useEffect(function () {

    if (!carregouNotificacoes) {
      return;
    }

    async function salvarNotificacoes() {

      try {

        await AsyncStorage.setItem(
          'notificacoes',
          JSON.stringify(notificacoes)
        );

      } catch (erro) {

        console.log(
          'Erro ao salvar notificações:',
          erro
        );
      }
    }

    salvarNotificacoes();

  }, [
    notificacoes,
    carregouNotificacoes,
  ]);

  /*
   * Cria uma nova notificação destinada
   * ao perfil Supervisor.
   */
  function adicionarNotificacao(
    novaNotificacao
  ) {

    setNotificacoes(function (
      notificacoesAtuais
    ) {

      return [
        novaNotificacao,
        ...notificacoesAtuais,
      ];
    });
  }

  /*
   * Marca uma notificação específica
   * como visualizada.
   */
  function marcarComoLida(id) {

    setNotificacoes(function (
      notificacoesAtuais
    ) {

      return notificacoesAtuais.map(
        function (item) {

          if (item.id === id) {

            return {
              ...item,
              lida: true,
            };
          }

          return item;
        }
      );
    });
  }

  // Remove todas as notificações
  // armazenadas na central.
  function limparNotificacoes() {

    setNotificacoes([]);
  }

  const quantidadeNaoLidas =
    notificacoes.filter(
      function (item) {

        return (
          item.destinatario ===
            'Supervisor' &&
          !item.lida
        );
      }
    ).length;

  return (

    <NotificacoesContext.Provider
      value={{
        notificacoes,
        adicionarNotificacao,
        marcarComoLida,
        limparNotificacoes,
        quantidadeNaoLidas,
      }}
    >

      {children}

    </NotificacoesContext.Provider>
  );
}

/*
 * Hook utilizado pelas telas que precisam
 * acessar as notificações.
 */
export function useNotificacoes() {

  return useContext(
    NotificacoesContext
  );
}