Tarefas

# RF

- [x] O Usuário deve poder criar uma nova transação;
- [x] O Usuário deve poder obter um resumo da sua conta;
- [x] O Usuário deve poder listar todas transações que já ocorreram;
- [x] O Usuário deve poder visualizar uma transação única;

# RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
- [x] Deve ser possível indenticarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;

**Help**

```sh
npx knex migrate:make create-documents

npm run knex -- migrate:make create-document

npm run knex -- migrate:latest

npm run knex -- migrate:rollback

npx vitest

```

## tsup 

ferramenta para fazer o build rápido do sistema


## render

ferramenta de deploy (free para exemplos)

**Build Command**

npm install && npm run knex -- migrate:latest && npm run build

cd 02-criando-api-rest-com-node-js && npm install && npm run knex -- migrate:latest && npm run build

**Start Command**

node build/server.js

Selecionar Advanced

Adicionar variável de ambiente


RENDER x FASTIFY

https://github.com/render-examples/fastify-hello-world

KNEX

https://knexjs.org/guide/#configuration-options