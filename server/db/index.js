const { Pool } = require('pg')

const pool = new Pool(
    {
    user: 'postgres',
    host: 'pgpool',
    database: 'customdatabase',
    password: 'adminpassword',
}
);

module.exports = {
  query: (text, params) => pool.query(text, params),
}
