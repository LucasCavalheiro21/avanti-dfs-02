# 📚 Banco de Trocas de Conhecimento

![Status](https://img.shields.io/badge/Status-em_desenvolvimento-orange) ![License](https://img.shields.io/badge/License-proprietary-red)

## 📌 Introdução

O **Banco de Trocas de Conhecimento** é uma aplicação web desenvolvida como proposta do curso de **Desenvolvimento Full Stack** da **Escola Atlântico Avanti**.

A plataforma surge como uma solução para a dificuldade enfrentada por pessoas que desejam aprender novas habilidades sem recursos financeiros, conectando-as a indivíduos dispostos a compartilhar seus conhecimentos de forma colaborativa e gratuita. O objetivo é democratizar o acesso ao aprendizado através da tecnologia.

---

## ⚠️ Problematização

Atualmente, a troca de conhecimentos ocorre de forma desorganizada em grupos de mensagens ou redes sociais. Isso gera:

* ❌ Falta de centralização das informações;
* ❌ Dificuldade de filtrar conteúdos específicos (por nível ou categoria);
* ❌ Perda de histórico das ofertas disponíveis;
* ❌ Comunicação ineficiente entre mentor e aluno.

Nossa solução visa **estruturar** essa conexão.

---

## 🎯 Objetivos

### Objetivo Geral

Desenvolver uma aplicação web funcional (Full Stack) que permita o **cadastro, visualização e gerenciamento** de ofertas de conhecimento.

### Objetivos Específicos

* ✅ **Cadastro de Usuários:** Registrar pessoas dispostas a compartilhar conhecimento.
* ✅ **Gestão de Ofertas:** Criar, editar e remover ofertas de ensino.
* ✅ **Busca Inteligente:** Filtrar conhecimentos por categoria e nível de dificuldade.
* ✅ **Interface Amigável:** Design intuitivo desenvolvido em ReactJS.

---

## ⚙️ Funcionalidades do Sistema

O escopo do sistema abrange:

1.  **Módulo de Pessoas:** Cadastro completo com nome, e-mail, telefone e bio.
   
2.  **Módulo de Conhecimentos:**
    * Cadastro de oferta (Título, Descrição, Categoria, Nível).
    * Associação automática com o usuário responsável.
  
3.  **Visualização:** Listagem de cards com detalhes da oferta.
   
4.  **Filtros Avançados:** Busca por Categoria (ex: Tecnologia, Música) e Nível (Básico, Avançado).

---

## 🛠️ Stacks e Tecnologias

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![DBeaver](https://img.shields.io/badge/DBeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white)

---

## 🚀 Como rodar o projeto

### 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Git](https://git-scm.com/)
- [npm](https://npmjs.com/)
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- (Opcional) [DBeaver](https://dbeaver.io/) ou [PgAdmin](https://www.pgadmin.org/) para gerenciar o banco

### 🔧 Instalação e Configuração

#### 1. Clone o repositório

No terminal, navegue até a pasta onde deseja salvar o projeto e execute:

```bash
git clone https://github.com/LucasCavalheiro21/avanti-dfs-02.git
```

#### 2. Acesse a pasta do projeto

Entre na pasta raiz do repositório clonado:

```bash
cd avanti-dfs-02
```

#### 3. Acesse o diretório do Back-End

As configurações do servidor estão na pasta Back-End. Navegue até ela:

```bash
cd BackEnd
```

#### 4. Instale as dependências

Execute o comando abaixo para instalar todas as bibliotecas necessárias listadas no package.json:

```bash
npm install
```

#### 5. Configuração do Banco de Dados

Abra seu gerenciador de banco ou terminal do PostgreSQL e crie um banco novo.

#### 6. Configuração das Variáveis de Ambiente (.env)

Crie um arquivo chamado .env na raiz da pasta Back-End. Dentro dele, adicione a string de conexão com o seu banco de dados PostgreSQL:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
```

Atenção: Substitua USUARIO, SENHA e NOME_DO_BANCO pelas credenciais do seu PostgreSQL local.

#### 7. Configure o Banco de Dados (Prisma)

Para criar as tabelas no seu banco de dados local com base no esquema do projeto, execute:

```bash
npx prisma migrate dev
```

Em seguida, gere o cliente do Prisma (necessário para o código interagir com o banco):

```bash
npx prisma generate
```

#### 8. Executando o Projeto

Com tudo configurado, inicie o servidor:

```bash
npm start
```

#### 9. Testando a API

O projeto roda, por padrão, em http://localhost:8080

Você pode testar as rotas usando o [Insomnia](https://insomnia.rest/) ou o próprio navegador (para requisições GET).

Principais rotas disponíveis para teste:

| Método | Rota | Descrição |
|---|---|---|
| GET | `/pessoas` | Lista todos os usuários |
| POST | `/pessoas` | Cria um novo usuário |
| GET | `/conhecimentos` | Lista os conhecimentos disponíveis |
| POST | `/conhecimentos` | Cria uma nova oferta |

Facilitando a busca com filtros (busca parcial):

| Filtro | Rota | Descrição |
|---|---|---|
| Nome | `/pessoas?nome=carlos` | Buscar por nome |
| Descrição | `/pessoas?descricao=matematica` | Buscar por palavras-chave |
| Combinando filtros | `/pessoas?nome=luc&descricao=professor` | Buscas específicas |
| Título | `/conhecimentos?titulo=javascript` | Buscar por título |
| Descrição | `/conhecimentos?descricao=programação` | Buscar por palavras-chave |
| Categoria | `/conhecimentos?categoria=educa` | Buscar por categorias |
| Nível | `/conhecimentos?nivel=intermed` | Buscar por níveis |
| Combinando filtros | `/conhecimentos?titulo=mat&categoria=educação` | Buscas específicas |

---

## 👥 Equipe de Desenvolvimento

[@Lucas Cavalheiro](https://github.com/LucasCavalheiro21)
- Setup Inicial e Orquestração: Inicialização do repositório Git e configuração do ambiente de desenvolvimento (gerenciamento de dependências e variáveis de ambiente).
- Arquitetura de Persistência: Configuração do Prisma ORM, incluindo a definição de providers, geração do Prisma Client e estruturação inicial do schema.prisma.

[@Isaias Menezes Silva](https://github.com/isaias30silva)
- Core e Routing: Configuração do ponto de entrada da aplicação (server.js) e estruturação da malha de rotas (routes.js), assegurando o correto direcionamento das requisições HTTP para seus respectivos controllers.

[@Matheus da Silva Carvalho](https://github.com/mc4rvalho)
- ​Gestão de Entidades (Conhecimentos): Implementação do conhecimentosController, sendo responsável por toda a lógica de negócio e operações CRUD (Create, Read, Update, Delete) para o gerenciamento de competências.

[@Pedro Fernandes](https://github.com/pedrofernandesx)
- Gestão de Entidades (Pessoas): Desenvolvimento do módulo pessoasController, responsável pela persistência e manipulação de dados referentes aos usuários/perfis no sistema via operações CRUD.

[@Giselle Thamyris Oliveira de Morais](https://github.com/giswolfie)
- ​Modelagem de Dados: Estruturação das tabelas e relacionamentos através do schema.prisma.
- ​Validação e Testes: Execução de testes de integração e validação de endpoints da API utilizando Insomnia, garantindo a integridade dos dados e o correto funcionamento das rotas HTTP.

---

## © Direitos Autorais

Este software é propriedade intelectual da **Equipe 2** de desenvolvimento do Projeto DFS-2026.1 da **Escola Atlântico Avanti**.
**Todos os direitos reservados.** É proibida a cópia, redistribuição ou uso comercial sem autorização expressa dos autores.
