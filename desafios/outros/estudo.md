atualizando senhas sem hash

```js
  app.get("/up", async (request, reply) => {
    const users = await knex("users").select("id", "username", "password");

    const itens = [];
    for (const user of users) {
      

      const passwordCrypted = await Encrypt.cryptPassword(user.password);
      const item = { ...user, password: passwordCrypted };
      itens.push(item);

      const valid = await Encrypt.comparePassword(user.password, item.password);

      // atualizando senhas
      await knex("users").where({ id: user.id }).update({
        password: passwordCrypted,
      });
      

      console.log(user, item, valid);
      {
        ...user,
        password: passwordCrypted,
      });
    }
  });
```