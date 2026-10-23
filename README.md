# 🌱 EcoTrack

### Sprint 4 — Entrega Final | Cross-Platform Application Development | FIAP

<p align="center">
  <img src="./assets/images/logoTitulo.png" alt="Logo EcoTrack" width="400">
</p>

---

## 📋 Descrição do Projeto

O **EcoTrack** é uma aplicação mobile desenvolvida para o **Challenge Motiva**, com o objetivo de apoiar equipes de campo e supervisores no monitoramento, registro e acompanhamento de ocorrências relacionadas à conservação da faixa de domínio das rodovias.

A aplicação permite registrar ocorrências, anexar evidências fotográficas, capturar localização, acompanhar o histórico dos registros, consultar indicadores operacionais, visualizar rankings de criticidade e gerenciar informações de acordo com o perfil de acesso do usuário.

Ao longo das quatro Sprints, o projeto evoluiu de um protótipo navegável para uma aplicação funcional com autenticação, perfis de acesso, ocorrências e evidências fotográficas integrados aos serviços Firebase. Os fluxos principais foram testados em um dispositivo Android físico.

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

- ✅ Opção para limpar notificações

- ✅ Controle de notificações nas configurações

### 👤 Minha Conta

- ✅ Visualização das informações do usuário

- ✅ Diferenciação das informações por perfil de acesso

- ✅ Edição do perfil com persistência dos dados e recuperação após novo login

- ✅ Alteração de senha

- ✅ Configuração de notificações

- ✅ Configuração de localização GPS

- ✅ Tela Sobre o App

- ✅ Logout

### 💾 Persistência

- ✅ AsyncStorage para configurações e dados locais do protótipo

- ✅ Firebase Authentication para autenticação

- ✅ Cloud Firestore para dados de usuários e gerenciamento de agentes

- ✅ Cloud Firestore para registro, consulta, edição e exclusão de ocorrências

- ✅ Firebase Storage para envio e consulta de evidências fotográficas, com compressão antes do upload

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

- Gerenciamento de equipes e dados operacionais de agentes de Campo

- Registro de novas ocorrências

- Gerenciamento da própria conta

## 👷 Agente de Campo

O perfil **Agente de Campo** possui uma experiência voltada ao registro e acompanhamento das atividades realizadas em campo.

Principais recursos:

- Dashboard operacional

- Registro de ocorrências

- Registro fotográfico com compressão antes do envio

- Captura de localização

- Consulta das ocorrências relacionadas ao perfil

- Acompanhamento do status dos registros

- Gerenciamento da própria conta

---

# 📱 Telas do Aplicativo

## 00. Splash Screen

<p align="center">
  <img src="./assets/screenshots/00_Inicio.png" alt="Splash Screen EcoTrack" width="220">
</p>

Tela de abertura responsável por apresentar a identidade visual do EcoTrack durante a inicialização da aplicação.

Funcionalidades:

- Identidade visual do projeto

- Indicador animado de carregamento

- Transição automática para a autenticação

---

## 01. Login

<p align="center">
  <img src="./assets/screenshots/01_LoginSupervisor.png" width="220">
  <img src="./assets/screenshots/01_LoginCampo.png" width="220">
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
  <img src="./assets/screenshots/02_HomeSupervisor.png" width="220">
  <img src="./assets/screenshots/02_HomeCampo.png" width="220">
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

- Experiência adaptada ao perfil de acesso

- Menu de acesso à conta e logout

---

## 03. Histórico de Ocorrências

<p align="center">
  <img src="./assets/screenshots/03_HistoricoOcorrencias.png" width="220">
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

## 04. Confirmação de Envio

<p align="center">
  <img src="./assets/screenshots/04_ConfirmacaoEnvio.png" width="220">
</p>

Funcionalidades:

- Confirmação visual do registro

- Geração automática do protocolo

- Exibição do status inicial da ocorrência

- Retorno ao dashboard

---

## 05. Registro de Ocorrência

<p align="center">
  <img src="./assets/screenshots/05_RegistroOcorrenciaNovaVazio.png" width="220">
  <img src="./assets/screenshots/05_RegistroOcorrenciaNova.png" width="220">
  <img src="./assets/screenshots/05_RegistroOcorrenciaNova1.png" width="220">
