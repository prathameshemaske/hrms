const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 20000, // 20 seconds for production stability
  idleTimeoutMillis: 30000,
  max: 20,
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

// Proactive test
pool.query('SELECT 1').then(() => console.log('✅ DB Pool initialized')).catch(e => console.error('❌ DB Pool error:', e));

module.exports = pool;
