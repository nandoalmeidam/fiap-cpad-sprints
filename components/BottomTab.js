import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function BottomTab({
  setTela,
  tela,
}) {
  return (
    // Barra de navegação inferior utilizada
    // em todas as telas principais do EcoTrack.
    <View style={styles.container}>

      {/* Acesso à tela inicial com visão geral das ocorrências */}
      <TouchableOpacity
        style={styles.item}
        onPress={function () {
          setTela('home');
        }}
      >
        <Image
          source={
            tela === 'home'
              ? require('../assets/icons/iconeHomeRoxo.png')
              : require('../assets/icons/iconeHomePreto.png')
          }
          style={styles.icone}
        />

        <Text
          style={[
            styles.texto,
            tela === 'home' && styles.textoAtivo,
          ]}
        >
          Início
        </Text>
      </TouchableOpacity>

      {/* Exibe o ranking de trechos com maior criticidade */}
      <TouchableOpacity
        style={styles.item}
        onPress={function () {
          setTela('ranking');
        }}
      >
        <Image
          source={
            tela === 'ranking'
              ? require('../assets/icons/iconeRankingRoxo.png')
              : require('../assets/icons/iconeRankingPreto.png')
          }
          style={styles.icone}
        />

        <Text
          style={[
            styles.texto,
            tela === 'ranking' && styles.textoAtivo,
          ]}
        >
          Ranking
        </Text>
      </TouchableOpacity>
      
      {/* Botão principal para registro de novas ocorrências em campo */}
      <TouchableOpacity
        style={styles.botaoCentral}
        onPress={function () {
          setTela('registro');
        }}
      >
        <Image
          source={
            tela === 'registro'
              ? require('../assets/icons/iconeAddRoxo.png')
              : require('../assets/icons/IconeAddPreto.png')
          }
          style={styles.iconeCentral}
        />
      </TouchableOpacity>

      {/* Consulta do histórico completo de registros realizados */}
      <TouchableOpacity
        style={styles.item}
        onPress={function () {
          setTela('historico');
        }}
      >
        <Image
          source={
            tela === 'historico'
              ? require('../assets/icons/iconeHistoricoRoxoFooter.png')
              : require('../assets/icons/iconeHistoricoPretoFooter.png')
          }
          style={styles.icone}
        />

        <Text
          style={[
            styles.texto,
            tela === 'historico' && styles.textoAtivo,
          ]}
        >
          Histórico
        </Text>
      </TouchableOpacity>

      {/* Área de informações e configurações do usuário */}
      <TouchableOpacity
        style={styles.item}
        onPress={function () {
          setTela('perfil');
        }}
      >
        <Image
          source={
            tela === 'perfil'
              ? require('../assets/icons/iconePerfilRoxoFooter.png')
              : require('../assets/icons/iconePerfilPretoFooter.png')
          }
          style={styles.icone}
        />

        <Text
          style={[
            styles.texto,
            tela === 'perfil' && styles.textoAtivo,
          ]}
        >
          Perfil
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const AZUL = '#5F21F3';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  item: {
    alignItems: 'center',
    width: 60,
  },

  icone: {
    width: 30,
    height: 30,
  },

  iconeCentral: {
    width: 40,
    height: 40,
  },

  texto: {
    fontSize: 12,
    color: '#555',
  },

  textoAtivo: {
    color: AZUL,
    fontWeight: 'bold',
  },

});