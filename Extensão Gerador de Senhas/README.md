# 🔒 Gerador de Senhas SD (Extensão do Navegador)

Este repositório contém os arquivos necessários para carregar o Gerador de Senhas como uma extensão do tipo "Popup" nos navegadores baseados em Chromium (Google Chrome e Microsoft Edge).

A extensão utiliza o padrão de geração de senhas para ambientes específicos (Seguros Unimed, Leroy Merlin, B3) e salva o último padrão selecionado no armazenamento local (`localStorage` / `storage`).

## 📦 Estrutura da Pasta

A pasta da extensão deve conter os seguintes arquivos:

* **`manifest.json`**: Arquivo de configuração que define a extensão.
* **`index.html`**: Interface do usuário (Popup).
* **`script.js`**: Lógica de geração de senhas e cache.
* **`styles.css`**: Estilos da interface.
* **`New-Atos-logo-blue-RGB.png`**: Imagem do logo.
* **`icon_16.png`, `icon_48.png`, `icon_128.png`**: Arquivos de ícone para o navegador.

## ⚙️ Instruções de Instalação (Carregar sem Compactação)

Para instalar a extensão em modo de desenvolvedor e realizar testes:

### 1. Preparação

1.  **Descompacte** o arquivo `.rar` recebido.
2.  **Localize a pasta raiz** da extensão (aquela que contém o arquivo `manifest.json`).

### 2. Google Chrome

O procedimento de carregamento lateral é ideal para testes rápidos:

1.  **Abra o Google Chrome.**
2.  **Acesse a página de extensões:** Digite `chrome://extensions` na barra de endereços e pressione `Enter`.
3.  **Ative o Modo do Desenvolvedor:** No canto superior direito da tela, ative o *toggle* **Modo do desenvolvedor**.
4.  **Carregue a Extensão:** Clique no botão **Carregar sem compactação** (ou **Load unpacked**).
5.  **Selecione a Pasta:** Na janela que se abrir, navegue e **selecione a pasta raiz** da extensão.

### 3. Microsoft Edge

O processo é o mesmo, dado que o Edge também utiliza a tecnologia Chromium:

1.  **Abra o Microsoft Edge.**
2.  **Acesse a página de extensões:** Digite `edge://extensions` na barra de endereços e pressione `Enter`.
3.  **Ative o Modo do Desenvolvedor:** No canto superior direito da tela, ative o *toggle* **Modo do desenvolvedor**.
4.  **Carregue a Extensão:** Clique no botão **Carregar sem compactação** (ou **Load unpacked**).
5.  **Selecione a Pasta:** Na janela que se abrir, navegue e **selecione a pasta raiz** da extensão.

## ✅ Teste e Uso

Após a instalação, o ícone da extensão aparecerá na barra de ferramentas do navegador.

1.  Clique no ícone para abrir o popup.
2.  Selecione o Padrão de Senha desejado.
3.  Clique em **Gerar Senha**.
4.  A senha gerada pode ser copiada para a área de transferência clicando no botão **Copiar**.