# 🍔 DevBurger

**Aplicação completa para pedidos e gerenciamento de lanches online**

O **DevBurger** é um projeto full stack que simula um sistema de delivery de hamburgueria, com interface moderna e integração com API de pagamentos (Stripe). Ele permite o cadastro de usuários, realização de pedidos, upload de imagens de produtos e administração do cardápio.

---

## 🧾 Sumário

* [Visão Geral](#visão-geral)
* [Principais Funcionalidades](#principais-funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Instalação e Execução](#instalação-e-execução)
* [Variáveis de Ambiente](#variáveis-de-ambiente)
* [Scripts Disponíveis](#scripts-disponíveis)
* [Futuras Melhorias](#futuras-melhorias)
* [Licença](#licença)
* [Autor](#autor)

---

## 🍟 Visão Geral

O **DevBurger** é uma aplicação desenvolvida em **Node.js** e **React** que une backend e frontend para oferecer uma experiência completa de delivery. A aplicação permite que clientes visualizem o cardápio, adicionem produtos ao carrinho, façam pedidos e realizem pagamentos simulados via Stripe.

Além disso, há um painel administrativo para cadastro e edição de produtos, gerenciamento de usuários e acompanhamento dos pedidos em tempo real.

---

## ⚙️ Principais Funcionalidades

* 🧍‍♂️ Cadastro e autenticação de usuários (JWT + bcrypt)
* 🍔 CRUD completo de produtos (nome, descrição, preço, imagem)
* 🛒 Carrinho de compras dinâmico
* 💳 Pagamentos integrados com **Stripe**
* 📦 Gerenciamento de pedidos
* 🖼️ Upload de imagens com **Multer**
* 🔐 Autenticação segura via token JWT
* 💾 Banco de dados relacional com Sequelize (PostgreSQL)
* 📱 Interface moderna e responsiva com Material UI e Styled Components

---

## 🛠️ Tecnologias Utilizadas

### Backend (API)

* **Node.js** + **Express** — servidor web
* **Sequelize ORM** — modelagem de dados relacional
* **PostgreSQL** — banco de dados principal
* **Mongoose** — usado para gerenciamento de dados auxiliares
* **JWT (jsonwebtoken)** — autenticação baseada em token
* **Bcrypt** — criptografia de senhas
* **Multer** — upload de arquivos (imagens)
* **Stripe** — integração de pagamentos
* **Yup** — validação de dados
* **Dotenv** — variáveis de ambiente

### Frontend (Interface)

* **React 19** — biblioteca principal de UI
* **Vite** — bundler rápido e moderno
* **Material UI (MUI)** — design system e componentes visuais
* **Styled Components** — estilização customizada
* **React Router DOM v7** — gerenciamento de rotas
* **React Hook Form** + **Yup** — formulários e validação
* **Axios** — comunicação com a API
* **React Multi Carousel** — carrosséis de produtos
* **React Toastify** — notificações visuais
* **Stripe React SDK** — integração com Stripe

---

## 📂 Estrutura do Projeto

```
/projeto-devburger
├── api/                # Backend (Express + Sequelize + Stripe)
│   ├── src/
│   │   ├── controllers/   # Lógica das rotas
│   │   ├── models/        # Modelos Sequelize
│   │   ├── routes/        # Definição das rotas
│   │   ├── middlewares/   # Autenticação, upload, etc.
│   │   ├── config/        # Configurações (DB, Multer, JWT)
│   │   └── server.js      # Ponto de entrada do servidor
│   ├── .env               # Variáveis de ambiente da API
│   └── package.json
│
├── interface/          # Frontend (React + MUI + Vite)
│   ├── src/
│   │   ├── pages/       # Páginas principais
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── services/    # Comunicação com API (Axios)
│   │   ├── hooks/       # Hooks personalizados
│   │   └── styles/      # Estilos globais e tema
│   ├── .env             # Variáveis do frontend
│   └── package.json
│
└── README.md
```

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/arielvasconcelosgoncalves/projeto-devburger.git
cd projeto-devburger
```

### 2. Configurar o Backend (API)

```bash
cd api
npm install
```

Crie o arquivo `.env` na pasta `api` com o conteúdo:

```bash
PORT=3001
DB_HOST=localhost
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=devburger
DB_DIALECT=postgres
JWT_SECRET=seu_token_seguro
STRIPE_SECRET_KEY=sua_chave_stripe
```

Rodar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`.

### 3. Configurar o Frontend (Interface)

```bash
cd ../interface
npm install
```

Crie o arquivo `.env` na pasta `interface`:

```bash
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=sua_chave_publica_stripe
```

Executar em modo de desenvolvimento:

```bash
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

### API

| Script        | Descrição                             |
| ------------- | ------------------------------------- |
| `npm run dev` | Inicia o servidor Express com Nodemon |

### Interface

| Script            | Descrição                                 |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento Vite |
| `npm run build`   | Gera build de produção                    |
| `npm run preview` | Pré-visualiza a build local               |
| `npm run lint`    | Executa o linter ESLint                   |

---

## 🧭 Futuras Melhorias

* Dashboard administrativo com estatísticas de vendas
* Recuperação de senha via e-mail
* Filtro e busca de produtos
* Implementação de cupons de desconto
* Sistema de avaliação de produtos
* Dark mode

---

## 📄 Licença

MIT License — livre para uso, modificação e distribuição.

---

## 👨‍💻 Autor

**Ariel Vasconcelos**
Desenvolvedor full stack apaixonado por tecnologia e boas experiências digitais.
🔗 [GitHub](https://github.com/arielvasconcelosgoncalves)
