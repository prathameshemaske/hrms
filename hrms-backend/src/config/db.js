const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 1000, // Close idle connections almost immediately
  max: 1, // Test with 1 connection to see if saturation is the issue
});

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});

// Simple startup test
pool.query('SELECT 1')
  .then(() => console.log('✅ DB Connection Successful'))
  .catch(e => console.error('❌ DB Connection Failed:', e.message));

module.exports = pool;
