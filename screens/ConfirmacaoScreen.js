import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import BottomTab from '../components/BottomTab';

const AZUL = '#5F21F3';

/*
 * Tela exibida após o registro bem-sucedido
 * de uma ocorrência.
 *
 * Apresenta o protocolo gerado e permite
 * o retorno rápido para a tela inicial.
 */

export default function ConfirmacaoScreen({
  setTela,
  ocorrenciaSelecionada,
  perfil,
}) {
  return (
    <View style={styles.container}>

      <View style={styles.conteudo}>

        <Image
          source={require('../assets/icons/iconeConfirmacaoDeEnvioVerde.png')}
          style={{ width: 60, height: 60 }}
        />

        <Text style={styles.titulo}>
          Ocorrência registrada
          {'\n'}
          com sucesso!
        </Text>

        <Text style={styles.subtitulo}>
          As informações foram
          enviadas para a supervisão
          operacional.
        </Text>

        {/* Resumo do protocolo gerado para acompanhamento da ocorrência */}
        <View style={styles.card}>

          <Image
            source={require('../assets/icons/iconeProtocoloConfirmacaoDeEnvioPreto.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.label}>
            Protocolo
          </Text>

          <Text style={styles.valor}>
            {ocorrenciaSelecionada?.protocolo}
          </Text>

          <Image
            source={require('../assets/icons/iconeStatusConfirmacaoDeEnvioPreto.png')}
            style={{ width: 24, height: 24 }}
          />

          <Text style={styles.label}>
            Status
          </Text>

          <Text style={styles.valor}>
            {ocorrenciaSelecionada?.status}
          </Text>

        </View>

        {/* Retorna o usuário para a tela principal do aplicativo */}
        <TouchableOpacity
          style={styles.botao}
          onPress={function () {
            setTela('home');
          }}
        >
          <View style={styles.botaoConteudo}>
            <Image
              source={require('../assets/icons/iconeHomeVoltarAoInicioBranco.png')}
              style={styles.iconeBotao}
            />

            <Text style={styles.botaoTexto}>
              Voltar ao início
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      <BottomTab
        setTela={setTela}
        tela="confirmacao"
        perfil={perfil}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'space-between',
  },

  conteudo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 90,
  },

  icone: {
    fontSize: 78,
    color: '#43A047',
    marginBottom: 22,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 16,
    lineHeight: 38,
  },

  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 34,
  },

  card: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 22,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  label: {
    color: '#777',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
  },

  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AZUL,
    marginBottom: 22,
  },

  botao: {
    backgroundColor: AZUL,
    height: 58,
    borderRadius: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  iconeBotao: {
    width: 22,
    height: 22,
    marginRight: 10,
  },

  botaoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});