</p>
<p align="center">
  <img src="./assets/screenshots/05_RegistroOcorrenciaNova2.png" width="220">
</p>

Funcionalidades:

- Cadastro de ocorrências

- Preenchimento do KM da rodovia

- Suporte ao padrão de KM, como `123+400`

- Seleção do tipo de ocorrência

- Definição de criticidade

- Descrição da ocorrência

- Registro fotográfico

- Remoção da evidência fotográfica

- Captura da localização atual

- Validação dos campos obrigatórios

- Envio da ocorrência

---

## 06. Detalhes da Ocorrência

<p align="center">
  <img src="./assets/screenshots/06_DetalhesOcorrencia1.png" width="220">
  <img src="./assets/screenshots/06_DetalhesOcorrencia2.png" width="220">
</p>

Funcionalidades:

- Consulta completa da ocorrência

- Visualização do KM

- Visualização do tipo

- Visualização da criticidade

- Visualização do status

- Identificação do perfil responsável pelo registro

- Visualização da descrição

- Visualização da evidência fotográfica

- Edição das informações

- Exclusão de ocorrências pelo Supervisor

- Atualização do status

---

## 07. Ranking de KMs Críticos

<p align="center">
  <img src="./assets/screenshots/07_RankingKmCriticos.png" width="220">
</p>

Funcionalidades:

- Visualização dos trechos priorizados

- Busca por KM

- Filtro por criticidade

- Classificação por pontuação

- Priorização das ocorrências

- Acesso rápido ao Histórico

- Recurso disponível ao perfil Supervisor

---

## 08. Minha Conta

### Supervisor

<p align="center">
  <img src="./assets/screenshots/08_PerfilSupervisor.png" width="220">
</p>

### Agente de Campo

<p align="center">
  <img src="./assets/screenshots/08_PerfilCampo.png" width="220">
</p>

### Senha e Configurações

<p align="center">
  <img src="./assets/screenshots/08_PerfilSupervisor1.png" width="220">
</p>

Funcionalidades:

- Visualização das informações do usuário

- Identificação do perfil de acesso

- Avatar adaptado ao perfil

- Edição das informações do perfil

- Alteração de senha

- Configuração das notificações

- Configuração da localização GPS

- Acesso às informações do aplicativo

- Logout

---

## 09. Sobre o App

<p align="center">
  <img src="./assets/screenshots/09_Sobre.png" width="220">
  <img src="./assets/screenshots/09_Sobre1.png" width="220">
</p>

Tela dedicada às informações institucionais e acadêmicas do EcoTrack.

Funcionalidades:

- Apresentação do EcoTrack

- Identificação da versão

- Descrição dos principais recursos

- Informações acadêmicas

- Identificação da equipe de desenvolvimento

- Identificação dos integrantes e respectivos RMs

---

## 10. Notificações

<p align="center">
  <img src="./assets/screenshots/10_Notificacao.png" width="220">
</p>

Funcionalidades:

- Centralização das notificações operacionais

- Identificação de novas ocorrências

- Exibição do KM e tipo da ocorrência

- Exibição da criticidade

- Identificação de notificações não lidas

- Acesso à ocorrência relacionada

- Opção para limpar as notificações

---

# 🧪 Dados e Cenários de Teste

Na Sprint 3, o EcoTrack utilizou dados simulados para demonstrar fluxos operacionais. Na Sprint 4, os fluxos de autenticação, perfis, gerenciamento de equipes e ocorrências passaram a utilizar serviços Firebase. Foram testados em dispositivo Android físico o login por perfil, o cadastro de ocorrência com e sem foto, a consulta dos detalhes, a edição, a alteração de status, a exclusão pelo Supervisor e a recuperação dos dados do perfil após logout e novo login.

Os cenários contemplam diferentes:

- Status de ocorrência

- Níveis de criticidade

- Trechos rodoviários

- Perfis de acesso

- Registros operacionais

- Notificações

Os testes manuais realizados apoiam a validação dos principais fluxos da aplicação.

---

# 💾 Persistência de Dados

