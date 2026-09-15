# 🌱 EcoTrack

### Sprint 3 — Cross-Platform Application Development | FIAP

<p align="center">
  <img src="./assets/images/logoTitulo.png" width="400">
</p>

---

## 📋 Descrição do Projeto

O **EcoTrack** é uma aplicação mobile desenvolvida para o **Challenge CCR Motiva**, com o objetivo de apoiar equipes de campo e supervisores no monitoramento, registro e acompanhamento de ocorrências relacionadas à conservação da faixa de domínio das rodovias.

A aplicação permite registrar ocorrências, anexar evidências fotográficas, capturar localização, acompanhar o histórico dos registros, consultar indicadores operacionais, visualizar rankings de criticidade e gerenciar informações de acordo com o perfil de acesso do usuário.

Na Sprint 3, o projeto evoluiu para um **protótipo funcional completo**, consolidando os principais fluxos desenvolvidos nas etapas anteriores e ampliando a diferenciação entre os perfis **Supervisor** e **Agente de Campo**.

---

## 🎯 Objetivo da Sprint 3

Consolidar o EcoTrack como uma aplicação funcional e navegável, garantindo que os principais fluxos estejam integrados e que cada perfil de usuário tenha acesso às funcionalidades adequadas às suas atividades.

Nesta Sprint foram priorizados:

- Consolidação dos fluxos desenvolvidos nas Sprints anteriores
- Diferenciação de funcionalidades por perfil de acesso
- Navegação completa entre as telas
- Evolução do dashboard operacional
- Acesso rápido aos registros por meio dos indicadores da Home
- Registro e acompanhamento de ocorrências
- Evidências fotográficas e localização
- Histórico com filtros e pesquisa
- Ranking de criticidade
- Central de notificações
- Gerenciamento de conta e preferências
- Persistência local de dados
- Tratamento de diferentes cenários utilizando dados simulados
- Padronização visual e melhoria da experiência de uso

---

## 👥 Equipe

| Nome | RM |
|---|---|
| Fernando de Almeida Godoi Martines | RM 564820 |
| Gabriel Ber Soares Tarone | RM 563520 |
| Guilherme de Freitas Salgado | RM 562494 |
| Bruno Anselmo Da Silva | RM 566521 |
| Vinicius Ribeiro Dias | RM 566468 |

---

# 🚀 Funcionalidades Implementadas

### 🔐 Autenticação e acesso

- ✅ Login com validação
- ✅ Validação de e-mail e senha
- ✅ Exibição e ocultação da senha
- ✅ Seleção do perfil de acesso
- ✅ Perfis Supervisor e Agente de Campo
- ✅ Alteração de senha
- ✅ Logout

### 📊 Dashboard

- ✅ Dashboard com indicadores operacionais
- ✅ Indicadores adaptados ao perfil do usuário
- ✅ Cards de indicadores navegáveis
- ✅ Acesso ao histórico com filtros automáticos
- ✅ Ranking resumido de criticidade
- ✅ Acessos rápidos às principais funcionalidades

### 📝 Ocorrências

- ✅ Cadastro de ocorrências
- ✅ Validação de campos obrigatórios
- ✅ Registro fotográfico
- ✅ Captura de localização
- ✅ Geração de protocolo
- ✅ Definição automática do status inicial
- ✅ Consulta detalhada da ocorrência
- ✅ Edição de informações
- ✅ Atualização de status
- ✅ Acompanhamento do registro

### 🔎 Histórico

- ✅ Histórico de ocorrências
- ✅ Busca por KM
- ✅ Busca por tipo de ocorrência
- ✅ Filtro por status
- ✅ Filtro por criticidade
- ✅ Acesso aos detalhes da ocorrência
- ✅ Visualização adequada ao perfil de acesso

### 📈 Ranking

- ✅ Ranking de KMs críticos
- ✅ Busca por KM
- ✅ Filtro por criticidade
- ✅ Priorização das ocorrências
- ✅ Acesso exclusivo ao perfil Supervisor

### 🔔 Notificações

- ✅ Central de notificações
- ✅ Indicador de notificações não lidas
- ✅ Integração entre notificação e ocorrência
- ✅ Acesso aos detalhes da ocorrência
- ✅ Controle de notificações nas configurações

### 👤 Minha Conta

