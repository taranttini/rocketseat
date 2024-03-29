# APP

GymPass style app.

# RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu hitórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

# RNs(Regras de Negócio)

- [x] O usuário não deve conseguir se cadastrar com um e-mail duplicado;
- [x] O usuário não deve fazer 2 check-ins no mesmo dia;
- [x] O usuário não deve fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só poder ser validado até 20 minutos após criado;
- [ ] O check-in só poder ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos não Funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados;
- [x] Todas liastas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);



# ambiente

npm install

npm run start:dev # para trabalho e validações

npm run build # para gerar o pacote

npm run star # para disponibilizar o site

# prisma

npx prisma init

npx prisma generate # gerar

npx prisma migrate dev # iniciar migração/executar

npx prisma migrate dev --create-only # para criar novas migrations so o script

npx prisma studio # para visualizar as tabelas

npx prisma db push # para realizar a atualizacao do banco


✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started

# Docker

```sh
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRES_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```

```sh
podman run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRES_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest
```
# Podman

podman machine init

podman machine start

podman machine set --rootful  # se precisar de super poder

*configurar nas variaveis de ambiente a pasta dos binarios do podman-compose*

C:\Users\__USER__\.local\share\containers\podman-desktop\extensions-storage\podman-desktop.compose\bin


### Práticas

SOLID

D - Dependency Inversion Principle

JWT: JSON Web Token

Usuário faz login, envia e-mail/senha, o backend cria um token ÚNICO, não modificável e STATLESS.

Stateless: Não armazendado em nenhuma estrutura de persistência de dados;

Backend: Quando vai criar o token ele usa uma PALAVRA-CHAVE (string)

Palavra-chave: kawabanga-master-blaster

E-mail/senha -> header.payload.sing


**acessar a pasta do prisma/vitest-environment-prisma**

`npm link`

ele vai criar um link do pacote fake

**acessar a pasta do raiz do projeto**

`npm link vitest-environment-prisma`

ele vai instalar o nosso pacote fake