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

export default function RankingScreen({
  setTela,
  tela="ranking"
}) {
  const { ocorrencias } =  useOcorrencias();

  const [buscaKm, setBuscaKm] = useState('');

  const ocorrenciasCriticas =
    ocorrencias.filter(function (item) {
      return item.criticidade === 'Crítico' && item.km.includes(buscaKm);
    });

  const ocorrenciasAltas =
    ocorrencias.filter(function (item) {

      return item.criticidade === 'Alto' && item.km.includes(buscaKm);
    });

  const ocorrenciasMedias =
    ocorrencias.filter(function (item) {

      return item.criticidade === 'Médio' && item.km.includes(buscaKm);
    });

  const ocorrenciasBaixas =
    ocorrencias.filter(function (item) {

      return item.criticidade === 'Baixo' && item.km.includes(buscaKm);
    });

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Image
          source={require('../assets/icons/iconeMenuBranco.png')}
          style={{ width: 30, height: 30 }}
        />

        <Text style={styles.headerTitulo}>
          Ranking de KMs Críticos
        </Text>

        <TouchableOpacity
          onPress={function () {

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

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        <View style={styles.topoFiltro}>

          <TextInput
            style={styles.select}
            placeholder="Buscar KM"
            placeholderTextColor="#888"
            value={buscaKm}
            onChangeText={setBuscaKm}
          />

          <Image
            source={require('../assets/icons/iconeFiltroRankingDeKmsCriticosPreto.png')}
            style={{ width: 24, height: 24 }}
          />

        </View>

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
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    bottom: 18,
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
});