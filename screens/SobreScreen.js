import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const AZUL = '#5F21F3';

export default function SobreScreen({
  setTela,
}) {

  // Retorna para a área Minha Conta.
  function voltar() {

    setTela('perfil');

  }

  return (

    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={voltar}
        >

          <Image
            source={require('../assets/icons/iconeVoltarHeaderBranco.png')}
            style={styles.iconeVoltar}
          />

        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Sobre o App
        </Text>

        {/* Mantém o título centralizado */}
        <View style={styles.espacoHeader} />

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.conteudo
        }
      >

        {/* Identidade do aplicativo */}
        <View style={styles.apresentacao}>

          <Text style={styles.logo}>
            EcoTrack
          </Text>

          <Text style={styles.versao}>
            Versão 3.0.11
          </Text>

          <Text style={styles.slogan}>
            Monitoramento inteligente de
            ocorrências rodoviárias
          </Text>

        </View>


        {/* Sobre o EcoTrack */}
        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Sobre o EcoTrack
          </Text>

          <Text style={styles.descricao}>
            O EcoTrack auxilia equipes de campo
            e supervisores no registro,
            acompanhamento e priorização de
            ocorrências relacionadas à conservação
            da faixa de domínio das rodovias.
          </Text>

        </View>


        {/* Principais funcionalidades */}
        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Principais recursos
          </Text>

          <View style={styles.recursoLinha}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Registro de ocorrências em campo
            </Text>
          </View>

          <View style={styles.recursoLinha}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Evidências fotográficas
            </Text>
          </View>

          <View style={styles.recursoLinha}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Captura de localização
            </Text>
          </View>

          <View style={styles.recursoLinha}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Histórico e acompanhamento
            </Text>
          </View>

          <View style={styles.recursoLinha}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Ranking de criticidade
            </Text>
          </View>

          <View style={styles.recursoLinha}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Notificações operacionais
            </Text>
          </View>

          <View style={styles.recursoLinhaSemMargem}>
            <Text style={styles.marcador}>✓</Text>

            <Text style={styles.recursoTexto}>
              Perfis Supervisor e Agente de Campo
            </Text>
          </View>

        </View>


        {/* Informações acadêmicas */}
        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Projeto acadêmico
          </Text>

          <Text style={styles.infoDestaque}>
            Cross-Platform Application Development
          </Text>

          <Text style={styles.infoSecundaria}>
            FIAP • 2026
          </Text>

        </View>


        {/* Equipe */}
        <View style={styles.card}>

          <Text style={styles.cardTitulo}>
            Equipe de Desenvolvimento
          </Text>

          <View style={styles.integrante}>

            <Text style={styles.integranteNome}>
              Bruno Anselmo Da Silva
            </Text>

            <Text style={styles.rm}>
              RM 566521
            </Text>

          </View>

          <View style={styles.integrante}>

            <Text style={styles.integranteNome}>
              Fernando de Almeida Godoi Martines
            </Text>

            <Text style={styles.rm}>
              RM 564820
            </Text>

          </View>

          <View style={styles.integrante}>

            <Text style={styles.integranteNome}>
              Gabriel Ber Soares Tarone
            </Text>

            <Text style={styles.rm}>
              RM 563520
            </Text>

          </View>

          <View style={styles.integrante}>

            <Text style={styles.integranteNome}>
              Guilherme de Freitas Salgado
            </Text>

            <Text style={styles.rm}>
              RM 562494
            </Text>

          </View>

          <View style={styles.integranteSemBorda}>

            <Text style={styles.integranteNome}>
              Vinicius Ribeiro Dias
            </Text>

            <Text style={styles.rm}>
              RM 566468
            </Text>

          </View>

        </View>


        <Text style={styles.rodape}>
          EcoTrack • FIAP • 2026
        </Text>

      </ScrollView>

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

  iconeVoltar: {
    width: 22,
    height: 22,
  },

  espacoHeader: {
    width: 22,
  },

  conteudo: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 50,
  },

  apresentacao: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: AZUL,
  },

  versao: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  slogan: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 14,
  },

  descricao: {
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
  },

  recursoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  recursoLinhaSemMargem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  marcador: {
    color: AZUL,
    fontSize: 17,
    fontWeight: 'bold',
    width: 28,
  },

  recursoTexto: {
    flex: 1,
    fontSize: 14,
    color: '#444',
  },

  infoDestaque: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  infoSecundaria: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },

  integrante: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  integranteSemBorda: {
    paddingTop: 11,
  },

  integranteNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  rm: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },

  rodape: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 8,
  },

});