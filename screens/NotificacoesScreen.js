import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import {
  useNotificacoes,
} from '../context/NotificacoesContext';

import {
  useOcorrencias,
} from '../context/OcorrenciasContext';

const AZUL = '#5F21F3';

export default function NotificacoesScreen({
  setTela,
  perfil,
  setOcorrenciaSelecionada,
}) {

  const {
    notificacoes,
    marcarComoLida,
    limparNotificacoes,
  } = useNotificacoes();

  const {
    ocorrencias,
  } = useOcorrencias();

  /*
   * A central de notificações pertence
   * exclusivamente ao Supervisor.
   */
  if (perfil !== 'Supervisor') {
    return null;
  }

  const notificacoesSupervisor =
    notificacoes.filter(
      function (item) {

        return (
          item.destinatario ===
          'Supervisor'
        );
      }
    );

  /*
   * Abre diretamente a ocorrência relacionada
   * à notificação selecionada.
   */
  function abrirNotificacao(
    notificacao
  ) {

    marcarComoLida(
      notificacao.id
    );

    const ocorrencia =
      ocorrencias.find(
        function (item) {

          return (
            item.id ===
            notificacao.ocorrenciaId
          );
        }
      );

    if (ocorrencia) {

      setOcorrenciaSelecionada(
        ocorrencia
      );

      setTela('detalhes');

      return;
    }

    /*
     * Caso a ocorrência tenha sido removida,
     * retorna ao histórico sem interromper o app.
     */
    setTela('historico');
  }

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
            style={{
              width: 22,
              height: 22,
            }}
          />

        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Notificações
        </Text>

        <View style={{ width: 22 }} />

      </View>

      <ScrollView
        contentContainerStyle={
          styles.conteudo
        }
      >

        {/* Ações da central de notificações */}
        {notificacoes.length > 0 && (

          <View style={styles.acoesNotificacoes}>

            <Text style={styles.quantidadeNotificacoes}>
              {notificacoes.length}
              {notificacoes.length === 1
                ? ' notificação'
                : ' notificações'}
            </Text>

            <TouchableOpacity
              onPress={function () {

                Alert.alert(
                  'Limpar notificações',
                  'Deseja apagar todas as notificações?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Limpar',
                      style: 'destructive',

                      onPress: function () {
                        limparNotificacoes();
                      },
                    },
                  ]
                );
              }}
            >

              <Text style={styles.limparTexto}>
                Limpar
              </Text>

            </TouchableOpacity>

          </View>

        )}

        {notificacoesSupervisor.length === 0 ? (

          <View style={styles.vazio}>

            <Image
              source={require('../assets/icons/iconeSinoBranco.png')}
              style={styles.sinoVazio}
            />

            <Text style={styles.vazioTitulo}>
              Nenhuma notificação
            </Text>

            <Text style={styles.vazioTexto}>
              Novas ocorrências registradas
              pelos agentes de campo aparecerão
              aqui.
            </Text>

          </View>

        ) : (

          notificacoesSupervisor.map(
            function (item) {

              return (

                <TouchableOpacity
                  key={item.id}

                  style={[
                    styles.card,

                    !item.lida &&
                      styles.cardNaoLido,
                  ]}

                  onPress={function () {

                    abrirNotificacao(
                      item
                    );
                  }}
                >

                  <View
                    style={
                      styles.cardTopo
                    }
                  >

                    <Text
                      style={
                        styles.titulo
                      }
                    >
                      {item.titulo}
                    </Text>

                    {!item.lida && (

                      <View
                        style={
                          styles.bolinhaNaoLida
                        }
                      />

                    )}

                  </View>

                  <Text
                    style={
                      styles.mensagem
                    }
                  >
                    {item.mensagem}
                  </Text>

                  <Text
                    style={
                      styles.criticidade
                    }
                  >
                    Criticidade: {
                      item.criticidade
                    }
                  </Text>

                  <Text
                    style={
                      styles.data
                    }
                  >
                    {new Date(
                      item.data
                    ).toLocaleString(
                      'pt-BR'
                    )}
                  </Text>

                </TouchableOpacity>
              );
            }
          )

        )}

      </ScrollView>

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

  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  conteudo: {
    padding: 16,
    paddingBottom: 50,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardNaoLido: {
    borderColor: AZUL,
    borderWidth: 1.5,
  },

  cardTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titulo: {
    flex: 1,
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },

  mensagem: {
    color: '#374151',
    fontSize: 14,
    marginTop: 8,
  },

  criticidade: {
    color: '#666666',
    fontSize: 13,
    marginTop: 8,
  },

  data: {
    color: '#999999',
    fontSize: 12,
    marginTop: 10,
  },

  bolinhaNaoLida: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: AZUL,
    marginLeft: 12,
  },

  vazio: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 30,
  },

  sinoVazio: {
    width: 38,
    height: 38,
    tintColor: '#9CA3AF',
    marginBottom: 18,
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },

  vazioTexto: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },

  acoesNotificacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },

  quantidadeNotificacoes: {
    fontSize: 14,
    color: '#777',
  },

  limparTexto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E53935',
  },

});