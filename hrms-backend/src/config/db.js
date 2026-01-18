const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 30000,
  idleTimeoutMillis: 30000,
  max: 10,
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

// Simple startup test
pool.query('SELECT 1')
  .then(() => console.log('✅ DB Connection Successful'))
  .catch(e => console.error('❌ DB Connection Failed:', e.message));

module.exports = pool;
