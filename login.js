const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/usuarios.json';

const leerJSON = () => JSON.parse(fs.readFileSync(path, 'utf-8'))


router.post('/',(req,res) => {
    const {username, password} = req.body
    const usuarios = leerJSON();

    const usuario = usuarios.find(u => u.username === username && u.password === password);
    
    if (!usuario){
        return res.status(401).send("Nombre de usuario o contraseña incorrectos");
    }

    if (usuario.rol == "admin") {
        res.redirect(`/usuarios/${usuario.id}/admin`); 
        }
        else {
            res.redirect(`/usuarios/${usuario.id}`);
        }
});

router.post('/registrar',(req,res) => {
    const {nomRegistro, passRegistro} = req.body
    const usuarios = leerJSON();
 
    const usuarioExiste = usuarios.find(u => u.username === nomRegistro);

    if (!usuarioExiste){
        const nuevousuario = {
        id: (usuarios.length + 1).toString(),
        username: nomRegistro, 
        password: passRegistro,
        rol: "user"
    };

    usuarios.push(nuevousuario);
    fs.writeFileSync(path, JSON.stringify(usuarios,null,2));
    res.status(201).send('Registro Exitoso');

    } 
    else {
         return res.status(401).send("Este nombre de usuario ya existe");
         }
});

module.exports = router;