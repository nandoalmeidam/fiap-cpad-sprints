import { useState, useEffect  } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import RegistroScreen from './screens/RegistroScreen';
import {
  OcorrenciasProvider,
} from './context/OcorrenciasContext';
import HistoricoScreen from './screens/HistoricoScreen';
import DetalhesScreen from './screens/DetalhesScreen';
import ConfirmacaoScreen from './screens/ConfirmacaoScreen';
import RankingScreen from './screens/RankingScreen';
import PerfilScreen from './screens/PerfilScreen';

/*
 * Componente principal do EcoTrack.
 *
 * Responsável pelo controle de navegação,
 * autenticação e gerenciamento das telas
 * da aplicação.
 */

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [perfil, setPerfil] = useState('Supervisor');
  // Armazena a ocorrência selecionada para
  // visualização na tela de detalhes.
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  // Controla a tela atualmente exibida
  // no fluxo principal da aplicação.
  const [tela, setTela] = useState('splash');

  // Exibe a tela de abertura por alguns
  // segundos antes de iniciar o fluxo de login.
  useEffect(function () {
    setTimeout(function () {
      setTela('login');
    }, 3000);
  }, []);

  /*
 * Realiza validações básicas dos campos
 * informados antes de liberar o acesso
 * ao sistema.
 */
  function validarLogin() {
    if (usuario === '') {
      setErro('Digite seu e-mail.');
      return;
    }

    if (!usuario.includes('@')) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha === '') {
      setErro('Digite sua senha.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    setErro('');
    setTela('home');
  }

  /*
 * Limpa os dados da sessão atual e retorna
 * o usuário para a tela de autenticação.
 */
  function sairDoApp() {
    setUsuario('');
    setSenha('');
    setErro('');
    setTela('login');
  }

  /*
 * Navegação baseada no estado atual da aplicação.
 * Cada valor da variável "tela" determina qual
 * componente será exibido ao usuário.
 */
  return (
    <OcorrenciasProvider>
      <SafeAreaView style={{ flex: 1 }}>

        {tela === 'splash' && (
          <SplashScreen />
        )}

        {/* Tela de autenticação do usuário */}
        {tela === 'login' && (
          <SafeAreaView style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.logo}>EcoTrack</Text>

              <Text style={styles.titulo}>
                Bem-vindo de volta!
              </Text>

              <Text style={styles.subtitulo}>
                Faça login para continuar
              </Text>

              <Text style={styles.label}>Usuário</Text>

              <View style={styles.inputContainer}>
                <Image
                  source={require('./assets/icons/iconeUsuarioLoginCinza.png')}
                  style={styles.icon}
                />

                <TextInput
                  placeholder="Digite seu usuário"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={usuario}
                  onChangeText={setUsuario}
                />
              </View>

              <Text style={styles.label}>Senha</Text>
                <View style={styles.inputContainer}>

                  <Image
                    source={require('./assets/icons/iconeSenhaLoginCinza.png')}
                    style={styles.icon}
                  />

                  <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor="#999"
                    secureTextEntry={!mostrarSenha}
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                  />

                  <TouchableOpacity
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                  >
                    <Image
                      source={
                        mostrarSenha
                          ? require('./assets/icons/iconeOlhoAbertoCinza.png')
                          : require('./assets/icons/iconeOlhoFechadoCinza.png')
                      }
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>

                </View>

                {erro !== '' && (
                  <Text style={styles.erroTexto}>
                    {erro}
                  </Text>
                )}

              <TouchableOpacity>
                <Text style={styles.esqueciSenha}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>

              <Text style={styles.perfilTitulo}>
                Perfil de acesso
              </Text>

              <View style={styles.perfilBox}>
                <TouchableOpacity
                  style={[
                    styles.perfilOpcao,
                    perfil === 'Supervisor' &&
                      styles.perfilAtivo,
                  ]}
                  onPress={() =>
                    setPerfil('Supervisor')
                  }
                >
                  <Image
                    source={
                      perfil === 'Supervisor'
                        ? require('./assets/icons/iconeSupervisorLoginBranco.png')
                        : require('./assets/icons/iconeSupervisorLoginCinza.png')
                    }
                    style={styles.iconePerfil}
                  />
                  <Text
                    style={[
                      styles.perfilTexto,
                      perfil === 'Supervisor' &&
                        styles.perfilTextoAtivo,
                    ]}
                  >
                    Supervisor
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.perfilOpcao,
                    perfil === 'Campo' &&
                      styles.perfilAtivo,
                  ]}
                  onPress={() =>
                    setPerfil('Campo')
                  }
                >

                  <Image
                    source={
                      perfil === 'Campo'
                        ? require('./assets/icons/iconeCampoLoginCinza.png')
                        : require('./assets/icons/iconeCampoLoginRoxo.png')
                    }
                    style={styles.iconePerfil}
                  />
                  <Text
                    style={[
                      styles.perfilTexto,
                      perfil === 'Campo' &&
                        styles.perfilTextoAtivo,
                    ]}
                  >
                    Campo
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.botao}
                // onPress={validarLogin}
                onPress={() => setTela('home')}
              >
                <Text style={styles.botaoTexto}>
                  Entrar
                </Text>
              </TouchableOpacity>

              <Text style={styles.versao}>
                Versão 2.0.9
              </Text>
            </View>
          </SafeAreaView>
        )}

        {/* Dashboard principal do sistema */}
        {tela === 'home' && (
          <HomeScreen setTela={setTela} />
        )}

        {/* Cadastro de novas ocorrências */}
        {tela === 'registro' && (
          <RegistroScreen
            setTela={setTela}

            setOcorrenciaSelecionada={
              setOcorrenciaSelecionada
            }
          />
        )}

        {/* Consulta dos registros cadastrados */}
        {tela === 'historico' && (
          <HistoricoScreen
            setTela={setTela}
            setOcorrenciaSelecionada={
              setOcorrenciaSelecionada
            }
          />
        )}

        {/* Priorização das ocorrências por criticidade */}
        {tela === 'ranking' && (
          <RankingScreen
            setTela={setTela}
          />
        )}

        {/* Visualização completa de uma ocorrência */}
        {tela === 'detalhes' &&
          ocorrenciaSelecionada && (
            <DetalhesScreen
              ocorrencia={ocorrenciaSelecionada}
              setTela={setTela}
            />
        )}

        {/* Informações e configurações do usuário */}
        {tela === 'perfil' && (
          <PerfilScreen
            setTela={setTela}
            sairDoApp={sairDoApp}
          />
        )}

        {/* Feedback após o envio de uma ocorrência */}
        {tela === 'confirmacao' && (
          <ConfirmacaoScreen
            setTela={setTela}

            ocorrenciaSelecionada={
              ocorrenciaSelecionada
            }
          />
        )}

      </SafeAreaView>
    </OcorrenciasProvider>
  );
}

const AZUL = '#5F21F3';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: AZUL,
    textAlign: 'center',
    marginBottom: 22,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 38,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
    marginBottom: 18,
  },

  icon: {
    width: 22,
    height: 22,
    tintColor: '#9E9E9E',
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  esqueciSenha: {
    color: AZUL,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginTop: -4,
    marginBottom: 34,
  },

  perfilTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },

  perfilBox: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },

  perfilOpcao: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  perfilAtivo: {
    backgroundColor: AZUL,
  },

  perfilTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },

  perfilTextoAtivo: {
    color: '#FFFFFF',
  },

  botao: {
    backgroundColor: AZUL,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 2,
  },

  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  versao: {
    textAlign: 'center',
    color: '#999999',
    marginTop: 34,
    fontSize: 13,
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: '#9E9E9E',
  },

  iconePerfil: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  erroTexto: {
    color: '#E53935',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -8,
    marginBottom: 12,
  },

});