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
import { useState, } from 'react';

import BottomTab from '../components/BottomTab';
import { useOcorrencias, } from '../context/OcorrenciasContext';

/*
 * Tela responsável pela visualização do ranking
 * de ocorrências registradas no EcoTrack.
 *
 * Os registros são organizados por nível de
 * criticidade para apoiar a priorização das ações
 * de conservação e manutenção.
 */

export default function RankingScreen({
  setTela,
}) {
  const { ocorrencias } =  useOcorrencias();
  // Termo utilizado para filtrar os registros
  // pelo KM informado pelo usuário.
  const [buscaKm, setBuscaKm] = useState('');

  // Controla a exibição das opções de filtro.
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Criticidade selecionada para filtragem.
  const [filtroCriticidade, setFiltroCriticidade] = useState('Todos');
    
  // Controla a exibição do menu de ações rápidas.
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Agrupa as ocorrências críticas para compor
  // selecionados pelo usuário.
  const ocorrenciasCriticas = ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Crítico' &&
        item.km.includes(buscaKm) &&
        (
          filtroCriticidade === 'Todos' ||
          filtroCriticidade === 'Crítico'
        )
      );

    });

  const ocorrenciasAltas = ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Alto' &&
        item.km.includes(buscaKm) &&
        (
          filtroCriticidade === 'Todos' ||
          filtroCriticidade === 'Alto'
        )
      );

    });

  const ocorrenciasMedias = ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Médio' &&
        item.km.includes(buscaKm) &&
        (
          filtroCriticidade === 'Todos' ||
          filtroCriticidade === 'Médio'
        )
      );

    });

  const ocorrenciasBaixas = ocorrencias.filter(function (item) {

      return (
        item.criticidade === 'Baixo' &&
        item.km.includes(buscaKm) &&
        (
          filtroCriticidade === 'Todos' ||
          filtroCriticidade === 'Baixo'
        )
      );

    });

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={function () {
            setMostrarMenu(!mostrarMenu);
          }}
        >
          <Image
            source={require('../assets/icons/iconeMenuBranco.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Ranking de KMs Críticos
        </Text>

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

      {/* Menu de navegação e ações complementares */}
      {mostrarMenu && (
        <View style={styles.menuBox}>

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

          <TouchableOpacity
            style={styles.menuItem}

            onPress={function () {

              setMostrarMenu(false);

              Alert.alert(
                'Configurações',
                'As configurações do aplicativo podem ser acessadas na tela de Perfil.'
              );

              setTela('perfil');

            }}
          >
            <Text style={styles.menuTexto}>
              Configurações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}

            onPress={function () {

              setMostrarMenu(false);

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
            <Text style={styles.menuTexto}>
              Sobre o App
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              { borderBottomWidth: 0 },
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

        <View style={styles.topoFiltro}>

          {/* Filtro rápido para localização de trechos específicos */}
          <TextInput
            style={styles.select}
            placeholder="Buscar KM"
            placeholderTextColor="#888"
            value={buscaKm}
            onChangeText={setBuscaKm}
          />

          <TouchableOpacity

            // Exibe ou oculta os filtros
            // disponíveis para o ranking.
            onPress={function () {
              setMostrarFiltros(
                !mostrarFiltros
              );
            }}
          >

            <Image
              source={require('../assets/icons/iconeFiltroRankingDeKmsCriticosPreto.png')}
              style={{ width: 24, height: 24 }}
            />

          </TouchableOpacity>

        </View>

        {/* Filtros por criticidade */}
        {mostrarFiltros && (

          <View style={styles.filtrosContainer}>

            <TouchableOpacity
              style={[
                styles.filtroChip,
                filtroCriticidade === 'Todos' &&
                styles.filtroChipAtivo,
              ]}
              onPress={function () {
                setFiltroCriticidade('Todos');
              }}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtroCriticidade === 'Todos' &&
                  styles.filtroTextoAtivo,
                ]}
              >
                Todos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filtroChip,
                filtroCriticidade === 'Crítico' &&
                styles.filtroChipAtivo,
              ]}
              onPress={function () {
                setFiltroCriticidade('Crítico');
              }}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtroCriticidade === 'Crítico' &&
                  styles.filtroTextoAtivo,
                ]}
              >
                Crítico
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filtroChip,
                filtroCriticidade === 'Alto' &&
                styles.filtroChipAtivo,
              ]}
              onPress={function () {
                setFiltroCriticidade('Alto');
              }}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtroCriticidade === 'Alto' &&
                  styles.filtroTextoAtivo,
                ]}
              >
                Alto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filtroChip,
                filtroCriticidade === 'Médio' &&
                styles.filtroChipAtivo,
              ]}
              onPress={function () {
                setFiltroCriticidade('Médio');
              }}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtroCriticidade === 'Médio' &&
                  styles.filtroTextoAtivo,
                ]}
              >
                Médio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filtroChip,
                filtroCriticidade === 'Baixo' &&
                styles.filtroChipAtivo,
              ]}
              onPress={function () {
                setFiltroCriticidade('Baixo');
              }}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtroCriticidade === 'Baixo' &&
                  styles.filtroTextoAtivo,
                ]}
              >
                Baixo
              </Text>
            </TouchableOpacity>

          </View>

        )}

        {/* Relação de ocorrências ordenadas por criticidade */}
        <View style={styles.tabela}>

          <View style={styles.linhaHeader}>

            <Text style={styles.headerTexto}>
              KM
            </Text>

            <Text style={styles.headerTexto}>
              Criticidade
            </Text>

            <Text style={styles.headerTexto}>
              Pontuação
            </Text>

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

          <TouchableOpacity
            style={styles.botao}
            // Direciona para a consulta completa
            // das ocorrências registradas.
            onPress={function () {
              setTela('historico');
            }}
          >
            <Text style={styles.botaoTexto}>
              Ir para o Histórico
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <BottomTab setTela={setTela} tela="ranking" />

    </View>
  );
}

const AZUL = '#5F21F3';

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

  icon: {
    color: '#FFF',
    fontSize: 24,
  },

  topoFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  select: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 14,
  },

  selectTexto: {
    color: '#888',
  },

  filtro: {
    fontSize: 24,
  },

  tabela: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  linhaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  headerTexto: {
    fontWeight: 'bold',
    color: '#777',
    width: '33%',
  },

  linhaRanking: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingVertical: 14,
  },

  kmContainer: {
    width: '38%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  posicao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 10,
  },

  kmTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  statusContainer: {
    width: '32%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusTexto: {
    color: '#444',
    fontSize: 16,
  },

  pontuacao: {
    width: '20%',
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 16,
  },

  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 20,
    marginRight: 8,
  },

  botao: {
    backgroundColor: AZUL,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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

  filtrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  filtroChip: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },

  filtroChipAtivo: {
    backgroundColor: AZUL,
    borderColor: AZUL,
  },

  filtroTexto: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
  },

  filtroTextoAtivo: {
  color: '#FFF',
},

});