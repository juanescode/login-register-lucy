// dependecias 
const express = require('express')
const app = express()
const  mysql = require('mysql')
const cors = require('cors')
const { Message } = require('@mui/icons-material')

app.use(express.json())
app.use(cors())

// Servidor 
app.listen(3002, () => {
    console.log('Server is running on port 3002')
})

//Crear bases de datos (mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', //Opcional, solo si esta en el xampp
    database: 'clientes',
})

//Crear una ruta al servidorque registrara un usuario

app.post('/register', (req, res) =>{
    //Se necesita obtener variables enviadas desde el formulario
    const sentEmail = req.body.Email
    const sentUsername = req.body.UserName
    const sentPassword = req.body.Password

    //Se crea una declaracion SQL para insertar el usuario en la tabla de la base de datos us 
    const SQL = 'INSERT INTO Users (email, username, password) VALUES (?,?,?)' // Se va a ingresar estos valores a traves de una varible
    const Values = [sentEmail, sentUsername, sentPassword]

    // Consulta primero para ejecutar la instruccion SQL indicada anteriormente
    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('El usuario se registro correctamente')
            res.send({message: 'Ususario agregado'})
        }
    })

})

//DB credenciales de login (autentificadas)
app.post('/login', (req, res) =>{
    const sentloginUsername = req.body.loginUserName
    const sentLoginPassword = req.body.loginPassword

    //Se crea una declaracion SQL para insertar el usuario en la tabla de la base de datos us 
    const SQL = 'SELECT * FROM users WHERE username = ? && password = ?' // Se va a ingresar estos valores a traves de una varible
    const Values = [sentloginUsername, sentLoginPassword]

    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message:  `credenciales no encontradas `})

        }
    })
})

