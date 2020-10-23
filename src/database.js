const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anotation_electron',
    port: 3307
})

function getConnection(){
    return connection;
}

module.exports = {
    getConnection
}