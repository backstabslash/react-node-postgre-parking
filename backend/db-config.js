const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "naruto123",
    host: "localhost",
    port: "5432",
    database: "super_parking"
})

module.exports = pool;