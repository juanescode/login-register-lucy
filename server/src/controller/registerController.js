const db = require('../models/db')

module.exports.register = (req, res) =>{
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
}