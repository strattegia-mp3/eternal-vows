# 💍 Eternal Vows

![Status](https://img.shields.io/badge/Status-Completed-success)
![Security](https://img.shields.io/badge/Security-AES%20256-red)
![Stack](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20Tailwind-blue)

> *"Um santuário digital gamificado e seguro, desenvolvido para preservar memórias através de criptografia e design imersivo."*

## 📖 Sobre o Projeto

**Eternal Vows** é uma aplicação web progressiva (PWA) criada como um presente digital. O projeto combina a estética de RPG medieval com uma arquitetura de segurança "Zero-Knowledge". 

O objetivo técnico foi criar uma galeria de fotos totalmente privada hospedada em nuvem pública (Vercel), onde **nenhum arquivo de imagem original é exposto**. Todo o conteúdo é criptografado localmente e só é revelado na memória do dispositivo do usuário mediante uma chave de acesso.

## ✨ Funcionalidades Principais

### 🛡️ Privacidade & Segurança
- **Gatekeeper System:** Tela de bloqueio animada (portões medievais) que impede o acesso à aplicação.
- **Criptografia Client-Side:** Utiliza AES-256 para descriptografar o conteúdo (fotos e textos) em tempo real no navegador. O servidor armazena apenas hashs ilegíveis.
- **Script de Processamento:** Um script Node.js customizado que comprime, redimensiona e criptografa os assets antes do build.

### 🎨 UX & Interatividade
- **Mural Masonry Otimizado:** Layout de fotos distribuído dinamicamente sem uso de bibliotecas pesadas, garantindo performance em mobile.
- **Player de Áudio Retrátil:** Player persistente com modo "Vinil" (minimizado) e "Expandido", com suporte a playlists aleatórias e controles de toque.
- **Animações Fluidas:** Transições de layout (`Framer Motion`) e elementos compartilhados (`layoutId`) para uma experiência de "app nativo".
- **Easter Eggs:** Interações escondidas, contador de dias (precisão de segundos) e sistema de "buffs" (corações).

## 🛠️ Stack Tecnológica

- **Frontend:** React 18, Vite
- **Estilização:** Tailwind CSS
- **Animações:** Framer Motion
- **Segurança:** Crypto-JS (AES)
- **Processamento de Imagem:** Sharp (Node.js)
- **Deploy:** Vercel

## 🔒 Arquitetura de Dados

O fluxo de segurança segue a premissa de que o repositório pode ser público, mas os dados devem permanecer privados.

1.  **Input:** Imagens cruas (`.jpg`, `.png`) são colocadas numa pasta local ignorada pelo Git.
2.  **Processamento:** O script `encryptor.js`:
    * Lê os metadados e datas.
    * Redimensiona e comprime (Sharp).
    * Converte para Base64.
    * Criptografa a string com a senha chave.
3.  **Output:** Um arquivo JSON contendo apenas strings criptografadas é gerado.
4.  **Runtime:** O React baixa o JSON e, ao receber a senha correta, converte as strings em `Blob URLs` na memória volátil.

## 🚀 Como Rodar Localmente

### Pré-requisitos
* Node.js (v16+)

### Instalação

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/eternal-vows.git](https://github.com/seu-usuario/eternal-vows.git)

# 2. Instale as dependências
npm install
```

## Configuração e Criptografia
  1. Crie uma pasta raw_photos na raiz do projeto.
  2. Adicione suas fotos.
  3. Execute o arquivo de criptografia:
```bash
    npm run encrypt
```

## Estrutura Simplificada
```bash
eternal-vows/
├── raw_photos/          # [GITIGNORED] Fotos originais
├── src/
│   ├── assets/          # Músicas e ícones
│   ├── components/      # UI (Hero, Gatekeeper, Player...)
│   ├── context/         # Lógica de Segurança (SecurityContext)
│   ├── data/            # JSON Criptografado (Gerado automaticamente)
│   └── App.jsx
├── encryptor.js         # Script Node.js de segurança
└── README.md
```

>*Desenvolvido com 💜 e Código.*