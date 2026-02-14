const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/usuarios.json';

const leerJSON = () => JSON.parse(fs.readFileSync(path, 'utf-8'))

router.get('/', (req, res) => {
    res.send("<h1>Error, falta ID</h1>");
});

router.all('/:id',(req,res) => {
    const id = req.params.id
    const listausuarios = leerJSON();
    const usuario = listausuarios.find(u => u.id == id)
    if (usuario)
        {
            res.json(usuario);
        }
        else {
            res.status(404) .send("Usuario no encontrado");
        }
});

router.all('/:id/admin',(req,res) => {
    const id = req.params.id
    const listausuarios = leerJSON();
    const usuario = listausuarios.find(u => u.id == id)

    if (usuario.rol == "admin")
        {
            res.json(listausuarios);
        }
        else {
            res.status(404) .send("No cuentas con permisos de administrador");
        }
});

router.post('/:id/admin/delete/:idborrar',(req,res) => {
    const id = req.params.id
    const idborrar = req.params.idborrar
    const listausuarios = leerJSON();
    const Usuario = listausuarios.find(u => u.id == id)
    const IndiceUsuario = listausuarios.findIndex(u=> u.id == idborrar);

    if (IndiceUsuario > -1 && Usuario.rol == "admin")
        {
            listausuarios.splice(IndiceUsuario,1);
            fs.writeFileSync(path, JSON.stringify(listausuarios,null,2));
            res.json({ message: "Usuario eliminado con éxito", id: idborrar })

        }
        else {
            res.status(404).send("Error, No se cuentan con los permisos necesarios o no existe el usuario");
        }
});


router.get('/:id/cambiarnombre',(req,res)=> 
    {
    const id = req.params.id
    const listausuarios = leerJSON();
    const usuario = listausuarios.find(u => u.id == id)
    
    res.json(usuario);
    })

router.post('/:id/cambiarnombre',(req,res)=> 
    {
    const id = req.params.id
    const listausuarios = leerJSON();
    const {nuevonombre} = req.body 
    const usuarioexistente = listausuarios.find(u => u.username == nuevonombre)
    
        
    if (usuarioexistente)
    {
        res.json({ message: "Nombre de Usuario cambiado con exito", id: id })
    }
    else
    {
        const IndiceUsuario = listausuarios.findIndex(u=> u.id == id);
        listausuarios[IndiceUsuario].username = nuevonombre
        fs.writeFileSync(path, JSON.stringify(listausuarios,null,2));
        res.status(201).send('Cambio de nombre exitoso Exitoso');
    }
    });

module.exports = router;
