const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "farmer_tool_rent",
    password: "Abhijeet@2004",
    port: 5432,
});

module.exports = pool;
