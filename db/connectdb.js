const Pool = require('pg').Pool;


const pool = new Pool({  
  user: "postgres",
  password: "admin123",
  host: "localhost",
  port: 5432,
  database: "storeapi",
});

module.exports = pool;
