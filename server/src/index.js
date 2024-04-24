const express = require('express')
const app = express()
const cors = require('cors')
const port = 3002
const db = require('./models/db')
const router = require('./api/endPoints')

app.use(express.json())
app.use(cors())

app.use('/', router)

// Servidor 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})




