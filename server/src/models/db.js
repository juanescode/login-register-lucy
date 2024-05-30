const  mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', 
    database: 'clientes',
})

try {
    db.connect();
    console.log('La conexion a la base de datos fue exitosa')
} catch (error) {
    console.log('Error al conectarse a la base de datos', error)
}

db.on('error', function(err){
    console.log('Error al conectarse a la base de datos', err)
})

module.exports = db