O projeto utiliza **AsyncStorage** para preferências locais, **Firebase Authentication** para autenticação, **Cloud Firestore** para perfis, gerenciamento de agentes e ocorrências, e **Firebase Storage** para evidências fotográficas. Os registros de ocorrência são consultados com atualização em tempo real. As regras de acesso diferenciam Supervisor e Agente de Campo.

### Persistência de imagens

As fotos selecionadas no dispositivo são redimensionadas e comprimidas em JPEG antes do envio ao **Firebase Storage**, respeitando o limite de 5 MB configurado para o upload. A URL da imagem fica associada ao documento da ocorrência no Cloud Firestore. O envio e a visualização de fotos foram testados em dispositivo Android físico.

---

# 🛠 Tecnologias Utilizadas

- React Native

- Expo

- JavaScript

- Context API

- AsyncStorage

- Expo Image Picker

- Expo Location

- Firebase Authentication

- Cloud Firestore

- Firebase Storage

- Expo Image Manipulator

---

# 📂 Estrutura do Projeto

O projeto **EcoTrack está na raiz do repositório GitHub** `fiap-cpad-sprints`. O nome `ecotrack` pode ser usado para a pasta local no computador de um integrante, mas **não é uma subpasta do repositório clonado**.

```text
fiap-cpad-sprints/
├── assets/
│   ├── icons/
│   ├── images/
│   └── screenshots/
├── components/
│   └── BottomTab.js
├── context/
│   ├── ConfiguracoesContext.js
│   ├── NotificacoesContext.js
│   ├── OcorrenciasContext.js
│   └── UsuarioContext.js
├── screens/
│   ├── ConfirmacaoScreen.js
│   ├── DetalhesScreen.js
│   ├── GerenciarUsuariosScreen.js
│   ├── HistoricoScreen.js
│   ├── HomeScreen.js
│   ├── NotificacoesScreen.js
│   ├── PerfilScreen.js
│   ├── RankingScreen.js
│   ├── RegistroScreen.js
│   ├── SobreScreen.js
│   └── SplashScreen.js
├── App.js
├── index.js
├── app.json
├── eas.json
├── firebaseConfig.js
├── firebase.json
├── firestore.rules
├── package.json
├── package-lock.json
└── README.md
```

> A listagem representa os principais arquivos e diretórios do aplicativo. Outros arquivos de configuração e suporte podem estar presentes.

---

# ▶️ Como Instalar e Executar o Projeto (Desenvolvimento)

## Pré-requisitos

- **Node.js** e **npm** instalados.

- **Git** instalado.

- Dispositivo Android com **Expo Go** ou emulador Android compatível.

- Conexão à internet para os serviços Firebase.

- Conta autorizada para acessar o aplicativo; as credenciais são fornecidas pela equipe de forma privada.

## 1. Clonar o repositório

Abra o terminal e execute:

```bash

git clone https://github.com/nandoalmeidam/fiap-cpad-sprints.git

```

## 2. Entrar na pasta clonada

```bash

cd fiap-cpad-sprints

```

## 3. Instalar as dependências

```bash

npm install

```

## 4. Iniciar o Expo

```bash

npx expo start

```

## 5. Abrir o aplicativo


- **Dispositivo Android físico:** instale o aplicativo Expo Go, disponível na Google Play Store. Em seguida, abra o Expo Go e escaneie o QR Code gerado pelo servidor de desenvolvimento para executar o EcoTrack no dispositivo.

- **Emulador Android:** inicie o emulador e pressione `a` no terminal do Expo.

> O acesso à câmera, à galeria e à localização depende das permissões concedidas e dos recursos do dispositivo. A compatibilidade com o Expo Go deve ser verificada na versão do SDK utilizada; se necessário, use uma build de desenvolvimento.

## Firebase e acesso

O EcoTrack utiliza **Firebase Authentication** para autenticação, **Cloud Firestore** para perfis, equipes e ocorrências e **Firebase Storage** para imagens. O envio e a visualização de evidências fotográficas foram testados no aplicativo.

O arquivo `firebaseConfig.js` contém a configuração do projeto Firebase. Para acessar o ambiente real, `USAR_EMULADORES` deve estar como `false`. O uso do aplicativo requer uma conta autorizada no Firebase Authentication e um documento de perfil correspondente no Firestore.

