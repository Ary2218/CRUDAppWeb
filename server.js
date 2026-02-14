const express = require('express')
const loginRouter = require('./login')
//const usuariosRouter = require('./usuarios')
const app = express()

// Borrar el usuarios json cuando este el mongodb
app.use(express.json());

app.use('/',loginRouter)
//app.use('/usuario',usuariosRouter)

app.listen(3000, () => {
    console.log('El servidor jala')
})