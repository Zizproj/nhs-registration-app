const { Pool } = require('pg');
const {createTable} = require('./db-utils')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to PostgreSQL database', err);
    } else {
      console.log('Successfully connected to PostgreSQL database at', res.rows[0].now);
    }
  });
  

 createTable(pool, 'clients');
  
module.exports = pool;