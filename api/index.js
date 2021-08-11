const { json } = require('express');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(json());
app.use(cors());

const pg = require('knex')({
  client: 'pg',
  connection: 'postgres://root:davi@localhost/SQLInjection',
  searchPath: ['knex', 'public'],
});

app.post('/', async (req, res) => {
  const { userName } = req.body;

  // Usando RAW
  const { rows } = await pg.raw(`SELECT * FROM USERS WHERE name = '${userName}'`);

  // Usando Builder
  // const rows = await pg.select('*').from('users').where({ name: userName });

  return res.json({ status: 200, result: rows });
});

app.listen(3000, () => {
  console.log('Server running on port 3000.');
})