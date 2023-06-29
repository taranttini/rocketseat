Tarefas

# RF

- [x] O Usuário deve poder criar uma nova transação;
- [ ] O Usuário deve poder obter um resumo da sua conta;
- [x] O Usuário deve poder listar todas transações que já ocorreram;
- [x] O Usuário deve poder visualizar uma transação única;

# RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá;
- [ ] Deve ser possível indenticarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações o qual ele criou;

**Help**

```sh
npx knex migrate:make create-documents

npm run knex -- migrate:make create-document

npm run knex -- migrate:latest

npm run knex -- migrate:rollback

npx vitest
```
