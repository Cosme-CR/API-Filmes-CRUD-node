# API de Filmes

API REST desenvolvida com **Node.js**, **Express**, **CORS** e **MySQL**, utilizando arquitetura **MVC** para organização do projeto.

O sistema realiza operações de **CRUD completo** para gerenciamento de filmes, incluindo:

- Cadastro de filmes
- Listagem de todos os filmes
- Busca por ID
- Atualização de dados
- Exclusão de registros
- Validação de dados antes da persistência

---

## Tecnologias Usadas

- Node.js
- Express.js
- CORS
- MySQL
- Knex.js
- JavaScript
- Arquitetura MVC

---

## Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de praticar conceitos essenciais do desenvolvimento back-end, como:

- criação de APIs REST
- integração com banco de dados
- organização em arquitetura MVC
- separação de responsabilidades
- validação de dados
- tratamento de requisições HTTP

---


## Arquitetura MVC

O projeto segue o padrão **MVC (Model - View - Controller)**.

### Model
Responsável pelo acesso ao banco de dados.

Exemplo:

```javascript
insertFilme()
selectAllFilme()
selectByIdFilme()
updateFilme()
deleteFilme()
```

---

### Controller
Responsável por receber as requisições, aplicar regras de negócio e retornar respostas.

Exemplo:

```javascript
async function inserirFilme(req, res) {}
```

---


## Funcionalidades CRUD

### Inserir Filme
```http
POST /filme
```

### Listar Todos
```http
GET /filmes
```

### Buscar por ID
```http
GET /filme/:id
```

### Atualizar Filme
```http
PUT /filme/:id
```

### Excluir Filme
```http
DELETE /filme/:id
```

---

## Exemplo de JSON

```json
{
  "nome": "Interestelar",
  "data_lancamento": "2014-11-06",
  "duracao": "169",
  "sinopse": "Uma jornada espacial em busca de um novo lar para a humanidade.",
  "avaliacao": "9.5",
  "valor": "29.90",
  "capa": "https://link-da-imagem.com/capa.jpg"
}
```

---

## Validação de Dados

A API possui validação para garantir integridade das informações antes de salvar no banco.

Exemplos de validação:

- campos obrigatórios
- tipos de dados
- limite de caracteres
- valores numéricos
- datas válidas


Exemplo:

```javascript
if (!filme.nome || filme.nome.length > 100) {
    return false
}
```

---

## Instalação

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/api-filmes.git
```

Entre na pasta:

```bash
cd api-filmes
```

Instale as dependências:

```bash
npm install
```

---

## Dependências

```bash
npm install express cors mysql2 knex
```

---

## Executando o Projeto

```bash
node app.js
```

---

## Banco de Dados

Exemplo da tabela:

```sql
CREATE TABLE tbl_filme (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_lancamento DATE NOT NULL,
    duracao INT NOT NULL,
    sinopse TEXT NOT NULL,
    avaliacao DECIMAL(3,1),
    valor DECIMAL(10,2),
    capa TEXT
);
```

---

## Aprendizados

Com este projeto foi possível praticar:

- Node.js
- Express
- rotas
- CRUD
- SQL
- integração com MySQL
- Knex
- arquitetura MVC
- boas práticas no back-end

---

## Autor

**Cosme Ribeiro**  

