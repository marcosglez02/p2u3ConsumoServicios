const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");
const db = require("../models/alumno.js")
const axios = require("axios")
const popup = require("popups")

let alumno = {
    matricula: "",
    nombre: "",
    domicilio: "",
    sexo: "",
    especialidad: ""
}

router.get('/consultar', async (req, res) => {
    let resultado = await db.mostrarTodos()
    res.json(resultado)
})

router.get('/consultarMatricula', async (req, res) => {
    let matricula = req.query.matricula
    console.log(matricula)
    let resultado = await db.buscarMatricula(matricula)
    console.log(resultado)
    res.render('index.html',{alumnos:resultado})
})

router.get('/borrar', async (req, res) => {
    let matricula = req.query.matricula
    await db.borrarMatricula(matricula)
    res.redirect('/')
})

router.get('/insertar', async (req, res) => {
    let matricula = req.query.matricula
    let [rows] = await db.buscarMatricula(matricula)
    if(rows){
        res.redirect('/')
    }else{

    
    alumno = {
        matricula: req.query.matricula,
        nombre: req.query.nombre,
        domicilio: req.query.domicilio,
        sexo: req.query.sexo,
        especialidad: req.query.especialidad
    }

    await db.insertar(alumno)
    res.redirect('/')
    }
})

router.get('/actualizar', async (req, res) => {
    let matricula = req.query.matricula
    alumno = {
        nombre: req.query.nombre,
        domicilio: req.query.domicilio,
        sexo: req.query.sexo,
        especialidad: req.query.especialidad
    }

    await db.actualizar(alumno,matricula)
    res.redirect('/')
})

router.get('/', async (req, res) => {
    axios({
        method: 'get',
        url: 'http://localhost:2001/consultar',
    })
        .then(function (response) {
            res.render('index.html', { alumnos: response.data })
        });
})

router.post('/insertar', async (req, res) => {

    axios({
        method: 'post',
        url: 'http://localhost:2001/insertar'
    })
        .then(function (response) {
            res.redirect('/')
        });
})

router.post('/actualizar', async (req, res) => {

    axios({
        method: 'post',
        url: 'http://localhost:2001/actualizar'
    })
        .then(function (response) {
            res.redirect('/')
        });
})
router.post('/borrar', async (req, res) => {

    axios({
        method: 'post',
        url: 'http://localhost:2001/borrar'
    })
        .then(function (response) {
            res.redirect('/')
        });
})

router.post('/mostrarMatricula', async (req, res) => {

    axios({
        method: 'post',
        url: 'http://localhost:2001/mostrarMatricula'
    })
        .then(function (response) {
            res.redirect('/')
        });
})
module.exports = router