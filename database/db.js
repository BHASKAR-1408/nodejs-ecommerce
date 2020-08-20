const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'password',
      database : 'ecommers'
    }
  });

  module.exports = knex;