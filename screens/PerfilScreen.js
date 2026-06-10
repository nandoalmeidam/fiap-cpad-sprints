import { useState  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import BottomTab from '../components/BottomTab';

const AZUL = '#5F21F3';

/*
 * Tela de perfil do usuário.
 *
 * Apresenta informações operacionais,
 * opções de configuração e ações de conta.
 */

export default function PerfilScreen({
  setTela,
  sairDoApp,
}) {

  // Armazena a data e hora da última
  // sincronização realizada pelo usuário.
  const [ultimaSincronizacao, setUltimaSincronizacao] = useState('20/05/2026 - 14:45');

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          style={{ zIndex: 1 }}

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

        <TouchableOpacity
          style={{ zIndex: 1 }}
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

            <Text style={styles.nome}>
              Carlos Mendes
            </Text>

            <Text style={styles.cargo}>
              Supervisor de Conservação
            </Text>

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

            <Text style={styles.infoValor}>
              Frente 03
            </Text>

          </View>

          <View style={styles.infoLinha}>

            <Image
              source={require('../assets/icons/iconeTrechoPerfilRoxo.png')}
              style={styles.iconePerfil}
            />

            <Text style={styles.infoLabel}>
              Trecho
            </Text>

            <Text style={styles.infoValor}>
              SP-270
            </Text>

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

            <Text style={styles.infoValor}>
              Sorocaba - SP
            </Text>

          </View>

        </View>

        {/* Ações e configurações disponíveis para o usuário */}
        <View style={styles.menuCard}>

          <TouchableOpacity
            style={styles.menuLinha}
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
              ›
            </Text>

          </TouchableOpacity>

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
              ›
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuLinhaSemBorda}
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
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    bottom: 18,
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

});