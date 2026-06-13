# 🌱 EcoTrack

### Sprint 2 — Cross-Platform Application Development | FIAP

<p align="center">
  <img src="./assets/images/logoTitulo.png" width="400">
</p>

---

## 📋 Descrição do Projeto

O EcoTrack é uma aplicação mobile desenvolvida para o Challenge CCR Motiva, com o objetivo de apoiar equipes de campo e supervisores no monitoramento e registro de ocorrências relacionadas à conservação da faixa de domínio das rodovias.

A solução permite registrar ocorrências, anexar evidências fotográficas, capturar localização, acompanhar históricos, visualizar rankings de criticidade e gerenciar informações operacionais por meio de uma interface intuitiva e responsiva.

---

## 🎯 Objetivo da Sprint 2

Transformar o protótipo desenvolvido na Sprint 1 em uma aplicação funcional utilizando React Native e Expo, implementando:

- Navegação entre telas
- Cadastro de ocorrências
- Consulta de registros
- Filtros dinâmicos
- Captura de localização
- Upload de imagens
- Gerenciamento de perfil
- Persistência local de dados

---

## 👥 Equipe

| Nome | RM |
|--------|--------|
| Fernando de Almeida Godoi Martines | RM 564820 |
| Gabriel Ber Soares Tarone | RM 563520 |
| Guilherme de Freitas Salgado | RM 562494 |
| Bruno Anselmo Da Silva | RM 566521 |
| Vinicius Ribeiro Dias | RM 566468 |

---

# 🚀 Funcionalidades Implementadas

✅ Login com validação

✅ Seleção de perfil de acesso

✅ Dashboard com indicadores

✅ Cadastro de ocorrências

✅ Registro fotográfico

✅ Captura de localização

✅ Histórico de ocorrências

✅ Filtros por status

✅ Filtros por criticidade

✅ Ranking de ocorrências críticas

✅ Consulta detalhada

✅ Edição de ocorrências

✅ Edição de perfil

✅ Alteração de senha

✅ Configurações do aplicativo

✅ Sincronização de dados

✅ Logout

---

# 📱 Telas do Aplicativo

---

## 00. Splash Screen

<p align="center">
  <img src="./assets/screenshots/00_Inicio.png" width="220">
</p>

Tela de abertura responsável por apresentar a identidade visual do aplicativo antes do carregamento da autenticação.

---

## 01. Login

<p align="center">
  <img src="./assets/screenshots/01_LoginCampo.png" width="220">
  <img src="./assets/screenshots/01_LoginSupervisor.png" width="220">
</p>

Funcionalidades:

- Validação de e-mail
- Validação de senha
- Exibição e ocultação de senha
- Seleção de perfil
- Navegação para o sistema

---

## 02. Dashboard Inicial

<p align="center">
  <img src="./assets/screenshots/02_HomeSupervisor1.png" width="220">
  <img src="./assets/screenshots/02_HomeSupervisor2.png" width="220">
  <img src="./assets/screenshots/02_HomeSupervisorMenu.png" width="220">
</p>

<p align="center">
  <img src="./assets/screenshots/02_HomeSupervisorNotificacao.png" width="220">
</p>

Funcionalidades:

- Indicadores operacionais
- Quantidade de ocorrências
- Ranking resumido
- Menu lateral
- Central de notificações

---

## 04. Confirmação de Envio

<p align="center">
  <img src="./assets/screenshots/04_ConfirmacaoEnvio.png" width="220">
</p>

Funcionalidades:

- Protocolo automático
- Status inicial da ocorrência
- Retorno ao dashboard

---

## 05. Ranking de KMs Críticos

<p align="center">
  <img src="./assets/screenshots/05_RankingKMs.png" width="220">
  <img src="./assets/screenshots/05_RankingKMsFiltro.png" width="220">
</p>

Funcionalidades:

- Busca por KM
- Filtro por criticidade
- Classificação por prioridade
- Navegação para histórico

---

## 06. Registro de Ocorrência

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaNova.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaNovoTipo.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaAdicionarFotoLocalizacao.png" width="220">
</p>

Funcionalidades:

- Cadastro de ocorrências
- Inclusão de novos tipos
- Registro fotográfico
- Captura de localização atual
- Validação de campos obrigatórios

---

## 06. Detalhes da Ocorrência

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrencia1.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrencia2.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaEditar.png" width="220">
</p>

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaAtualizado.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaTipos.png" width="220">
</p>

Funcionalidades:

- Consulta completa da ocorrência
- Visualização de evidências
- Atualização de status
- Edição de informações
- Controle operacional

---

## 07. Histórico de Ocorrências

<p align="center">
  <img src="./assets/screenshots/07_Historico.png" width="220">
  <img src="./assets/screenshots/07_HistoricoFiltro.png" width="220">
  <img src="./assets/screenshots/07_HistoricoNovo.png" width="220">
</p>

Funcionalidades:

- Histórico completo
- Busca por KM
- Busca por tipo
- Filtro por status
- Filtro por criticidade
- Consulta detalhada

---

## 08. Perfil e Configurações

<p align="center">
  <img src="./assets/screenshots/08_Perfil.png" width="220">
  <img src="./assets/screenshots/08_PerfilEditarInformacoes.png" width="220">
  <img src="./assets/screenshots/08_PerfilAlterarSenha.png" width="220">
</p>

<p align="center">
  <img src="./assets/screenshots/08_PerfilConfiguracoes.png" width="220">
  <img src="./assets/screenshots/08_PerfilSincronizacao.png" width="220">
  <img src="./assets/screenshots/08_PerfilSobre.png" width="220">
</p>

Funcionalidades:

- Edição de informações pessoais
- Alteração de senha
- Configurações do aplicativo
- Sincronização de dados
- Informações institucionais
- Logout

---

# 🛠 Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- Context API
- AsyncStorage
- Expo Image Picker
- Expo Location

---

# 📂 Estrutura do Projeto

```text
ecotrack/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
│
├── components/
│
├── context/
│
├── screens/
│
├── App.js
│
└── README.md
```

---

# ▶️ Como Executar

```bash
npm install
```

```bash
npx expo start
```

---

# 🎓 FIAP

Projeto acadêmico desenvolvido para a disciplina Cross-Platform Application Development.