- ✅ Visualização das informações do usuário
- ✅ Edição das informações do perfil
- ✅ Alteração de senha
- ✅ Configuração de notificações
- ✅ Configuração de localização GPS
- ✅ Tela Sobre o App
- ✅ Logout

### 💾 Persistência

- ✅ Persistência local com AsyncStorage
- ✅ Persistência das configurações do aplicativo
- ✅ Persistência dos dados utilizados pelos fluxos do protótipo

---

# 👥 Perfis de Acesso

O EcoTrack possui dois perfis de acesso com diferentes responsabilidades dentro da aplicação.

## 👨‍💼 Supervisor

O perfil **Supervisor** possui uma visão mais ampla das operações e acesso às funcionalidades de acompanhamento e priorização.

Principais recursos:

- Visualização geral das ocorrências
- Dashboard completo
- Ranking de KMs críticos
- Central de notificações
- Histórico geral
- Filtros operacionais
- Consulta de detalhes
- Atualização das ocorrências
- Registro de novas ocorrências
- Gerenciamento da própria conta

## 👷 Agente de Campo

O perfil **Agente de Campo** possui uma experiência voltada ao registro e acompanhamento das atividades realizadas em campo.

Principais recursos:

- Dashboard operacional
- Registro de ocorrências
- Registro fotográfico
- Captura de localização
- Consulta das ocorrências relacionadas ao perfil
- Acompanhamento do status dos registros
- Gerenciamento da própria conta

---

# 📱 Telas do Aplicativo

## 00. Splash Screen

<p align="center">
  <img src="./assets/screenshots/00_Inicio.png" width="220">
</p>

Tela de abertura responsável por apresentar a identidade visual do EcoTrack durante a inicialização da aplicação.

Funcionalidades:

- Identidade visual do projeto
- Indicador animado de carregamento
- Transição automática para a autenticação

---

## 01. Login

<p align="center">
  <img src="./assets/screenshots/01_LoginCampo.png" width="220">
  <img src="./assets/screenshots/01_LoginSupervisor.png" width="220">
</p>

Funcionalidades:

- Validação de e-mail
- Validação de senha
- Exibição e ocultação da senha
- Seleção do perfil Supervisor ou Campo
- Validação das credenciais de acordo com o perfil
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
- Quantidade de ocorrências por status
- Indicador de ocorrências críticas
- Cards navegáveis
- Aplicação automática de filtros no Histórico
- Ranking resumido para o Supervisor
- Acesso rápido ao registro e histórico
- Central de notificações para o Supervisor
- Menu de acesso à conta e logout

---

## 03. Registro de Ocorrência

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaNova.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaNovoTipo.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaAdicionarFotoLocalizacao.png" width="220">
</p>

Funcionalidades:

- Cadastro de ocorrências
- Seleção do tipo de ocorrência
- Definição de criticidade
- Descrição da ocorrência
- Registro fotográfico
- Captura da localização atual
- Validação dos campos obrigatórios
- Geração dos dados do registro

---

## 04. Confirmação de Envio

<p align="center">
  <img src="./assets/screenshots/04_ConfirmacaoEnvio.png" width="220">
</p>

Funcionalidades:

- Confirmação do registro
- Protocolo automático
- Exibição do status inicial
- Acesso aos detalhes do registro
- Retorno ao dashboard

---

## 05. Ranking de KMs Críticos

<p align="center">
  <img src="./assets/screenshots/05_RankingKMs.png" width="220">
  <img src="./assets/screenshots/05_RankingKMsFiltro.png" width="220">
</p>

Funcionalidades:

- Visualização dos trechos priorizados
- Busca por KM
- Filtro por criticidade
- Classificação por prioridade
- Recurso disponível ao perfil Supervisor

---

## 06. Detalhes da Ocorrência

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrencia1.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrencia2.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaEditar.png" width="220">
</p>

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaNovaAtualizado.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrenciaTipos.png" width="220">
</p>

Funcionalidades:

- Consulta completa da ocorrência
- Visualização das evidências
- Informações de localização
- Visualização do status
- Atualização de status
- Edição das informações
- Acompanhamento das alterações

---

## 07. Histórico de Ocorrências

