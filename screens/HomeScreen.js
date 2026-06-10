import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useState } from 'react';

import BottomTab from '../components/BottomTab';

import {
  useOcorrencias,
} from '../context/OcorrenciasContext';

const AZUL = '#5F21F3';

/*
 * Dashboard principal do EcoTrack.
 *
 * Apresenta indicadores operacionais,
 * ranking de criticidade e acesso rápido
 * às funcionalidades mais utilizadas.
 */

export default function HomeScreen({
  setTela,
}) {

  const { ocorrencias, } = useOcorrencias();

  // Ocorrências organizadas por nível de criticidade
  // para composição do ranking operacional.
  const ocorrenciasCriticas =
    ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Crítico'
      );
    });

  const ocorrenciasAltas =
    ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Alto'
      );
    });

  const ocorrenciasMedias =
    ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Médio'
      );
    });

  const ocorrenciasBaixas =
    ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Baixo'
      );
    });

  // Indicadores exibidos nos cards de resumo da Home.
  const abertas = ocorrencias.filter(
    function (item) {
      return item.status === 'Aberta';
    }
  ).length;

  const andamento = ocorrencias.filter(
    function (item) {
      return item.status === 'Em andamento';
    }
  ).length;

  const criticas = ocorrencias.filter(
    function (item) {

      return (
        item.criticidade === 'Crítico' ||
        item.criticidade === 'Crítica' ||
        item.criticidade === 'Críticos' ||
        item.criticidade === 'Críticas' ||
        item.criticidade === 'crítico' ||
        item.criticidade === 'crítica' ||
        item.criticidade === 'críticos' ||
        item.criticidade === 'críticas'
      );
    }
  ).length;

  const concluidas = ocorrencias.filter(
    function (item) {
      return item.status === 'Concluída';
    }
  ).length;

  // Controla a exibição do menu de ações rápidas.
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={function () {

            setMostrarMenu(
              !mostrarMenu
            );
          }}
        >

          <Image
            source={require('../assets/icons/iconeMenuBranco.png')}
            style={{ width: 30, height: 30 }}
          />

        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitulo}>
            Home
          </Text>
        </View>

        <TouchableOpacity
          onPress={function () {

            // Exibe feedback quando não existem
            // notificações pendentes para o usuário.
            Alert.alert(
              'Notificações',
              'Você não possui notificações no momento.'
            );

          }}
        >

          <Image
            source={require('../assets/icons/iconeSinoBranco.png')}
            style={{ width: 22, height: 22 }}
          />

        </TouchableOpacity>

      </View>

      {mostrarMenu && (
        <View style={styles.menuBox}>

          <TouchableOpacity
            style={styles.menuItem}
          >
            <Text style={styles.menuTexto}>
              Minha Conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
          >
            <Text style={styles.menuTexto}>
              Configurações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
          >
            <Text style={styles.menuTexto}>
              Ajuda
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
          >
            <Text style={styles.menuTexto}>
              Sobre
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomWidth: 0,
              },
            ]}

            onPress={function () {
              setTela('login');
            }}
          >
            <Text style={styles.menuTextoLogout}>
              Logout
            </Text>
          </TouchableOpacity>

        </View>
      )}

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        <View style={styles.topo}>

          <Text style={styles.nome}>
            Olá, Carlos!
          </Text>

          <Text style={styles.cargo}>
            Supervisor de Conservação
          </Text>

        </View>

        <View style={styles.cardsResumo}>

          <View style={styles.cardResumo}>

            <Text style={styles.numeroResumo}>
              {abertas}
            </Text>

            <Text style={styles.textoResumo}>
              Ocorrências
            </Text>

            <Text style={styles.textoResumo}>
              Abertas
            </Text>

          </View>

          <View style={styles.cardResumo}>

            <Text style={styles.numeroResumo}>
              {andamento}
            </Text>

            <Text style={styles.textoResumo}>
              Em
            </Text>

            <Text style={styles.textoResumo}>
              Andamento
            </Text>

          </View>

          <View style={styles.cardResumo}>

            <Text
              style={[
                styles.numeroResumo,
                {
                  color: '#E53935',
                },
              ]}
            >
              {criticas}
            </Text>

            <Text style={styles.textoResumo}>
              Críticas
            </Text>

          </View>

          <View style={styles.cardResumo}>

            <Text style={styles.numeroResumo}>
              {concluidas}
            </Text>

            <Text style={styles.textoResumo}>
              Concluídas
            </Text>

          </View>

        </View>

        {/* Ranking resumido dos trechos com maior criticidade */}
        <View style={styles.cardRanking}>

          <View style={styles.rankingHeader}>

            <Text style={styles.rankingTitulo}>
              Ranking Rápido dos KMs Críticos
            </Text>

            <TouchableOpacity
              // Direciona para a visualização completa
              // do ranking de ocorrências.
              onPress={function () {
                setTela('ranking');
              }}
            >

              <Text style={styles.verTodos}>
                Ver todos
              </Text>

            </TouchableOpacity>

          </View>

          {ocorrenciasCriticas.map(
            function (item, index) {

              return (

                <View
                  key={item.id}
                  style={styles.linhaRanking}
                >

                  <View style={styles.kmContainer}>

                    <Text style={styles.posicao}>
                      {index + 1}
                    </Text>

                    <Text style={styles.kmTexto}>
                      KM {item.km}
                    </Text>

                  </View>

                  <View
                    style={
                      styles.statusContainer
                    }
                  >

                    <View
                      style={[
                        styles.bolinha,

                        {
                          backgroundColor:
                            item.cor,
                        },
                      ]}
                    />

                    <Text style={styles.statusTexto}>
                      {item.criticidade}
                    </Text>

                  </View>

                  <Text style={styles.pontuacao}>
                    {item.pontuacao}
                  </Text>

                </View>
              );
            }
          )}

          {ocorrenciasAltas.map(
            function (item, index) {

              return (

                <View
                  key={item.id}
                  style={styles.linhaRanking}
                >

                  <View style={styles.kmContainer}>

                    <Text style={styles.posicao}>
                      {ocorrenciasCriticas.length + index + 1}
                    </Text>

                    <Text style={styles.kmTexto}>
                      KM {item.km}
                    </Text>

                  </View>

                  <View
                    style={
                      styles.statusContainer
                    }
                  >

                    <View
                      style={[
                        styles.bolinha,

                        {
                          backgroundColor:
                            item.cor,
                        },
                      ]}
                    />

                    <Text style={styles.statusTexto}>
                      {item.criticidade}
                    </Text>

                  </View>

                  <Text style={styles.pontuacao}>
                    {item.pontuacao}
                  </Text>

                </View>
              );
            }
          )}

          {ocorrenciasMedias.map(
            function (item, index) {

              return (

                <View
                  key={item.id}
                  style={styles.linhaRanking}
                >

                  <View style={styles.kmContainer}>

                    <Text style={styles.posicao}>
                      {
                        ocorrenciasCriticas.length +
                        ocorrenciasAltas.length +
                        index +
                        1
                      }
                    </Text>

                    <Text style={styles.kmTexto}>
                      KM {item.km}
                    </Text>

                  </View>

                  <View
                    style={
                      styles.statusContainer
                    }
                  >

                    <View
                      style={[
                        styles.bolinha,

                        {
                          backgroundColor:
                            item.cor,
                        },
                      ]}
                    />

                    <Text style={styles.statusTexto}>
                      {item.criticidade}
                    </Text>

                  </View>

                  <Text style={styles.pontuacao}>
                    {item.pontuacao}
                  </Text>

                </View>
              );
            }
          )}

          {ocorrenciasBaixas.map(
            function (item, index) {

              return (

                <View
                  key={item.id}
                  style={styles.linhaRanking}
                >

                  <View style={styles.kmContainer}>

                    <Text style={styles.posicao}>
                      {
                        ocorrenciasCriticas.length +
                        ocorrenciasAltas.length +
                        ocorrenciasMedias.length +
                        index +
                        1
                      }
                    </Text>

                    <Text style={styles.kmTexto}>
                      KM {item.km}
                    </Text>

                  </View>

                  <View
                    style={
                      styles.statusContainer
                    }
                  >

                    <View
                      style={[
                        styles.bolinha,

                        {
                          backgroundColor:
                            item.cor,
                        },
                      ]}
                    />

                    <Text style={styles.statusTexto}>
                      {item.criticidade}
                    </Text>

                  </View>

                  <Text style={styles.pontuacao}>
                    {item.pontuacao}
                  </Text>

                </View>
              );
            }
          )}

        </View>

        {/* Acessos rápidos para registro e consulta de ocorrências */}
        <View style={styles.acoesContainer}>

          <TouchableOpacity
            style={styles.cardAcao}
            // Abre o formulário para cadastro
            // de uma nova ocorrência em campo.
            onPress={function () {
              setTela('registro');
            }}
          >

            <Image
              source={require('../assets/icons/iconeAddRoxo.png')}
              style={styles.iconeCard}
            />

            <View style={styles.textoCard}>

              <Text style={styles.acaoTitulo}>
                Registro de Campo
              </Text>

              <Text style={styles.acaoSubtitulo}>
                Enviar evidência
              </Text>

            </View>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardAcao}
            // Navega para a consulta dos registros
            // já cadastrados no sistema.
            onPress={function () {
              setTela('historico');
            }}
          >

            <Image
              source={require('../assets/icons/iconeHistoricoVerRegistrosHome.png')}
              style={styles.iconeCard}
            />

            <View style={styles.textoCard}>

              <Text style={styles.acaoTitulo}>
                Histórico
              </Text>

              <Text style={styles.acaoSubtitulo}>
                Ver registros
              </Text>

            </View>

          </TouchableOpacity>

        </View>

      </ScrollView>

      <BottomTab
        setTela={setTela}
        tela="home"
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
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
  },

  menu: {
    color: '#FFF',
    fontSize: 28,
  },

  headerTitulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  notificacao: {
    fontSize: 28,
  },

  topo: {
    paddingHorizontal: 18,
    marginTop: 20,
  },

  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },

  cargo: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },

  cardsResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginTop: 22,
  },

  cardResumo: {
    backgroundColor: '#FFF',
    width: 76,
    height: 112,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  numeroResumo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },

  textoResumo: {
    fontSize: 11,
    textAlign: 'center',
    color: '#666',
  },

  cardRanking: {
    backgroundColor: '#FFF',
    marginHorizontal: 14,
    marginTop: 28,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  rankingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  rankingTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    width: '70%',
  },

  verTodos: {
    color: AZUL,
    fontWeight: 'bold',
    fontSize: 14,
  },

  linhaRanking: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  kmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 140,
  },

  posicao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#111827',
  },

  kmTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },

  bolinha: {
    width: 16,
    height: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  statusTexto: {
    fontSize: 15,
    color: '#444',
  },

  pontuacao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 'auto',
  },

  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginTop: 22,
  },

  cardAcao: {
    backgroundColor: '#FFF',
    width: '48%',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeAcao: {
    fontSize: 22,
    marginRight: 10,
    color: AZUL,
  },

  acaoTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
    width: 90,
  },

  acaoSubtitulo: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  textoCard: {
    flex: 1,
    justifyContent: 'center',
  },

  iconeCard: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  menuBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginTop: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  menuTexto: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  },

  menuTextoLogout: {
    fontSize: 15,
    color: '#E53935',
    fontWeight: 'bold',
  },

});