---

## 🔐 Acesso para Avaliação Acadêmica

O EcoTrack disponibiliza duas contas de demonstração para permitir a avaliação das funcionalidades da aplicação, respeitando os diferentes níveis de acesso.

| Perfil | E-mail | Funcionalidades disponíveis |
|---|---|---|
| **Supervisor** | supervisor@ecotrack.com.br | Gerenciamento de equipes, acompanhamento de ocorrências, ranking, atualização de status e administração operacional |
| **Agente de Campo** | campo@ecotrack.com.br | Registro de ocorrências, envio de evidências fotográficas, captura de localização e acompanhamento dos próprios registros |

**Credenciais de acesso:** as senhas das contas de demonstração serão disponibilizadas ao professor no material privado de entrega acadêmica.

**Observação:** as contas são destinadas exclusivamente à avaliação do projeto EcoTrack — Sprint 4.

---

# 🧪 Testes da Sprint 4

Os principais fluxos foram exercitados manualmente no Android físico com Expo Go. Os testes abaixo descrevem funcionalidades do aplicativo; entre os cenários confirmados nesta etapa estão login por perfil, cadastro de ocorrência com e sem foto, visualização de fotos, edição e exclusão de ocorrência pelo Supervisor, além de edição e recuperação do perfil após novo login.

Entre os cenários de teste estão:

- Login como Supervisor

- Login como Agente de Campo

- Tentativa de login com dados inválidos

- Navegação pelos indicadores da Home

- Registro de nova ocorrência

- Validação de campos obrigatórios

- Registro de evidência fotográfica

- Remoção de evidência fotográfica

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

# 🏁 Sprint 4 — Entrega Final

### Situação da entrega

| Item | Situação |
|---|---|
| Autenticação com Firebase e gerenciamento de agentes | ✅ Concluído — Implementado e testado |
| Cloud Firestore e regras de acesso | ✅ Concluído — Configurado, publicado e validado |
| Firebase Storage e evidências fotográficas | ✅ Concluído — Upload, compressão e visualização testados |
| Persistência de ocorrências no Firestore | ✅ Concluído — Cadastro, consulta, edição e exclusão validados |
| Correções decorrentes dos testes da Sprint 3 | ✅ Concluído — Correções implementadas e testadas |
| APK Android instalável | ✅ Concluído — Versão final disponibilizada para avaliação |
| Plano de negócio | ✅ Concluído — Proposta documentada |
| Pitch e demonstração (até 5 minutos) | ✅ Concluído — Vídeo finalizado para apresentação |
| README consolidado | ✅ Concluído — Documentação final atualizada |


## 📦 Download e Instalação — APK Android

O EcoTrack disponibiliza sua versão Android em formato APK, permitindo a instalação e execução do aplicativo diretamente em dispositivos compatíveis, sem a necessidade do Expo Go ou de um ambiente de desenvolvimento.

### 🔗 Download da versão final

