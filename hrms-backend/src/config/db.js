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
  keepalives: true,
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

// Startup check
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in environment!');
} else {
  console.log('📡 DATABASE_URL detected (starts with:', process.env.DATABASE_URL.substring(0, 15) + '...)');
}

pool.query('SELECT 1')
  .then(() => console.log('✅ DB Connection Successful'))
  .catch(e => console.error('❌ DB Connection Failed:', e.message));

module.exports = pool;

module.exports = pool;
