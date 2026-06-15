import {
  useState,
  useRef,
} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import BottomTab from '../components/BottomTab';

import {
  useOcorrencias,
} from '../context/OcorrenciasContext';

const AZUL = '#5F21F3';

/*
 * Tela responsável pelo cadastro de novas
 * ocorrências identificadas em campo.
 *
 * Permite registrar informações do trecho,
 * criticidade, evidências fotográficas e
 * localização da ocorrência.
 */

export default function RegistroScreen({
  setTela,
  setOcorrenciaSelecionada,
}) {

  // Função responsável por adicionar novas
  // ocorrências ao contexto global da aplicação.
  const { adicionarOcorrencia, } = useOcorrencias();

  const [km, setKm] = useState('');

  const [tipoOcorrencia, setTipoOcorrencia] = useState('');

  const [mostrarTipos, setMostrarTipos] = useState(false);

  const [criticidade, setCriticidade] = useState('');

  const [mostrarCriticidades, setMostrarCriticidades] = useState(false);

  const [descricao, setDescricao] = useState('');

  const [carregando, setCarregando] = useState(false);

  const [foto, setFoto] = useState(null);

  const [latitude, setLatitude] = useState('');

  const [longitude, setLongitude] = useState('');

  // Lista de tipos disponíveis para registro.
  // Permite inclusão de categorias personalizadas
  // criadas durante a utilização do aplicativo.
  const [tiposOcorrencia, setTiposOcorrencia] = useState([
      {
        nome: 'Vegetação',
        personalizado: false,
      },

      {
        nome: 'Erosão',
        personalizado: false,
      },

      {
        nome: 'Cerca danificada',
        personalizado: false,
      },

      {
        nome: 'Drenagem',
        personalizado: false,
      },

      {
        nome: 'Sinalização',
        personalizado: false,
      },

      {
        nome: 'Invasão da faixa de domínio',
        personalizado: false,
      },
    ]);

  const [novoTipo, setNovoTipo] = useState('');

  const [mostrandoInputTipo, setMostrandoInputTipo] = useState(false);

  const descricaoRef = useRef(null);

  /*
 * Permite selecionar uma imagem da galeria
 * para utilização como evidência da ocorrência.
 */
  async function escolherFoto() {

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {

      alert(
        'Permissão para acessar fotos negada.'
      );

      return;
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: false,

        quality: 1,
      });

    if (!resultado.canceled) {

      setFoto(
        resultado.assets[0].uri
      );
    }
  }

  /* Permite tirar foto para utilização como evidência da ocorrência */
  async function tirarFoto() {

    const permissao =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {

      alert(
        'Permissão para acessar a câmera negada.'
      );

      return;
    }

    const resultado =
      await ImagePicker.launchCameraAsync({

        allowsEditing: false,

        quality: 1,
      });

    if (!resultado.canceled) {

      setFoto(
        resultado.assets[0].uri
      );
    }
  }

  // Remove um tipo personalizado criado pelo usuário.
  function excluirTipo(nomeTipo) {

    const novaLista =
      tiposOcorrencia.filter(
        function (item) {

          return (
            item.nome !== nomeTipo
          );
        }
      );

    setTiposOcorrencia(
      novaLista
    );

    if (
      tipoOcorrencia === nomeTipo
    ) {

      setTipoOcorrencia('');
    }
  }

  /*
 * Captura a localização atual do dispositivo
 * para complementar os dados do registro.
 *
 * Recurso nativo utilizado para auxiliar
 * a identificação do trecho da rodovia.
 */
  async function capturarLocalizacao() {
    const permissao =
      await Location.requestForegroundPermissionsAsync();

    if (permissao.status !== 'granted') {

      alert(
        'Permissão para acessar localização negada.'
      );

      return;
    }

    const localizacaoAtual =
      await Location.getCurrentPositionAsync({});

    setLatitude(
      String(localizacaoAtual.coords.latitude)
    );

    setLongitude(
      String(localizacaoAtual.coords.longitude)
    );

    alert(
      'Localização capturada com sucesso.'
    );
  }

  /*
 * Valida os campos obrigatórios e realiza
 * o cadastro da ocorrência no sistema.
 */
  async function enviarOcorrencia() {

    // Verifica se os campos obrigatórios
    // foram preenchidos pelo usuário.
    if (
      !km ||
      !tipoOcorrencia ||
      !criticidade ||
      !descricao
    ) {

      alert(
        'Preencha os campos obrigatórios.'
      );

      return;
    }

    // Estrutura da ocorrência armazenada
    // e compartilhada entre as telas do aplicativo.
    const novaOcorrencia = {

      id: Date.now(),

      protocolo:
        'ECO-' + Date.now(),

      km,

      tipo: tipoOcorrencia,

      criticidade,

      descricao,

      foto,

      latitude,

      longitude,

      status: 'Aberta',

      // Define a pontuação utilizada no ranking
      // com base no nível de criticidade.
      pontuacao:
        criticidade === 'Crítico'
          ? 10
          : criticidade === 'Alto'
          ? 8
          : criticidade === 'Médio'
          ? 5
          : 2,

      // Cor utilizada para representação visual
      // da criticidade nas telas do sistema.
      cor:
        criticidade === 'Crítico'
          ? '#C62828'
          : criticidade === 'Alto'
          ? '#F77F00'
          : criticidade === 'Médio'
          ? '#F4B400'
          : '#5FAF6D',
    };

    adicionarOcorrencia(
      novaOcorrencia
    );

    setOcorrenciaSelecionada(
      novaOcorrencia
    );

    setCarregando(true);

    setTimeout(function () {

      setCarregando(false);

      setTela('confirmacao');

    }, 1200);
  }

  return (

    <View style={styles.container}>

      <KeyboardAvoidingView
        style={styles.flex}

        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => setTela('home')}
          >
            <Image
              source={require('../assets/icons/iconeVoltarHeaderBranco.png')}
              style={{ width: 22, height: 22 }}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitulo}>
            Registro de Ocorrência
          </Text>

          <View style={{ width: 22 }} />

        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"

          contentContainerStyle={{
            paddingBottom: 160,
          }}
        >

          <View style={styles.cardFormulario}>

            <Text style={styles.label}>
              KM da Rodovia
              <Text style={styles.asterisco}>
                {' '}*
              </Text>
            </Text>

            <TextInput
              style={styles.input}

              placeholder="Ex.: 123+400"

              placeholderTextColor="#A0A0A0"

              value={km}

              onChangeText={setKm}

              keyboardType="numeric"

              returnKeyType="next"

              onSubmitEditing={() => {
                descricaoRef.current.focus();
              }}
            />

            <Text style={styles.label}>
              Tipo de Ocorrência
              <Text style={styles.asterisco}>
                {' '}*
              </Text>
            </Text>

            {/* Seleção da categoria da ocorrência registrada */}
            <TouchableOpacity
              style={styles.select}

              onPress={function () {

                setMostrarTipos(
                  !mostrarTipos
                );
              }}
            >

              <Text style={styles.selectTexto}>

                {tipoOcorrencia
                  ? tipoOcorrencia
                  : 'Selecione o tipo'}

              </Text>

              <Text style={styles.selectSeta}>
                ˅
              </Text>

            </TouchableOpacity>

            {mostrarTipos && (

              <View style={styles.opcoesBox}>

                {tiposOcorrencia.map(
                  function (item) {

                    return (

                      <View
                        key={item.nome}
                        style={styles.opcaoLinha}
                      >

                        <TouchableOpacity
                          style={styles.opcaoBotao}

                          onPress={function () {

                            setTipoOcorrencia(
                              item.nome
                            );

                            setMostrarTipos(
                              false
                            );
                          }}
                        >

                          <Text style={styles.opcaoTexto}>
                            {item.nome}
                          </Text>

                        </TouchableOpacity>

                        {item.personalizado && (

                          <TouchableOpacity
                            style={styles.botaoExcluir}

                            onPress={function () {

                              excluirTipo(
                                item.nome
                              );
                            }}
                          >

                            <Text style={styles.textoExcluir}>
                              ✕
                            </Text>

                          </TouchableOpacity>
                        )}

                      </View>
                    );
                  }
                )}

                <TouchableOpacity
                  style={styles.opcaoNova}

                  onPress={function () {

                    setMostrandoInputTipo(
                      !mostrandoInputTipo
                    );
                  }}
                >

                  <Text style={styles.opcaoNovaTexto}>
                    + Novo tipo
                  </Text>

                </TouchableOpacity>

                {mostrandoInputTipo && (

                  <View style={styles.boxNovoTipo}>

                    <TextInput
                      style={styles.inputNovoTipo}

                      placeholder="Digite o novo tipo"

                      value={novoTipo}

                      onChangeText={setNovoTipo}
                    />

                    <TouchableOpacity
                      style={
                        styles.botaoAdicionarTipo
                      }

                      onPress={function () {

                        if (!novoTipo.trim()) {
                          return;
                        }

                        const novoItem = {

                          nome: novoTipo,

                          personalizado: true,
                        };

                        const novaLista = [
                          ...tiposOcorrencia,
                          novoItem,
                        ];

                        setTiposOcorrencia(
                          novaLista
                        );

                        setTipoOcorrencia(
                          novoTipo
                        );

                        setNovoTipo('');

                        setMostrandoInputTipo(
                          false
                        );

                        setMostrarTipos(
                          false
                        );
                      }}
                    >

                      <Text
                        style={
                          styles.botaoAdicionarTexto
                        }
                      >
                        Adicionar
                      </Text>

                    </TouchableOpacity>

                  </View>
                )}

              </View>
            )}

            <Text style={styles.label}>
              Criticidade
              <Text style={styles.asterisco}>
                {' '}*
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.select}

              onPress={function () {

                setMostrarCriticidades(
                  !mostrarCriticidades
                );
              }}
            >

              <Text style={styles.selectTexto}>

                {criticidade
                  ? criticidade
                  : 'Selecione o tipo'}

              </Text>

              <Text style={styles.selectSeta}>
                ˅
              </Text>

            </TouchableOpacity>

            {mostrarCriticidades && (

              <View style={styles.opcoesBox}>

                {[
                  'Baixo',
                  'Médio',
                  'Alto',
                  'Crítico',
                ].map(function (item) {

                  return (

                    <TouchableOpacity
                      key={item}

                      style={styles.opcao}

                      onPress={function () {

                        setCriticidade(
                          item
                        );

                        setMostrarCriticidades(
                          false
                        );
                      }}
                    >

                      <Text style={styles.opcaoTexto}>
                        {item}
                      </Text>

                    </TouchableOpacity>
                  );
                })}

              </View>
            )}

            <Text style={styles.label}>
              Descrição
              <Text style={styles.asterisco}>
                {' '}*
              </Text>
            </Text>

            <TextInput
              ref={descricaoRef}

              style={styles.inputDescricao}

              placeholder="Descreva a ocorrência"

              placeholderTextColor="#A0A0A0"

              multiline

              value={descricao}

              onChangeText={setDescricao}
            />

            {/* Registro de evidências fotográficas */}
            <Text style={styles.label}>
              Fotos
            </Text>

            <Text style={styles.subtitulo}>
              Adicione fotos da ocorrência
            </Text>

            <TouchableOpacity
              style={styles.fotoBox}

              onPress={tirarFoto}
            >

              {foto ? (

                <Image
                  source={{
                    uri: foto,
                  }}

                  style={styles.previewFoto}
                />

              ) : (

                <>

                  <Image
                    source={require('../assets/icons/iconeCameraRoxoTirarFoto.png')}
                    style={{ width: 50, height: 50 }}
                  />

                  <Text style={styles.fotoTexto}>
                    Tirar foto
                  </Text>

                </>
              )}

            </TouchableOpacity>

            {/* Permite remover a foto selecionada */}
            {foto && (

              <TouchableOpacity
                style={styles.botaoRemoverFoto}

                onPress={function () {
                  setFoto(null);
                }}
              >

                <Text style={styles.textoRemoverFoto}>
                  Remover foto
                </Text>

              </TouchableOpacity>

            )}

            {/* Captura da localização atual do dispositivo */}
            <Text style={styles.label}>
              Localização
            </Text>

            <TouchableOpacity
              style={styles.localizacaoBox}
              onPress={capturarLocalizacao}
            >

              <Image
                  source={require('../assets/icons/iconeLocalizaçãoVerde.png')}
                  style={{ width: 30, height: 30 }}
                />

              <Text style={styles.localizacaoTexto}>
                {latitude && longitude
                  ? 'Localização capturada'
                  : 'Capturar localização atual'}
              </Text>

            </TouchableOpacity>

            {latitude && longitude && (
              <View style={styles.localizacaoResultado}>

                <Text style={styles.localizacaoResultadoTexto}>
                  Latitude: {latitude}
                </Text>

                <Text style={styles.localizacaoResultadoTexto}>
                  Longitude: {longitude}
                </Text>

              </View>
            )}

          </View>

          {/* Confirma e envia o registro da ocorrência */}
          <TouchableOpacity
            disabled={carregando}

            style={[
              styles.botao,

              carregando && {
                opacity: 0.6,
              },
            ]}

            onPress={enviarOcorrencia}
          >

            <Text style={styles.botaoTexto}>

              {carregando
                ? 'Enviando...'
                : 'Enviar ocorrência'}

            </Text>

          </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>

      <BottomTab setTela={setTela} tela="registro" />

    </View>
  );
}

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },

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
    position: 'relative',
  },

  headerVoltar: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  headerTitulo: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardFormulario: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },

  asterisco: {
    color: '#E53935',
  },

  subtitulo: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: -4,
    marginBottom: 14,
  },

  input: {
    height: 58,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 24,
  },

  select: {
    height: 58,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  selectTexto: {
    color: '#999',
    fontSize: 15,
  },

  selectSeta: {
    fontSize: 20,
    color: '#111827',
  },

  opcoesBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    marginTop: -10,
    marginBottom: 20,
    overflow: 'hidden',
  },

  opcaoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  opcaoBotao: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  opcao: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  opcaoTexto: {
    color: '#333',
    fontSize: 15,
  },

  botaoExcluir: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoExcluir: {
    color: '#E53935',
    fontSize: 18,
    fontWeight: 'bold',
  },

  opcaoNova: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  opcaoNovaTexto: {
    color: AZUL,
    fontWeight: 'bold',
  },

  boxNovoTipo: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  inputNovoTipo: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  botaoAdicionarTipo: {
    backgroundColor: AZUL,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoAdicionarTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  inputDescricao: {
    height: 110,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 14,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top',
    fontSize: 15,
    marginBottom: 24,
  },

  fotoBox: {
    height: 180,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 28,
    overflow: 'hidden',
  },

  previewFoto: {
    width: '100%',
    height: '100%',
  },

  camera: {
    fontSize: 34,
    marginBottom: 6,
  },

  fotoTexto: {
    color: '#777',
    fontSize: 14,
  },

  localizacaoBox: {
    height: 58,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 14,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  localizacaoIcone: {
    fontSize: 20,
    marginRight: 10,
  },

  localizacaoTexto: {
    color: '#999',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  botao: {
    backgroundColor: AZUL,
    marginHorizontal: 56,
    marginTop: 12,
    marginBottom: 18,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  localizacaoResultado: {
    backgroundColor: '#F5F6FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },

  localizacaoResultadoTexto: {
    color: '#374151',
    fontSize: 13,
    marginBottom: 4,
  },

  botaoRemoverFoto: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E53935',
    borderRadius: 12,
  },

  textoRemoverFoto: {
    color: '#E53935',
    fontWeight: 'bold',
  },

});