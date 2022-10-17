const { Pool } = require('pg')

const pool = new Pool(
    {
    // user: process.env.PGUSER,
    // host: process.env.PGHOST,
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,   
    
    // database: 'postgres',
    // port: 5433, 
    // user: 'neliken', 
    // password: 'pswd4321', 
    // host: 'localhost'
}
);

module.exports = {
  query: (text, params) => pool.query(text, params),
}