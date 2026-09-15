import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from
  '@react-native-async-storage/async-storage';


const UsuarioContext = createContext();


const usuariosIniciais = [
  {
    id: 1,
    nome: 'Carlos Mendes',
    email: 'supervisor@ecotrack.com.br',
    senha: '123456',
    perfil: 'Supervisor',
  },
  {
    id: 2,
    nome: 'João Silva',
    email: 'campo@ecotrack.com.br',
    senha: '123456',
    perfil: 'Campo',
  },
];


export function UsuarioProvider({
  children,
}) {

  const [
    usuarios,
    setUsuarios,
  ] = useState(
    usuariosIniciais
  );

  const [
    carregouUsuarios,
    setCarregouUsuarios,
  ] = useState(false);

  // Armazena o usuário autenticado
  // durante a sessão atual.
  const [
    usuarioLogado,
    setUsuarioLogado,
  ] = useState(null);


  /*
   * Recupera os usuários armazenados
   * anteriormente no dispositivo.
   */
  useEffect(function () {

    async function carregarUsuarios() {

      try {

        const dados =
          await AsyncStorage.getItem(
            'usuarios'
          );

        if (dados) {

          setUsuarios(
            JSON.parse(dados)
          );

        }

      } catch (erro) {

        console.log(
          'Erro ao carregar usuários:',
          erro
        );

      } finally {

        setCarregouUsuarios(true);

      }
    }

    carregarUsuarios();

  }, []);


  /*
   * Mantém os usuários sincronizados
   * com o armazenamento local.
   */
  useEffect(function () {

    if (!carregouUsuarios) {
      return;
    }

    async function salvarUsuarios() {

      try {

        await AsyncStorage.setItem(
          'usuarios',
          JSON.stringify(
            usuarios
          )
        );

      } catch (erro) {

        console.log(
          'Erro ao salvar usuários:',
          erro
        );

      }
    }

    salvarUsuarios();

  }, [
    usuarios,
    carregouUsuarios,
  ]);


  /*
   * Valida as credenciais de acesso
   * de acordo com o perfil escolhido.
   */
  function autenticar(
    email,
    senha,
    perfil
  ) {

    const usuarioEncontrado =
      usuarios.find(
        function (item) {

          return (
            item.email
              .toLowerCase() ===
              email
                .trim()
                .toLowerCase() &&
            item.senha === senha &&
            item.perfil === perfil
          );
        }
      );

    if (!usuarioEncontrado) {

      return {
        sucesso: false,
        usuario: null,
      };

    }

    setUsuarioLogado(
        usuarioEncontrado
    );

    return {
      sucesso: true,
      usuario: usuarioEncontrado,
    };
  }


  /*
   * Permite alterar a senha do usuário
   * correspondente ao perfil atual.
   */
  function alterarSenha(
    perfil,
    senhaAtual,
    novaSenha
  ) {

    const usuarioEncontrado =
      usuarios.find(
        function (item) {

          return (
            item.perfil === perfil
          );
        }
      );

    if (!usuarioEncontrado) {

      return {
        sucesso: false,
        mensagem:
          'Usuário não encontrado.',
      };
    }


    if (
      usuarioEncontrado.senha !==
      senhaAtual
    ) {

      return {
        sucesso: false,
        mensagem:
          'A senha atual está incorreta.',
      };
    }


    setUsuarios(function (
      usuariosAtuais
    ) {

      return usuariosAtuais.map(
        function (item) {

          if (
            item.id ===
            usuarioEncontrado.id
          ) {

            return {
              ...item,
              senha: novaSenha,
            };
          }

          return item;
        }
      );
    });


    return {
      sucesso: true,
      mensagem:
        'Senha alterada com sucesso.',
    };
  }


  return (

    <UsuarioContext.Provider
      value={{
        usuarios,
        usuarioLogado,
        carregouUsuarios,
        autenticar,
        alterarSenha,
      }}
    >

      {children}

    </UsuarioContext.Provider>
  );
}


export function useUsuario() {

  return useContext(
    UsuarioContext
  );
}