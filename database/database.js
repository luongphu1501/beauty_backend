const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'beauty_shop',
    password: 'luong'
}, () => {
    console.log("connect to database successfully")
})

module.exports = pool;