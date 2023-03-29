const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");
const db = require("../models/alumno.js")
const axios = require("axios")

router.get('/consultar',async(req,res)=>{

    let resultado = await db.mostrarTodos()
    res.json(resultado)
})

router.get('/', async(req,res)=>{
    axios({
        method: 'get',
        url: 'http://localhost:2001/consultar',
    })
        .then(function (response) {
            res.render('index.html',{alumnos: response.data})
        });
})

router.post('/insertar',async(req,res)=>{
    let alumno = {
       matricula: req.body.matricula,
       nombre: req.body.nombre,
       domicilio: req.body.domicilio,
       sexo: req.body.sexo,
       especialidad: req.body.especialidad
    }
    await db.insertar(alumno);
    let alumnos = await db.mostrarTodos();
    res.redirect('/'),alumnos })

module.exports = router