const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Prathamesh*141#',
  database: 'postgres',
  port: 5432,
});

module.exports = pool;
