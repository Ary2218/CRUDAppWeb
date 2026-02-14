const express = require('express')
const cors = require('cors')
const loginRouter = require('./login')
const usuariosRouter = require('./usuarios')
const app = express()

// Borrar el usuarios json cuando este el mongodb
app.use(cors())
app.use(express.json());

app.use('/',loginRouter)
app.use('/usuarios',usuariosRouter)

app.listen(3000, () => {
    console.log('El servidor jala')
})
// Pa despues
//app.use(express.static('ruta/a/la/carpeta/de/angular'));
