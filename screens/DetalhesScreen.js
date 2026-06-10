import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from 'react-native';

import { useState } from 'react';

import BottomTab from '../components/BottomTab';

import {
  useOcorrencias,
} from '../context/OcorrenciasContext';

const AZUL = '#5F21F3';

/*
 * Tela responsável pela visualização detalhada
 * de uma ocorrência cadastrada no EcoTrack.
 *
 * Permite consultar informações, editar a
 * descrição, atualizar o status e remover
 * registros quando necessário.
 */

export default function DetalhesScreen({
  ocorrencia,
  setTela,
}) {

  const {
    atualizarStatus,
    editarDescricao,
    removerOcorrencia,
  } = useOcorrencias();

  // Controla a exibição do modo de edição
  // da descrição da ocorrência.
  const [modoEdicao, setModoEdicao] =
    useState(false);

  // Mantém uma cópia local da descrição
  // durante o processo de edição.  
  const [descricao, setDescricao] =
    useState(

      ocorrencia.descricao ||
      'Sem descrição'
    );

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            setTela('historico')
          }
        >
          <Image
            source={require('../assets/icons/iconeVoltarHeaderBranco.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Detalhes da Ocorrência
        </Text>

        <View style={{ width: 22 }} />

      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 160,
        }}
      >

        <View style={styles.card}>

          {/* Indicador visual da criticidade da ocorrência */}
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  ocorrencia.cor,
              },
            ]}
          >
            <Text style={styles.badgeTexto}>
              {ocorrencia.criticidade.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.km}>
            KM {ocorrencia.km}
          </Text>

          <Text style={styles.tipo}>
            {ocorrencia.tipo}
          </Text>

          {/* Resumo das principais informações do registro */}
          <View style={styles.tabela}>

            <View style={styles.linha}>
              <Text style={styles.label}>
                Tipo
              </Text>

              <Text style={styles.valor}>
                {ocorrencia.tipo}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text style={styles.label}>
                Status
              </Text>

              <Text style={styles.valor}>
                {ocorrencia.status}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text style={styles.label}>
                Criticidade
              </Text>

              <View
                style={styles.criticidadeBox}
              >

                <View
                  style={[
                    styles.bolinha,
                    {
                      backgroundColor:
                        ocorrencia.cor,
                    },
                  ]}
                />

                <Text style={styles.valor}>
                  {ocorrencia.criticidade}
                </Text>

              </View>
            </View>

          </View>

          <Text style={styles.descricaoTitulo}>
            Descrição
          </Text>

          {/* Modo de edição da descrição da ocorrência */}
          {modoEdicao ? (

            <>

              <TextInput
                style={styles.inputDescricao}

                multiline

                value={descricao}

                onChangeText={
                  setDescricao
                }
              />

              <TouchableOpacity
                style={styles.botaoSalvarDescricao}

                // Persiste a nova descrição no contexto global.
                onPress={function () {

                  editarDescricao(
                    ocorrencia.id,
                    descricao
                  );

                  setModoEdicao(false);
                }}
              >

                <Text style={styles.botaoSalvarTexto}>
                  Salvar
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoExcluir}

                onPress={function () {

                  // Solicita confirmação antes da remoção
                  // definitiva do registro.
                  Alert.alert(

                    'Excluir Ocorrência',

                    'Deseja excluir esta ocorrência?',

                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },

                      {
                        text: 'Excluir',

                        onPress: function () {

                          removerOcorrencia(
                            ocorrencia.id
                          );

                          setTela(
                            'historico'
                          );
                        },
                      },
                    ]
                  );
                }}
              >

                <Text style={styles.botaoExcluirTexto}>
                  Excluir Ocorrência
                </Text>

              </TouchableOpacity>

            </>

          ) : (

            <Text style={styles.descricao}>
              {descricao}
            </Text>

          )}

        </View>

        {/* Ações disponíveis para gerenciamento da ocorrência */}
        <View style={styles.botoes}>

          <TouchableOpacity
            style={styles.botaoSecundario}

            onPress={function () {

              setModoEdicao(true);
            }}
          >
            <Text style={styles.botaoSecundarioTexto}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoPrincipal}

            onPress={function () {

              // Atualiza o ciclo de vida da ocorrência:
              // Aberta -> Em andamento -> Concluída
              Alert.alert(

                'Atualizar Status',

                'Deseja alterar o status da ocorrência?',

                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },

                  {
                    text: 'Sim',

                    onPress: function () {

                      atualizarStatus(
                        ocorrencia.id
                      );

                      setModoEdicao(false);
                    },
                  },
                ]
              );
            }}
          >
            <Text style={styles.botaoPrincipalTexto}>
              Atualizar Status
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

      <BottomTab
        setTela={setTela}
      />

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
  },

  headerTitulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFF',
    margin: 16,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 16,
  },

  badgeTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  km: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },

  tipo: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
  },

  tabela: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    marginBottom: 18,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  label: {
    fontWeight: 'bold',
    color: '#333',
    width: '40%',
  },

  valor: {
    color: '#555',
    width: '60%',
  },

  criticidadeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },

  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 20,
    marginRight: 8,
  },

  descricaoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },

  descricao: {
    color: '#555',
    lineHeight: 20,
  },

  inputDescricao: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#333',
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 40,
  },

  botaoSecundario: {
    flex: 1,
    borderWidth: 1,
    borderColor: AZUL,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#FFF',
  },

  botaoSecundarioTexto: {
    color: AZUL,
    fontWeight: 'bold',
  },

  botaoPrincipal: {
    flex: 1,
    backgroundColor: AZUL,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  botaoPrincipalTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  botaoSalvarDescricao: {
    backgroundColor: AZUL,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoSalvarTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  botaoExcluir: {
    backgroundColor: '#E53935',
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoExcluirTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});