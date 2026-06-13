import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import BottomTab from '../components/BottomTab';
import {
  useOcorrencias,
} from '../context/OcorrenciasContext';

/*
 * Tela responsável pela consulta do histórico
 * de ocorrências registradas no sistema.
 *
 * Permite filtrar registros por status e
 * acessar os detalhes de cada ocorrência.
 */

export default function HistoricoScreen({
  setTela,
  setOcorrenciaSelecionada,
}) {
  const {
    ocorrencias,
  } = useOcorrencias();

  // Status atualmente selecionado para filtragem
  // das ocorrências exibidas na lista.
  const [filtro, setFiltro] = useState('Todas');

  // Aplica o filtro selecionado pelo usuário.
  // Quando "Todas" estiver ativo, exibe a lista completa.
  const ocorrenciasFiltradas =
    filtro === 'Todas'
      ? ocorrencias
      : ocorrencias.filter(function (item) {
          return item.status === filtro;
        });

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={function () {
            setTela('home');
          }}
        >
          <Image
            source={require('../assets/icons/iconeVoltarHeaderBranco.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Histórico de Ocorrências
        </Text>

        <View style={{ width: 22 }} />

      </View>

      {/* Filtros rápidos por status da ocorrência */}
      <View style={styles.tabs}>

        <TouchableOpacity
          style={
            filtro === 'Todas'
              ? styles.tabAtiva
              : styles.tab
          }
          onPress={() => setFiltro('Todas')}
        >
          <Text
            style={
              filtro === 'Todas'
                ? styles.tabTextoAtivo
                : styles.tabTexto
            }
          >
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filtro === 'Aberta'
              ? styles.tabAtiva
              : styles.tab
          }
          onPress={() => setFiltro('Aberta')}
        >
          <Text
            style={
              filtro === 'Aberta'
                ? styles.tabTextoAtivo
                : styles.tabTexto
            }
          >
            Aberta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filtro === 'Em andamento'
              ? styles.tabAtiva
              : styles.tab
          }
          onPress={() => setFiltro('Em andamento')}
        >
          <Text
            style={
              filtro === 'Em andamento'
                ? styles.tabTextoAtivo
                : styles.tabTexto
            }
          >
            Em andamento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filtro === 'Concluída'
              ? styles.tabAtiva
              : styles.tab
          }
          onPress={() => setFiltro('Concluída')}
        >
          <Text
            style={
              filtro === 'Concluída'
                ? styles.tabTextoAtivo
                : styles.tabTexto
            }
          >
            Concluída
          </Text>
        </TouchableOpacity>

      </View>

      {/* Área de busca e filtros complementares */}
      <View style={styles.buscaRow}>

        <View style={styles.buscaBox}>
          <Image
            source={require('../assets/icons/iconeLupaHistoricoDeOcorrenciasCinza.png')}
            style={{ width: 24, height: 24 }}
          />

          <TextInput
            placeholder="Buscar por KM ou tipo"
            placeholderTextColor="#999"
            style={styles.input}
          />

        </View>

        <TouchableOpacity
          style={styles.filtro}
        >
          <Image
            source={require('../assets/icons/iconeMenuHistoricoDeOcorrenciasCinza.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        {/* Lista de ocorrências disponíveis para consulta */}
        <View style={styles.lista}>

          {ocorrenciasFiltradas.map(
            function (item) {

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  // Armazena a ocorrência selecionada e
                  // direciona o usuário para a tela de detalhes.
                  onPress={function () {
                    setOcorrenciaSelecionada(item);
                    setTela('detalhes');
                  }}
                >

                  <View style={styles.cardTopo}>

                    <View
                      style={[
                        styles.bolinha,
                        {
                          backgroundColor:
                            item.cor,
                        },
                      ]}
                    />

                    <View
                      style={styles.cardInfo}
                    >

                      <Text style={styles.km}>
                        {item.km}
                      </Text>

                      <Text style={styles.tipo}>
                        {item.tipo}
                      </Text>

                    </View>

                    <Text style={styles.seta}>
                      ›
                    </Text>

                  </View>

                  <View
                    style={styles.cardRodape}
                  >

                    <Text style={styles.data}>
                      20/05/2026
                    </Text>

                    <View
                      style={styles.criticidadeBox}
                    >

                      <View
                        style={[
                          styles.bolinhaMini,
                          {
                            backgroundColor:
                              item.cor,
                          },
                        ]}
                      />

                      <Text
                        style={styles.criticidade}
                      >
                        {item.criticidade}
                      </Text>

                    </View>

                    <Text style={styles.status}>
                      {item.status}
                    </Text>

                  </View>

                </TouchableOpacity>
              );
            }
          )}

        </View>

      </ScrollView>

      <BottomTab setTela={setTela} tela="historico" />

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

  voltar: {
    color: '#FFF',
    fontSize: 28,
    marginRight: 14,
  },

  headerTitulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 16,
  },

  tabAtiva: {
    backgroundColor: AZUL,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  tabTextoAtivo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  tabTexto: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 12,
  },

  buscaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  buscaBox: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 12,
  },

  buscaIcone: {
    color: '#999',
    marginRight: 6,
    fontSize: 16,
  },

  input: {
    flex: 1,
    fontSize: 13,
  },

  filtro: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  filtroTexto: {
    fontSize: 20,
    color: '#777',
  },

  lista: {
    backgroundColor: '#FFF',
    marginHorizontal: 14,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  card: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 14,
  },

  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bolinha: {
    width: 10,
    height: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  cardInfo: {
    flex: 1,
  },

  km: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 2,
  },

  tipo: {
    color: '#555',
    fontSize: 13,
  },

  seta: {
    fontSize: 24,
    color: '#999',
  },

  cardRodape: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
  },

  data: {
    color: '#666',
    fontSize: 12,
    marginRight: 14,
  },

  criticidadeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },

  bolinhaMini: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginRight: 6,
  },

  criticidade: {
    color: '#444',
    fontSize: 12,
  },

  status: {
    color: '#555',
    fontSize: 12,
    fontWeight: 'bold',
  },
});