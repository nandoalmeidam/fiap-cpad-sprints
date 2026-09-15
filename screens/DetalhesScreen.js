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
  setOcorrenciaSelecionada,
  setTela,
  perfil,
}) {

  const {
    ocorrencias,
    atualizarStatus,
    editarOcorrencia,
    removerOcorrencia,
  } = useOcorrencias();

  const isSupervisor =
    perfil === 'Supervisor';

  const ocorrenciaAtual =
    ocorrencias.find(function (item) {

      return (
        item.id ===
        ocorrencia.id
      );
    }) || ocorrencia;

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

    // Mantém os dados editáveis da ocorrência
    // durante o modo de edição.
    const [tipo, setTipo] =
      useState(
        ocorrencia.tipo
      );

    const [criticidade, setCriticidade] =
      useState(
        ocorrencia.criticidade
      );

    const [
      mostrarTipos,
      setMostrarTipos,
    ] = useState(false);

    const [
      mostrarCriticidades,
      setMostrarCriticidades,
    ] = useState(false);

    /*
    * Tipos disponíveis durante a edição.
    *
    * O tipo atual é mantido na lista para
    * preservar categorias personalizadas.
    */
    const tiposDisponiveis = Array.from(
      new Set([
        ocorrencia.tipo,
        'Vegetação',
        'Erosão',
        'Cerca danificada',
        'Drenagem',
        'Sinalização',
        'Invasão da faixa de domínio',
      ])
    );

    /*
    * Calcula os dados visuais utilizados
    * pelo ranking conforme a criticidade.
    */
    function obterDadosCriticidade(
      novaCriticidade
    ) {

      if (novaCriticidade === 'Crítico') {

        return {
          cor: '#C62828',
          pontuacao: 10,
        };
      }

      if (novaCriticidade === 'Alto') {

        return {
          cor: '#F77F00',
          pontuacao: 8,
        };
      }

      if (novaCriticidade === 'Médio') {

        return {
          cor: '#F4B400',
          pontuacao: 5,
        };
      }

      return {
        cor: '#5FAF6D',
        pontuacao: 2,
      };
    }

    const dadosCriticidade =
      obterDadosCriticidade(
        criticidade
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
                  dadosCriticidade.cor,
              },
            ]}
          >

            <Text style={styles.badgeTexto}>
              {criticidade.toUpperCase()}
            </Text>

          </View>

          <Text style={styles.km}>
            KM {ocorrencia.km}
          </Text>

          <Text style={styles.tipo}>
            {tipo}
          </Text>

          {/* Resumo das principais informações do registro */}
          <View style={styles.tabela}>

            <View style={styles.linha}>

              <Text style={styles.label}>
                Tipo
              </Text>

              {modoEdicao ? (

                <View style={styles.edicaoCampo}>

                  <TouchableOpacity
                    style={styles.selectEdicao}

                    onPress={function () {

                      setMostrarTipos(
                        !mostrarTipos
                      );

                      setMostrarCriticidades(
                        false
                      );
                    }}
                  >

                    <Text style={styles.selectEdicaoTexto}>
                      {tipo}
                    </Text>

                    <Text style={styles.selectSeta}>
                      ˅
                    </Text>

                  </TouchableOpacity>

                  {mostrarTipos && (

                    <View style={styles.opcoesEdicao}>

                      {tiposDisponiveis.map(
                        function (item) {

                          return (

                            <TouchableOpacity
                              key={item}

                              style={
                                styles.opcaoEdicao
                              }

                              onPress={function () {

                                setTipo(item);

                                setMostrarTipos(false);
                              }}
                            >

                              <Text
                                style={
                                  styles.opcaoEdicaoTexto
                                }
                              >
                                {item}
                              </Text>

                            </TouchableOpacity>
                          );
                        }
                      )}

                    </View>
                  )}

                </View>

              ) : (

                <Text style={styles.valor}>
                  {tipo}
                </Text>

              )}

            </View>

            <View style={styles.linha}>
              <Text style={styles.label}>
                Status
              </Text>

              <Text style={styles.valor}>
                {ocorrenciaAtual.status}
              </Text>
            </View>

            {/* Identificação da origem do registro,
                disponível somente para Supervisor */}
            {isSupervisor && ocorrenciaAtual.perfilRegistro && (

              <View style={styles.linha}>

                <Text style={styles.label}>
                  Registrado por
                </Text>

                <Text style={styles.valor}>
                  {ocorrenciaAtual.perfilRegistro === 'Campo'
                    ? 'Agente de Campo'
                    : 'Supervisor'}
                </Text>

              </View>

            )}

            {/* Identificação da última alteração
                realizada pela Supervisão */}
            {isSupervisor &&
              ocorrenciaAtual.alteradoPor && (

              <>

                <View style={styles.linha}>

                  <Text style={styles.label}>
                    Alterado por
                  </Text>

                  <Text style={styles.valor}>
                    {ocorrenciaAtual.alteradoPor}
                  </Text>

                </View>

                {ocorrenciaAtual.dataAlteracao && (

                  <View style={styles.linha}>

                    <Text style={styles.label}>
                      Última alteração
                    </Text>

                    <Text style={styles.valor}>

                      {new Date(
                        ocorrenciaAtual.dataAlteracao
                      ).toLocaleDateString(
                        'pt-BR'
                      )}

                      {' às '}

                      {new Date(
                        ocorrenciaAtual.dataAlteracao
                      ).toLocaleTimeString(
                        'pt-BR',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}

                    </Text>

                  </View>

                )}

              </>

            )}

            <View style={styles.linha}>

              <Text style={styles.label}>
                Criticidade
              </Text>

              {modoEdicao ? (

                <View style={styles.edicaoCampo}>

                  <TouchableOpacity
                    style={styles.selectEdicao}

                    onPress={function () {

                      setMostrarCriticidades(
                        !mostrarCriticidades
                      );

                      setMostrarTipos(false);
                    }}
                  >

                    <View
                      style={
                        styles.criticidadeSelect
                      }
                    >

                      <View
                        style={[
                          styles.bolinha,
                          {
                            backgroundColor:
                              dadosCriticidade.cor,
                          },
                        ]}
                      />

                      <Text
                        style={
                          styles.selectEdicaoTexto
                        }
                      >
                        {criticidade}
                      </Text>

                    </View>

                    <Text style={styles.selectSeta}>
                      ˅
                    </Text>

                  </TouchableOpacity>

                  {mostrarCriticidades && (

                    <View style={styles.opcoesEdicao}>

                      {[
                        'Baixo',
                        'Médio',
                        'Alto',
                        'Crítico',
                      ].map(function (item) {

                        return (

                          <TouchableOpacity
                            key={item}

                            style={
                              styles.opcaoEdicao
                            }

                            onPress={function () {

                              setCriticidade(
                                item
                              );

                              setMostrarCriticidades(
                                false
                              );
                            }}
                          >

                            <Text
                              style={
                                styles.opcaoEdicaoTexto
                              }
                            >
                              {item}
                            </Text>

                          </TouchableOpacity>
                        );
                      })}

                    </View>
                  )}

                </View>

              ) : (

                <View
                  style={styles.criticidadeBox}
                >

                  <View
                    style={[
                      styles.bolinha,
                      {
                        backgroundColor:
                          dadosCriticidade.cor,
                      },
                    ]}
                  />

                  <Text style={styles.valor}>
                    {criticidade}
                  </Text>

                </View>

              )}

            </View>

          </View>

          <Text style={styles.descricaoTitulo}>
            Descrição
          </Text>

          {ocorrencia.foto && (

            <>
              <Text style={styles.descricaoTitulo}>
                Foto da Ocorrência
              </Text>

              <Image
                source={{
                  uri: ocorrencia.foto,
                }}
                style={styles.fotoOcorrencia}
              />
            </>

          )}

          {/* Modo de edição da descrição da ocorrência */}
          {modoEdicao && isSupervisor ? (

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

                  const novosDadosCriticidade =
                    obterDadosCriticidade(
                      criticidade
                    );

                  editarOcorrencia(
                    ocorrencia.id,
                    {

                      tipo,

                      criticidade,

                      descricao,

                      cor:
                        novosDadosCriticidade.cor,

                      pontuacao:
                        novosDadosCriticidade.pontuacao,
                      
                      alteradoPor: 'Supervisão',

                      dataAlteracao: Date.now(),
                    }
                  );

                  setMostrarTipos(false);

                  setMostrarCriticidades(false);

                  setModoEdicao(false);
                }}
              >

                <Text style={styles.botaoSalvarTexto}>
                  Salvar alterações
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoCancelarEdicao}

                onPress={function () {

                  setTipo(
                    ocorrencia.tipo
                  );

                  setCriticidade(
                    ocorrencia.criticidade
                  );

                  setDescricao(
                    ocorrencia.descricao ||
                    'Sem descrição'
                  );

                  setMostrarTipos(false);

                  setMostrarCriticidades(false);

                  setModoEdicao(false);
                }}
              >

                <Text
                  style={
                    styles.botaoCancelarEdicaoTexto
                  }
                >
                  Cancelar edição
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

        {/* Ações administrativas disponíveis somente para Supervisor */}
        {isSupervisor && !modoEdicao && (

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

                        let novoStatus =
                          ocorrenciaAtual.status;

                        if (
                          ocorrenciaAtual.status ===
                          'Aberta'
                        ) {

                          novoStatus =
                            'Em andamento';

                        } else if (
                          ocorrenciaAtual.status ===
                          'Em andamento'
                        ) {

                          novoStatus =
                            'Concluída';
                        }

                        const dataAlteracao =
                          Date.now();

                        atualizarStatus(
                          ocorrenciaAtual.id
                        );

                        setOcorrenciaSelecionada({
                          ...ocorrenciaAtual,
                          status: novoStatus,
                          alteradoPor: 'Supervisão',
                          dataAlteracao,
                        });

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

        )}

      </ScrollView>

      <BottomTab
        setTela={setTela}
        tela="detalhes"
        perfil={perfil}
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

  fotoOcorrencia: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },

  edicaoCampo: {
    width: '60%',
  },

  selectEdicao: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectEdicaoTexto: {
    color: '#333',
    fontSize: 14,
    flexShrink: 1,
  },

  selectSeta: {
    color: '#666',
    fontSize: 18,
    marginLeft: 6,
  },

  opcoesEdicao: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    marginTop: 6,
    overflow: 'hidden',
  },

  opcaoEdicao: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  opcaoEdicaoTexto: {
    color: '#333',
    fontSize: 13,
  },

  criticidadeSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  botaoCancelarEdicao: {
    marginTop: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  botaoCancelarEdicaoTexto: {
    color: '#555',
    fontWeight: 'bold',
  },
});