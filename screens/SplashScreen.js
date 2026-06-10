import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const AZUL = '#5F21F3';

/*
 * Tela de abertura do EcoTrack.
 *
 * Responsável por apresentar a identidade
 * visual da aplicação durante a inicialização.
 */

export default function SplashScreen() {

  return (

    <View style={styles.container}>

      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.titulo}>
        EcoTrack
      </Text>

      <Text style={styles.subtitulo}>
        Sistema Inteligente de Gestão
      </Text>

      <Text style={styles.subtitulo}>
        e Priorização da Faixa de Domínio
      </Text>

      {/* Indicador visual de carregamento da aplicação */}
      <View style={styles.barraContainer}>

        <Text style={styles.carregando}>
          Carregando...
        </Text>

        <View style={styles.barraFundo}>

          <View style={styles.barra} />

        </View>

      </View>

      {/* Informações institucionais do projeto */}
      <View style={styles.rodapeContainer}>

        <Text style={styles.rodape}>
          CCR MOTIVA CHALLENGE
        </Text>

        <Text style={styles.rodape}>
          FIAP 2026
        </Text>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: AZUL,
    alignItems: 'center',
    paddingTop: 120,
  },

  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    marginBottom: -70,
    marginTop: -120,
  },

  titulo: {
    color: '#FFF',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitulo: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: -5,
  },

  barraContainer: {
    marginTop: 130,
    alignItems: 'center',
  },

  carregando: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 12,
  },

  barraFundo: {
    width: 120,
    height: 4,
    backgroundColor: '#A78BFA',
    borderRadius: 10,
  },

  barra: {
    width: 70,
    height: 4,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },

  rodapeContainer: {
    marginTop: 140,
    alignItems: 'center',
  },

  rodape: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 8,
  },

});