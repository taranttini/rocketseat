# APP

GymPass style app.

# RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu hitórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

# RNs(Regras de Negócio)

- [ ] O usuário não deve conseguir se cadastrar com um e-mail duplicado;
- [ ] O usuário não deve fazer 2 check-ins no mesmo dia;
- [ ] O usuário não deve fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só poder ser validado até 20 minutos após criado;
- [ ] O check-in só poder ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos não Funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco de dados;
- [ ] Todas liastas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);



# ambiente

npm install
npm run start:dev # para trabalho e validações
npm run build # para gerar o pacote
npm run star # para disponibilizar o site