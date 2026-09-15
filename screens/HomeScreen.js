import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useState } from 'react';

import BottomTab from '../components/BottomTab';

import {
  useOcorrencias,
} from '../context/OcorrenciasContext';

import {
  useNotificacoes,
} from '../context/NotificacoesContext';

import {
  useUsuario,
} from '../context/UsuarioContext';

import {
  useConfiguracoes,
} from '../context/ConfiguracoesContext';

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
  sairDoApp,
  perfil,
  setFiltroHistoricoInicial,
}) {

  const { ocorrencias, } = useOcorrencias();

  const {
    quantidadeNaoLidas,
  } = useNotificacoes();

  const {
    notificacoesAtivas,
  } = useConfiguracoes();

  const {
    usuarioLogado,
  } = useUsuario();

  const isSupervisor = perfil === 'Supervisor';

  const ocorrenciasDoPerfil = isSupervisor
  ? ocorrencias
  : ocorrencias.filter(function (item) {
      return item.perfilRegistro === 'Campo';
    });

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
  // Supervisor visualiza os dados gerais.
  // Campo visualiza apenas suas próprias ocorrências.
  const abertas = ocorrenciasDoPerfil.filter(
    function (item) {
      return item.status === 'Aberta';
    }
  ).length;

  const andamento = ocorrenciasDoPerfil.filter(
    function (item) {
      return item.status === 'Em andamento';
    }
  ).length;

  const criticas = ocorrenciasDoPerfil.filter(
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

  const concluidas = ocorrenciasDoPerfil.filter(
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

        {isSupervisor ? (

          <TouchableOpacity
            style={styles.sinoContainer}

            onPress={function () {
              setTela('notificacoes');
            }}
          >

            <Image
              source={require('../assets/icons/iconeSinoBranco.png')}
              style={{ width: 22, height: 22 }}
            />

            {notificacoesAtivas &&
              quantidadeNaoLidas > 0 && (

                <View style={styles.notificacaoBadge}>

                  <Text style={styles.notificacaoBadgeTexto}>
                    {quantidadeNaoLidas > 9
                      ? '9+'
                      : quantidadeNaoLidas}
                  </Text>

                </View>
            )}

          </TouchableOpacity>

        ) : (

          <View style={{ width: 22 }} />

        )}

      </View>

      {mostrarMenu && (

        <View style={styles.menuBox}>

          {/* Acessa informações da conta,
              preferências e configurações. */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={function () {

              setMostrarMenu(false);

              setTela('perfil');

            }}
          >

            <Text style={styles.menuTexto}>
              Minha Conta
            </Text>

          </TouchableOpacity>


          {/* Encerra a sessão atual. */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                borderBottomWidth: 0,
              },
            ]}
            onPress={function () {

              setMostrarMenu(false);

              sairDoApp();

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
            Olá, {usuarioLogado?.nome || 'Usuário'}!
          </Text>

          <Text style={styles.cargo}>
            {isSupervisor
              ? 'Supervisor de Conservação'
              : 'Agente de Campo'}
          </Text>

        </View>

        <View style={styles.cardsResumo}>

          {/* Abre o Histórico mostrando
              somente ocorrências abertas. */}
          <TouchableOpacity
            style={styles.cardResumo}
            activeOpacity={0.7}
            onPress={function () {

              setFiltroHistoricoInicial({
                tipo: 'status',
                valor: 'Aberta',
              });

              setTela('historico');
            }}
          >

            <Text style={styles.numeroResumo}>
              {abertas}
            </Text>

            <Text style={styles.textoResumo}>
              Ocorrências
            </Text>

            <Text style={styles.textoResumo}>
              Abertas
            </Text>

          </TouchableOpacity>


          {/* Abre o Histórico mostrando
              ocorrências em andamento. */}
          <TouchableOpacity
            style={styles.cardResumo}
            activeOpacity={0.7}
            onPress={function () {

              setFiltroHistoricoInicial({
                tipo: 'status',
                valor: 'Em andamento',
              });

              setTela('historico');
            }}
          >

            <Text style={styles.numeroResumo}>
              {andamento}
            </Text>

            <Text style={styles.textoResumo}>
              Em
            </Text>

            <Text style={styles.textoResumo}>
              Andamento
            </Text>

          </TouchableOpacity>


          {/* Abre o Histórico mostrando
              somente ocorrências críticas. */}
          <TouchableOpacity
            style={styles.cardResumo}
            activeOpacity={0.7}
            onPress={function () {

              setFiltroHistoricoInicial({
                tipo: 'criticidade',
                valor: 'Crítico',
              });

              setTela('historico');
            }}
          >

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

          </TouchableOpacity>


          {/* Abre o Histórico mostrando
              somente ocorrências concluídas. */}
          <TouchableOpacity
            style={styles.cardResumo}
            activeOpacity={0.7}
            onPress={function () {

              setFiltroHistoricoInicial({
                tipo: 'status',
                valor: 'Concluída',
              });

              setTela('historico');
            }}
          >

            <Text style={styles.numeroResumo}>
              {concluidas}
            </Text>

            <Text style={styles.textoResumo}>
              Concluídas
            </Text>

          </TouchableOpacity>

        </View>

        {/* Ranking resumido dos trechos com maior criticidade */}
        {isSupervisor && (

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
        )}

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

              setFiltroHistoricoInicial(null);

              setTela('historico');
            }}
          >

            <Image
              source={require('../assets/icons/iconeHistoricoVerRegistrosHome.png')}
              style={styles.iconeCard}
            />

            <View style={styles.textoCard}>

              <Text style={styles.acaoTitulo}>
                {isSupervisor ? 'Histórico' : 'Minhas Ocorrências'}
              </Text>

              <Text style={styles.acaoSubtitulo}>
                {isSupervisor ? 'Ver registros' : 'Acompanhar registros'}
              </Text>

            </View>

          </TouchableOpacity>

        </View>

            </ScrollView>

              <BottomTab
                setTela={setTela}
                tela="home"
                perfil={perfil}
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

  sinoContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  notificacaoBadge: {
    position: 'absolute',
    top: -5,
    right: -7,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#E53935',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  notificacaoBadgeTexto: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

});