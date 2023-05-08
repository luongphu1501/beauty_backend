const expressSession = require('express-session');
const MySQLStore = require('express-mysql-session')(expressSession);

const options = {
    host: 'localhost',
    port: 3306,
    user: "root",
    password: 'luong',
    database: 'beauty_shop',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
const sessionStore = new MySQLStore(options);


const createSessionConfig = () => {
    return {
        secret: "secret-project",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000
        }
    }
}

module.exports = createSessionConfig