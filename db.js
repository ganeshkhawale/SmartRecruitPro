const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"Gdk@1801",
    database:"employee",
    host:"localhost",
    port:5432
});

module.exports = pool;
