import { useState  } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import BottomTab from '../components/BottomTab';

const AZUL = '#5F21F3';

/*
 * Tela de perfil do usuário
 *
 * Apresenta informações operacionais,
 * opções de configuração e ações de conta
 */

export default function PerfilScreen({
  setTela,
  sairDoApp,
}) {

  // Armazena a data e hora da última
  // sincronização realizada pelo usuário
  const [ultimaSincronizacao, setUltimaSincronizacao] = useState('20/05/2026 - 14:45');

  // Controla a exibição das configurações do aplicativo
  const [mostrarConfiguracoes, setMostrarConfiguracoes] = useState(false);

  // Controla a exibição da área de alteração de senha.
  const [mostrarAlterarSenha, setMostrarAlterarSenha] = useState(false);

  // Campos simulados para atualização de senha.
  const [novaSenha, setNovaSenha] = useState('');

  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Preferências simuladas
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  const [gpsAtivo, setGpsAtivo] = useState(true);

  // Controla a exibição do modo de edição do perfil
  const [modoEdicao, setModoEdicao] = useState(false);

  // Informações editáveis do colaborador
  const [nome, setNome] = useState('Carlos Mendes');

  const [cargo, setCargo] = useState('Supervisor de Conservação');

  const [equipe, setEquipe] = useState('Frente 03');

  const [trecho, setTrecho] = useState('SP-270');

  const [regiao, setRegiao] = useState('Sorocaba - SP');

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => setTela('home')}
        >
          <Image
            source={require('../assets/icons/iconeVoltarHeaderBranco.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Perfil
        </Text>

        {/* Alterna entre visualização e edição do perfil */}
        <TouchableOpacity
          onPress={function () {
            setModoEdicao(!modoEdicao);
          }}
        >
          <Image
            source={require('../assets/icons/iconeLapisBranco.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        <View style={styles.topoPerfil}>

          <View style={styles.avatarContainer}>

            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.avatar}
            />

          </View>

          <View style={styles.textosPerfil}>

            {modoEdicao ? (

              <>

                <TextInput
                  style={styles.inputPerfil}
                  value={nome}
                  onChangeText={setNome}
                />

                <TextInput
                  style={styles.inputPerfil}
                  value={cargo}
                  onChangeText={setCargo}
                />

              </>

            ) : (

              <>

                <Text style={styles.nome}>
                  {nome}
                </Text>

                <Text style={styles.cargo}>
                  {cargo}
                </Text>

              </>

            )}

          </View>

        </View>

        <Text style={styles.infoTitulo}>
          Informações
        </Text>

        {/* Informações operacionais do colaborador */}
        <View style={styles.infoCard}>

          <View style={styles.infoLinha}>

            <Image
              source={require('../assets/icons/iconeEquipePerfilRoxo.png')}
              style={styles.iconePerfil}
            />

            <Text style={styles.infoLabel}>
              Equipe
            </Text>

            {modoEdicao ? (

              <TextInput
                style={styles.inputInfo}
                value={equipe}
                onChangeText={setEquipe}
              />

            ) : (

              <Text style={styles.infoValor}>
                {equipe}
              </Text>

            )}

          </View>

          <View style={styles.infoLinha}>

            <Image
              source={require('../assets/icons/iconeTrechoPerfilRoxo.png')}
              style={styles.iconePerfil}
            />

            <Text style={styles.infoLabel}>
              Trecho
            </Text>

            {modoEdicao ? (

              <TextInput
                style={styles.inputInfo}
                value={trecho}
                onChangeText={setTrecho}
              />

            ) : (

              <Text style={styles.infoValor}>
                {trecho}
              </Text>

            )}

          </View>

          <View
            style={[
              styles.infoLinha,
              {
                borderBottomWidth: 0,
              },
            ]}
          >

            <Image
              source={require('../assets/icons/iconeRegiaoRoxo.png')}
              style={styles.iconePerfil}
            />

            <Text style={styles.infoLabel}>
              Região
            </Text>

            {modoEdicao ? (

              <TextInput
                style={styles.inputInfo}
                value={regiao}
                onChangeText={setRegiao}
              />

            ) : (

              <Text style={styles.infoValor}>
                {regiao}
              </Text>

            )}

          </View>

          {/* Ações disponíveis durante a edição do perfil */}
          {modoEdicao && (

            <View style={styles.botoesEdicao}>

              <TouchableOpacity
                style={styles.botaoCancelar}

                onPress={function () {

                  setNome('Carlos Mendes');
                  setCargo('Supervisor de Conservação');
                  setEquipe('Frente 03');
                  setTrecho('SP-270');
                  setRegiao('Sorocaba - SP');

                  setModoEdicao(false);

                }}
              >

                <Text style={styles.botaoCancelarTexto}>
                  Cancelar
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSalvar}

                onPress={function () {

                  setModoEdicao(false);

                  Alert.alert(
                    'Perfil',
                    'Informações atualizadas com sucesso.'
                  );

                }}
              >

                <Text style={styles.botaoSalvarTexto}>
                  Salvar alterações
                </Text>

              </TouchableOpacity>

            </View>

          )}

        </View>

        {/* Ações e configurações disponíveis para o usuário */}
        <View style={styles.menuCard}>

          <TouchableOpacity
            style={styles.menuLinha}

            // Exibe ou oculta o formulário
            // de alteração de senha.
            onPress={function () {
              setMostrarAlterarSenha(
                !mostrarAlterarSenha
              );
            }}
          >

            <View style={styles.menuEsquerda}>

              <Image
                source={require('../assets/icons/iconeSenhaPerfilPreto.png')}
                style={styles.iconePerfil}
              />

              <Text style={styles.menuTexto}>
                Alterar senha
              </Text>

            </View>

            <Text style={styles.menuSeta}>
              {mostrarAlterarSenha ? '⌄' : '›'}
            </Text>

          </TouchableOpacity>

          {/* Formulário de alteração de senha */}
          {mostrarAlterarSenha && (

            <View style={styles.senhaContainer}>

              <Text style={styles.senhaLabel}>
                Nova senha
              </Text>

              <TextInput
                style={styles.inputSenha}
                secureTextEntry
                value={novaSenha}
                onChangeText={setNovaSenha}
                placeholder="Digite a nova senha"
              />

              <Text style={styles.senhaLabel}>
                Confirmar senha
              </Text>

              <TextInput
                style={styles.inputSenha}
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                placeholder="Confirme a nova senha"
              />

              <TouchableOpacity
                style={styles.botaoSalvarSenha}

                onPress={function () {

                  if (
                    novaSenha.length < 6
                  ) {

                    Alert.alert(
                      'Senha inválida',
                      'A senha deve possuir pelo menos 6 caracteres.'
                    );

                    return;
                  }

                  if (
                    novaSenha !== confirmarSenha
                  ) {

                    Alert.alert(
                      'Erro',
                      'As senhas não coincidem.'
                    );

                    return;
                  }

                  Alert.alert(
                    'Senha alterada',
                    'Senha atualizada com sucesso.'
                  );

                  setNovaSenha('');
                  setConfirmarSenha('');
                  setMostrarAlterarSenha(false);

                }}
              >

                <Text style={styles.botaoSalvarSenhaTexto}>
                  Salvar senha
                </Text>

              </TouchableOpacity>

            </View>

          )}

          <TouchableOpacity
            style={styles.menuLinha}
              // Atualiza a data da última sincronização
              // e exibe confirmação para o usuário.
              onPress={function () {
                const agora =
                  new Date();

                const dataHora =
                  agora.toLocaleString('pt-BR');

                setUltimaSincronizacao(
                  dataHora
                );

                Alert.alert(
                  'Sincronização',
                  'Dados sincronizados com sucesso.'
                );
              }}
          >

            <View style={styles.menuEsquerda}>

              <Image
                source={require('../assets/icons/iconeSincronizarPerfilPreto.png')}
                style={styles.iconePerfil}
              />

              <View>

                <Text style={styles.menuTexto}>
                  Sincronizar dados
                </Text>

                <Text style={styles.subtexto}>
                  Última sincronização: {ultimaSincronizacao}
                </Text>

              </View>

            </View>

            <Text style={styles.menuSeta}>
              ›
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuLinha}

            // Exibe ou oculta as preferências simuladas do app.
            onPress={function () {
              setMostrarConfiguracoes(
                !mostrarConfiguracoes
              );
            }}
          >

            <View style={styles.menuEsquerda}>

              <Image
                source={require('../assets/icons/iconeConfiguracoesPerfilPreto.png')}
                style={styles.iconePerfil}
              />

              <Text style={styles.menuTexto}>
                Configurações
              </Text>

            </View>

            <Text style={styles.menuSeta}>
              {mostrarConfiguracoes ? '⌄' : '›'}
            </Text>

          </TouchableOpacity>

          {mostrarConfiguracoes && (

            <View style={styles.configInterna}>

              <View style={styles.configLinha}>

                <View>
                  <Text style={styles.configLabel}>
                    Notificações
                  </Text>

                  <Text style={styles.configDescricao}>
                    Alertas sobre ocorrências e atualizações.
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.configBotao,
                    notificacoesAtivas && styles.configBotaoAtivo,
                  ]}
                  onPress={function () {
                    setNotificacoesAtivas(
                      !notificacoesAtivas
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.configBotaoTexto,
                      notificacoesAtivas &&
                        styles.configBotaoTextoAtivo,
                    ]}
                  >
                    {notificacoesAtivas
                      ? 'Ativado'
                      : 'Desativado'}
                  </Text>
                </TouchableOpacity>

              </View>

              <View style={styles.configLinhaSemBorda}>

                <View>
                  <Text style={styles.configLabel}>
                    Localização GPS
                  </Text>

                  <Text style={styles.configDescricao}>
                    Utilizada no registro das ocorrências.
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.configBotao,
                    gpsAtivo && styles.configBotaoAtivo,
                  ]}
                  onPress={function () {
                    setGpsAtivo(
                      !gpsAtivo
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.configBotaoTexto,
                      gpsAtivo &&
                        styles.configBotaoTextoAtivo,
                    ]}
                  >
                    {gpsAtivo
                      ? 'Ativado'
                      : 'Desativado'}
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          )}

          <TouchableOpacity
            style={styles.menuLinhaSemBorda}

            // Exibe informações institucionais
            // sobre o desenvolvimento do aplicativo.
            onPress={function () {

              Alert.alert(
                'Sobre o EcoTrack',

                '🌱 EcoTrack\n\n' +

                'Aplicativo desenvolvido para a Sprint 2 da disciplina Cross-Platform Application Development (FIAP).\n\n' +

                'A solução auxilia equipes de campo e supervisores no registro, acompanhamento e priorização de ocorrências relacionadas à conservação da faixa de domínio das rodovias.\n\n' +

                '👨‍💻 Equipe de Desenvolvimento\n\n' +

                '• Bruno Anselmo Da Silva - RM 566521\n' +
                '• Fernando de Almeida Godoi Martines - RM 564820\n' +
                '• Gabriel Ber Soares Tarone - RM 563520\n' +
                '• Guilherme de Freitas Salgado - RM 562494\n' +
                '• Vinicius Ribeiro Dias - RM 566468\n\n' +

                '🎓 FIAP • 2026'
              );

            }}
          >

            <View style={styles.menuEsquerda}>

              <Image
                source={require('../assets/icons/iconeInfoPerfilPreto.png')}
                style={styles.iconePerfil}
              />

              <Text style={styles.menuTexto}>
                Sobre o app
              </Text>

            </View>

            <Text style={styles.menuSeta}>
              ›
            </Text>

          </TouchableOpacity>

        </View>

        {/* Encerra a sessão atual do aplicativo */}
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={sairDoApp}
        >
          <Text style={styles.botaoSairTexto}>
            Sair do aplicativo
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomTab setTela={setTela} tela="perfil" />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  header: {
    backgroundColor: AZUL,
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },

  headerTitulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  headerIcone: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  topoPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 18,
  },

  avatarContainer: {
    width: 82,
    height: 82,
    borderRadius: 50,
    backgroundColor: '#CFE8D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#CFE8D2',
  },

  textosPerfil: {
    flex: 1,
    marginLeft: 25,
  },

  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
     marginLeft: 20,
  },

  cargo: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },

  infoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 26,
    marginBottom: 10,
  },

  infoCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 2,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 14,
  },

  infoIcone: {
    fontSize: 20,
    width: 34,
    color: AZUL,
  },

  infoLabel: {
    width: 90,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  infoValor: {
    fontSize: 16,
    color: '#555',
  },

  menuCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    borderRadius: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginBottom: 18,
  },

  menuLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 16,
  },

  menuLinhaSemBorda: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },

  menuEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  menuIcone: {
    fontSize: 18,
    width: 32,
  },

  menuTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },

  menuSeta: {
    fontSize: 24,
    color: '#999',
  },

  subtexto: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },

  botaoSair: {
    marginHorizontal: 24,
    marginTop: 18,
    borderWidth: 1.5,
    borderColor: '#E53935',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  botaoSairTexto: {
    color: '#E53935',
    fontSize: 17,
    fontWeight: 'bold',
  },

  iconePerfil: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  inputPerfil: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#FFF',
  },

  inputInfo: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  botaoSalvar: {
    backgroundColor: AZUL,
    marginHorizontal: 24,
    marginBottom: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoSalvarTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  configLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 14,
    marginBottom: 14,
  },

  configLinhaSemBorda: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  configLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },

  configDescricao: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    width: 180,
  },

  configBotao: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },

  configBotaoAtivo: {
    backgroundColor: AZUL,
    borderColor: AZUL,
  },

  configBotaoTexto: {
    color: '#777',
    fontSize: 12,
    fontWeight: 'bold',
  },

  configBotaoTextoAtivo: {
    color: '#FFF',
  },

  configInterna: {
    paddingTop: 4,
    paddingBottom: 14,
  },

  configLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 12,
  },

  configLinhaSemBorda: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },

  configLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },

  configDescricao: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    width: 180,
  },

  configBotao: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },

  configBotaoAtivo: {
    backgroundColor: AZUL,
    borderColor: AZUL,
  },

  configBotaoTexto: {
    color: '#777',
    fontSize: 12,
    fontWeight: 'bold',
  },

  configBotaoTextoAtivo: {
    color: '#FFF',
  },

  senhaContainer: {
    paddingTop: 8,
    paddingBottom: 12,
  },

  senhaLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },

  inputSenha: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },

  botaoSalvarSenha: {
    backgroundColor: AZUL,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },

  botaoSalvarSenhaTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  botoesEdicao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 16,
  },

  botaoCancelar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFF',
  },

  botaoCancelarTexto: {
    color: '#555',
    fontWeight: 'bold',
  },

  botaoSalvar: {
    flex: 1,
    backgroundColor: AZUL,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
  },

});