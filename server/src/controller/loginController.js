const db = require('../models/db')

module.exports.login = (req, res) =>{
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
}