**[Baixar EcoTrack — GitHub Releases](https://github.com/nandoalmeidam/fiap-cpad-sprints/releases/latest)**

O arquivo de instalação está disponível na seção **Assets** da página de lançamento. Selecione o arquivo com extensão `.apk` para realizar o download.


### 📱 Como instalar no Android

1. Acesse o link de download pelo navegador do dispositivo Android.
2. Na seção **Assets**, baixe o arquivo `.apk` disponibilizado.
3. Abra o arquivo baixado para iniciar a instalação.
4. Caso solicitado, autorize a instalação de aplicativos provenientes dessa fonte nas configurações do Android.
5. Conclua a instalação e abra o **EcoTrack**.
6. Utilize as contas de demonstração descritas na seção [Acesso para Avaliação Acadêmica](#-acesso-para-avaliação-acadêmica).

> **Observação:** o APK funciona independentemente do Expo Go. É necessária uma conexão com a internet para autenticação e sincronização dos dados.

## 🎥 Vídeo final

**Pitch e demonstração (até 5 minutos):** [Clique aqui para acessar](https://youtu.be/eVUkzFXtAzE).

---

# 💼 Plano de Negócio — EcoTrack

O EcoTrack apresenta um modelo de negócio voltado à modernização dos processos de conservação e monitoramento rodoviário, utilizando tecnologia móvel para centralizar informações, organizar ocorrências e apoiar a tomada de decisões operacionais.

O plano de negócio contempla a proposta de valor, o público-alvo, o modelo de receita, a estrutura de custos, os diferenciais competitivos, os riscos operacionais e o impacto esperado da solução.

### Proposta de Valor

O EcoTrack oferece uma solução digital para centralizar registros de conservação da faixa de domínio, evidências fotográficas e informações de geolocalização em um aplicativo móvel.

A plataforma facilita a comunicação entre agentes de campo e supervisores, promovendo maior organização, rastreabilidade e acompanhamento das ocorrências identificadas durante inspeções rodoviárias.

### Público-Alvo e Personas

O EcoTrack foi desenvolvido considerando três públicos principais:

- **Agente de Campo:** responsável por registrar ocorrências, anexar evidências fotográficas, informar a localização e acompanhar o andamento dos registros realizados.

- **Supervisor de Conservação:** responsável por consultar o histórico de ocorrências, utilizar filtros, acompanhar indicadores de criticidade, atualizar registros e apoiar a organização das atividades operacionais.

- **Cliente Institucional:** concessionárias rodoviárias e empresas responsáveis pela conservação, manutenção e operação de rodovias, interessadas em soluções digitais para gestão e monitoramento.

### Modelo de Receita

O modelo comercial proposto para o EcoTrack é o **Business-to-Business (B2B)**, direcionado a concessionárias rodoviárias e unidades operacionais.

A monetização está estruturada em:

- **Licenciamento por assinatura:** contratação mensal ou anual, considerando o número de usuários e a dimensão da operação.
- **Implantação e configuração:** preparação da solução para utilização pela organização contratante.
- **Treinamento:** capacitação de agentes de campo e supervisores.
- **Suporte e manutenção:** atendimento técnico, correções e atualizações do aplicativo.
- **Integrações corporativas:** serviços adicionais para conexão com sistemas utilizados pelas concessionárias.

A precificação comercial considera fatores como quantidade de usuários, infraestrutura necessária, armazenamento de evidências e serviços contratados.

### Estrutura de Custos Operacionais

A estrutura de custos do EcoTrack contempla os recursos necessários para manter a aplicação disponível, segura e atualizada.

Os principais componentes são:

- **Infraestrutura em nuvem:** Firebase Authentication, Cloud Firestore e Firebase Storage.
- **Manutenção do aplicativo:** correções, atualizações e melhorias contínuas.
- **Suporte técnico:** atendimento aos usuários e resolução de problemas operacionais.
- **Monitoramento e segurança:** acompanhamento dos serviços, controle de acessos e proteção das informações.
- **Distribuição Android:** geração, publicação e atualização das versões instaláveis do aplicativo.
- **Capacitação de usuários:** treinamentos e materiais de orientação.
- **Integrações corporativas:** desenvolvimento e manutenção de conexões com sistemas externos, quando contratadas.

Os custos operacionais variam de acordo com o consumo dos serviços, o número de usuários ativos e a estrutura contratada.

### Diferenciais Competitivos

O EcoTrack reúne funcionalidades voltadas às necessidades das equipes de conservação rodoviária.

Seus principais diferenciais são:

- **Perfis de acesso distintos:** funcionalidades específicas para Agente de Campo e Supervisor.
- **Registro de evidências:** associação de fotografias e localização às ocorrências.
- **Histórico centralizado:** consulta e acompanhamento dos registros realizados.
- **Filtros operacionais:** organização das ocorrências por critérios relevantes para a gestão.
- **Ranking de criticidade:** apoio à identificação de trechos que demandam maior atenção.
- **Persistência em nuvem:** armazenamento e sincronização das informações utilizando Firebase.
- **Experiência mobile:** interface desenvolvida para utilização em dispositivos Android durante as rotinas operacionais.

### Riscos e Estratégias de Mitigação

A análise de riscos considera fatores técnicos, financeiros, operacionais e de segurança.

- **Conectividade em campo:** a operação depende de acesso à internet para comunicação com os serviços em nuvem. Uma estratégia de armazenamento offline e sincronização posterior constitui uma possibilidade de evolução da solução.

- **Custos variáveis de infraestrutura:** o consumo dos serviços Firebase pode variar conforme o volume de registros, usuários e fotografias. O controle financeiro pode ser realizado por meio do acompanhamento de utilização e da configuração de alertas orçamentários.

- **Proteção de dados e controle de acesso:** a aplicação utiliza autenticação Firebase e regras de segurança para restringir operações conforme as permissões estabelecidas. A manutenção dessas proteções requer acompanhamento periódico.

- **Adoção operacional:** a utilização da plataforma em uma organização depende da capacitação dos profissionais, da adequação aos processos internos e da avaliação de sua aplicação em condições reais.

### Impacto Esperado

O EcoTrack busca contribuir para a melhoria dos processos de conservação rodoviária por meio dos seguintes benefícios:

- **Maior rastreabilidade:** acompanhamento das ocorrências registradas pelas equipes.
- **Padronização das informações:** organização de descrições, fotografias e localizações.
- **Eficiência operacional:** redução da dispersão de informações entre diferentes meios de registro.
- **Apoio à priorização:** identificação de ocorrências e trechos que demandam maior atenção.
- **Visibilidade gerencial:** acesso centralizado às informações pelos supervisores.
- **Potencial de escalabilidade:** possibilidade de expansão para outras equipes e unidades operacionais.

Esses benefícios representam os resultados esperados da adoção da solução. Sua mensuração quantitativa depende de utilização e avaliação em ambiente operacional real.

### Conclusão do Plano de Negócio

O plano de negócio do EcoTrack está **concluído como parte da entrega acadêmica da Sprint 4**, apresentando uma proposta estruturada de comercialização, operação e evolução da plataforma.

A solução combina funcionalidades de registro e acompanhamento de ocorrências com um modelo comercial B2B, direcionado às necessidades de concessionárias e organizações responsáveis pela conservação rodoviária.

O projeto apresenta uma base tecnológica e uma proposta de valor definidas, com potencial para aplicação e expansão em ambientes operacionais.

---

# 📅 Resumo das Quatro Sprints

| Sprint | Evolução e Entregas |
|---|---|
| **Sprint 1** | Desenvolvimento da estrutura inicial do EcoTrack, definição da identidade visual, organização das telas e implementação dos primeiros fluxos do protótipo. |
| **Sprint 2** | Implementação e evolução das funcionalidades de login, registro de ocorrências, histórico, detalhes, ranking de criticidade, perfil do usuário e configurações. |
| **Sprint 3** | Consolidação da navegação, diferenciação entre os perfis Supervisor e Agente de Campo, indicadores operacionais, notificações, filtros, evidências fotográficas e testes funcionais do protótipo. |
| **Sprint 4** | Conclusão da integração com Firebase Authentication, Cloud Firestore e Firebase Storage; gerenciamento de equipes e permissões; persistência de ocorrências e fotografias; validação dos fluxos no Android; implementação de melhorias de segurança; consolidação da documentação; disponibilização do APK Android pelo GitHub Releases e finalização do vídeo de apresentação. |

### 🏁 Conclusão do Projeto

O EcoTrack concluiu seu ciclo de desenvolvimento acadêmico ao longo das quatro sprints, evoluindo de um protótipo inicial para uma aplicação móvel integrada aos serviços Firebase.

A entrega final da Sprint 4 reúne as funcionalidades implementadas, os testes funcionais realizados, a documentação técnica, o plano de negócio, o APK Android e o vídeo de apresentação.

**Status do projeto: Concluído — Sprint 4 | Entrega Final CPAD — FIAP.**

---

## 👥 Equipe de Desenvolvimento

| Integrante | RM |
|---|---|
| Bruno Anselmo Da Silva | 566521 |
| Fernando de Almeida Godoi Martines | 564820 |
| Gabriel Ber Soares Tarone | 563520 |
| Guilherme de Freitas Salgado | 562494 |
| Vinicius Ribeiro Dias | 566468 |

---

# 🎓 FIAP

Projeto acadêmico desenvolvido para a disciplina **Cross-Platform Application Development**, como parte do **Challenge Motiva**.

**FIAP • 2026**