<p align="center">
  <img src="./assets/screenshots/07_Historico.png" width="220">
  <img src="./assets/screenshots/07_HistoricoFiltro.png" width="220">
  <img src="./assets/screenshots/07_HistoricoNovo.png" width="220">
</p>

Funcionalidades:

- Consulta dos registros cadastrados
- Busca por KM
- Busca por tipo
- Filtro por status
- Filtro por criticidade
- Recebimento automático de filtros da Home
- Acesso aos detalhes da ocorrência
- Exibição adequada ao perfil de acesso

---

## 08. Minha Conta

<p align="center">
  <img src="./assets/screenshots/08_Perfil.png" width="220">
  <img src="./assets/screenshots/08_PerfilEditarInformacoes.png" width="220">
  <img src="./assets/screenshots/08_PerfilAlterarSenha.png" width="220">
</p>

<p align="center">
  <img src="./assets/screenshots/08_PerfilConfiguracoes.png" width="220">
  <img src="./assets/screenshots/08_PerfilSobre.png" width="220">
</p>

Funcionalidades:

- Visualização das informações do usuário
- Edição das informações do perfil
- Alteração de senha
- Configuração das notificações
- Configuração da localização GPS
- Acesso às informações institucionais
- Logout

---

## 09. Sobre o App

Tela dedicada às informações institucionais do EcoTrack.

Funcionalidades:

- Apresentação do EcoTrack
- Identificação da versão
- Descrição dos principais recursos
- Informações acadêmicas
- Identificação da equipe de desenvolvimento

---

# 🧪 Dados e Cenários de Teste

O EcoTrack utiliza dados simulados para permitir a execução e demonstração dos principais fluxos da aplicação sem dependência de uma API externa.

Os cenários contemplam diferentes:

- Status de ocorrência
- Níveis de criticidade
- Trechos rodoviários
- Perfis de acesso
- Registros operacionais
- Notificações

Essa estrutura permite validar os fluxos principais e alternativos da aplicação durante o desenvolvimento e a apresentação do protótipo.

---

# 💾 Persistência de Dados

O projeto utiliza **AsyncStorage** para persistência local das informações necessárias ao funcionamento do protótipo.

### Persistência de imagens

Atualmente, as fotos das ocorrências são armazenadas por **referência local no dispositivo**.

Como evolução futura, prevê-se a integração com um serviço de armazenamento remoto, mantendo no banco de dados apenas a referência da imagem associada à ocorrência.

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
fiap-cpad-sprint2/
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

## 1. Clone o repositório

```bash
git clone https://github.com/nandoalmeidam/fiap-cpad-sprints.git
```

## 2. Acesse a pasta do projeto

```bash
cd ecotrack
```

## 3. Instale as dependências

```bash
npm install
```

## 4. Inicie o projeto

```bash
npx expo start
```

Após iniciar o Expo, execute a aplicação utilizando um dispositivo físico com **Expo Go** ou um emulador compatível.

> Para funcionalidades que dependem de câmera e localização, a disponibilidade dos recursos pode variar de acordo com o dispositivo ou emulador utilizado.

---

# 🧪 Testes da Sprint 3

Os principais fluxos da aplicação devem ser validados manualmente antes da entrega.

Entre os cenários de teste estão:

- Login como Supervisor
- Login como Agente de Campo
- Tentativa de login com dados inválidos
- Navegação pelos indicadores da Home
- Registro de nova ocorrência
- Validação de campos obrigatórios
- Registro de evidência fotográfica
- Captura de localização
- Consulta do histórico
- Aplicação de filtros
- Consulta dos detalhes
- Atualização de ocorrência
- Consulta do ranking pelo Supervisor
- Acesso às notificações
- Alteração de senha
- Alteração das configurações
- Acesso à tela Sobre o App
- Logout

---

# 🔜 Próximas Evoluções — Sprint 4

Como continuidade do projeto, estão previstas evoluções como:

- Integração com serviços externos
- Evolução da persistência de dados
- Armazenamento remoto das evidências fotográficas
- Ampliação dos testes
- Refinamentos de interface e experiência do usuário
- Tratamento de novos cenários operacionais
- Preparação da aplicação para uma arquitetura mais próxima de produção

---

# 🎓 FIAP

Projeto acadêmico desenvolvido para a disciplina **Cross-Platform Application Development**, como parte do **Challenge CCR Motiva**.

**FIAP • 2026**