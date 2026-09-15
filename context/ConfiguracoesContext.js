import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from
  '@react-native-async-storage/async-storage';


const ConfiguracoesContext =
  createContext();


export function ConfiguracoesProvider({
  children,
}) {

  const [gpsAtivo, setGpsAtivo] =
    useState(true);

  const [
    notificacoesAtivas,
    setNotificacoesAtivas,
  ] = useState(true);  

  const [carregouConfiguracoes, setCarregouConfiguracoes] =
    useState(false);


  /*
   * Recupera as preferências salvas
   * anteriormente no dispositivo.
   */
  useEffect(function () {

    async function carregarConfiguracoes() {

      try {

        const dados =
          await AsyncStorage.getItem(
            'configuracoes'
          );

        if (dados) {

          const configuracoes =
            JSON.parse(dados);

          if (
            typeof configuracoes.gpsAtivo ===
            'boolean'
          ) {

            setGpsAtivo(
              configuracoes.gpsAtivo
            );
          }

          if (
            typeof configuracoes.notificacoesAtivas ===
            'boolean'
          ) {

            setNotificacoesAtivas(
                configuracoes.notificacoesAtivas
          );
          }
        }

      } catch (erro) {

        console.log(
          'Erro ao carregar configurações:',
          erro
        );

      } finally {

        setCarregouConfiguracoes(true);
      }
    }

    carregarConfiguracoes();

  }, []);


  /*
   * Mantém as preferências sincronizadas
   * com o armazenamento local.
   */
  useEffect(function () {

    if (!carregouConfiguracoes) {
      return;
    }

    async function salvarConfiguracoes() {

      try {

        await AsyncStorage.setItem(
            'configuracoes',
            JSON.stringify({
                gpsAtivo,
                notificacoesAtivas,
            })
        );

      } catch (erro) {

        console.log(
          'Erro ao salvar configurações:',
          erro
        );
      }
    }

    salvarConfiguracoes();

  }, [
    gpsAtivo,
    notificacoesAtivas,
    carregouConfiguracoes,
  ]);


  return (

    <ConfiguracoesContext.Provider
        value={{
            gpsAtivo,
            setGpsAtivo,
            notificacoesAtivas,
            setNotificacoesAtivas,
        }}
    >

      {children}

    </ConfiguracoesContext.Provider>
  );
}


export function useConfiguracoes() {

  return useContext(
    ConfiguracoesContext
  );
}