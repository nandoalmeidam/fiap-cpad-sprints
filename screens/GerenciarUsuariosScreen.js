import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { useUsuario } from '../context/UsuarioContext';

export default function GerenciarUsuariosScreen({ setTela }) {
  const {
    listarAgentesCampo,
    atualizarDadosAgente,
  } = useUsuario();

  const [agentes, setAgentes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // Controla a edição dos dados operacionais do agente.
    const [agenteEditando, setAgenteEditando] = useState(null);
    const [equipeEditando, setEquipeEditando] = useState('');
    const [trechoEditando, setTrechoEditando] = useState('');
    const [regiaoEditando, setRegiaoEditando] = useState('');

    // Controla o processo de salvamento no Firestore.
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
    let ativo = true;

    async function carregarAgentes() {
      try {
        setCarregando(true);
        setErro('');

        const resultado = await listarAgentesCampo();

        if (ativo) {
          setAgentes(resultado);
        }
      } catch (erroConsulta) {
        if (ativo) {
          console.log(
            'Erro ao listar agentes:',
            erroConsulta.code || erroConsulta.message
          );

          setErro('Não foi possível carregar os agentes.');
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }


    carregarAgentes();

    return () => {
      ativo = false;
    };
  }, []);

  // Salva as alterações operacionais do agente no Firestore.
  async function salvarEdicao() {
    if (!agenteEditando || salvando) {
      return;
    }

    const equipe = equipeEditando.trim();
    const trecho = trechoEditando.trim();
    const regiao = regiaoEditando.trim();

    if (!equipe || !trecho || !regiao) {
      setErro('Preencha equipe, trecho e região.');
      return;
    }

    try {
      setSalvando(true);
      setErro('');

      const resultado = await atualizarDadosAgente(
        agenteEditando.uid,
        equipe,
        trecho,
        regiao
      );

      if (!resultado.sucesso) {
        setErro(resultado.mensagem);
        return;
      }

      // Atualiza o card após confirmação do Firestore.
      setAgentes((anteriores) =>
        anteriores.map((agente) =>
          agente.uid === agenteEditando.uid
            ? {
                ...agente,
                equipe,
                trecho,
                regiao,
              }
            : agente
        )
      );

      setAgenteEditando(null);

      console.log('Agente atualizado com sucesso.');

    } catch (erroAtualizacao) {
      console.log(
        'Erro ao salvar edição:',
        erroAtualizacao.code || erroAtualizacao.message
      );

      setErro('Não foi possível salvar as alterações.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setTela('home')}
          style={styles.botaoVoltar}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Image
            source={require('../assets/icons/iconeVoltarHeaderBranco.png')}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>

        <Text
          style={styles.titulo}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Gerenciamento de Equipes
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.conteudo}>
          <Text style={styles.subtitulo}>
            Agentes de Campo
          </Text>

          {carregando ? (
            <Text style={styles.mensagem}>
              Carregando agentes...
            </Text>
          ) : erro ? (
            <Text style={styles.mensagem}>
              {erro}
            </Text>
          ) : agentes.length === 0 ? (
            <Text style={styles.mensagem}>
              Nenhum agente de Campo encontrado.
            </Text>
          ) : (
            agentes.map((agente) => (
              <View
                key={agente.uid}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: '#5F21F3',
                    marginBottom: 8,
                  }}
                >
                  {agente.nome || 'Nome não informado'}
                </Text>

                <Text style={styles.mensagem}>
                  Equipe: {agente.equipe || 'Não informada'}
                </Text>

                <Text style={styles.mensagem}>
                  Trecho: {agente.trecho || 'Não informado'}
                </Text>

                <Text style={styles.mensagem}>
                  Região: {agente.regiao || 'Não informada'}
                </Text>

                {agenteEditando?.uid !== agente.uid && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: salvando
                        ? '#A5A5A5'
                        : '#5F21F3',
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: 'center',
                      marginTop: 16,
                      opacity: salvando ? 0.7 : 1,
                    }}
                    disabled={salvando}
                    onPress={() => {
                      if (salvando) return;

                      setAgenteEditando(agente);
                      setEquipeEditando(agente.equipe || '');
                      setTrechoEditando(agente.trecho || '');
                      setRegiaoEditando(agente.regiao || '');
                      setErro('');
                    }}
                  >
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}
                    >
                      Editar
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}

          {agenteEditando && (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                padding: 18,
                borderRadius: 12,
                marginTop: 16,
                borderWidth: 1,
                borderColor: '#E0E0E0',
              }}
            >
              <Text style={styles.subtitulo}>
                Editar: {agenteEditando.nome}
              </Text>

              <Text style={styles.mensagem}>Equipe</Text>
              <TextInput
                value={equipeEditando}
                onChangeText={setEquipeEditando}
                maxLength={100}
                style={styles.inputEdicao}
                placeholder="Informe a equipe"
              />

              <Text style={styles.mensagem}>Trecho</Text>
              <TextInput
                value={trechoEditando}
                onChangeText={setTrechoEditando}
                maxLength={100}
                style={styles.inputEdicao}
                placeholder="Informe o trecho"
              />

              <Text style={styles.mensagem}>Região</Text>
              <TextInput
                value={regiaoEditando}
                onChangeText={setRegiaoEditando}
                maxLength={100}
                style={styles.inputEdicao}
                placeholder="Informe a região"
              />

              {erro ? (
                <Text
                  style={{
                    color: '#D32F2F',
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  {erro}
                </Text>
              ) : null}

              <TouchableOpacity
                style={{
                  backgroundColor: salvando
                    ? '#A5A5A5'
                    : '#5F21F3',
                  paddingVertical: 14,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginTop: 8,
                  opacity: salvando ? 0.7 : 1,
                }}
                onPress={salvarEdicao}
                disabled={salvando}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  {salvando ? 'Salvando...' : 'Salvar Alterações'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 12,
                  alignItems: 'center',
                  marginTop: 12,
                  opacity: salvando ? 0.5 : 1,
                }}
                disabled={salvando}
                onPress={() => {
                  setAgenteEditando(null);
                  setErro('');
                }}
              >
                <Text
                  style={{
                    color: '#777777',
                    fontWeight: 'bold',
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    backgroundColor: '#5F21F3',
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoVoltar: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVoltar: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 42,
  },
  titulo: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  conteudo: {
    flex: 1,
    padding: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  mensagem: {
    fontSize: 15,
    color: '#777777',
  },
  inputEdicao: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FFFFFF',
    marginTop: 6,
    marginBottom: 14,
  },
});
