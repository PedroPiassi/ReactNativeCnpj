# React Native CNPJ

Este é um aplicativo mobile desenvolvido em **React Native**, usando **Expo**, **TypeScript**, **SQLite**, **Formik**, **Yup**, e componentes nativos do React Native. O objetivo do aplicativo é consultar informações sobre clientes através da API gratuita **receitaws** com base no **CNPJ**, cadastrar novos clientes e exibir uma lista infinita desses clientes, incluindo foto.

## Funcionalidades

### 1. Cadastro de Clientes
O aplicativo possui um formulário para cadastrar clientes. O processo é o seguinte:
- O usuário informa o **CNPJ** no campo correspondente.
- Quando um **CNPJ válido** é informado, o aplicativo faz uma consulta à API **receitaws**, preenchendo automaticamente os campos de **razão social** e **endereço**.
- O usuário então seleciona uma **foto** para o cliente e clica em **Cadastrar**.

### 2. Listagem de Clientes
Os clientes cadastrados são exibidos em uma **lista infinita** na página inicial. Cada item da lista mostra:
- **CNPJ**
- **Razão social**
- **Endereço completo**
- **Foto do cliente**

## Tecnologias Usadas
- **React Native**: Para o desenvolvimento do aplicativo mobile.
- **Expo**: Para simplificar o processo de desenvolvimento e testes no dispositivo.
- **TypeScript**: Para garantir um código mais robusto e fácil de manter.
- **SQLite**: Para armazenar os dados dos clientes localmente no dispositivo.
- **Formik**: Para gerenciamento de formulários e validação de dados.
- **Yup**: Para validação dos campos do formulário.

## Como Rodar o Projeto

1. Clone este repositório para o seu computador:

   ```bash
   git clone https://github.com/PedroPiassi/ReactNativeCnpj.git

2. Navegue até o diretório do projeto:

   ```bash
   cd ReactNativeCnpj

3. Instale as dependências:

   ```bash
   npm install

4. Após a instalação das dependências, inicie o projeto:

   ```bash
   npm start

### Para testar o aplicativo, você pode:
- Usar o Expo Go no seu dispositivo móvel para escanear o QR code gerado.
- Ou, rodar o projeto em um emulador no computador.

### Dependências 
- Possuir instalado na máquina o NodeJs.
