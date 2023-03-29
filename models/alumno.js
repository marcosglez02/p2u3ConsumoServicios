const json = require("express/lib/response");
const resolve = require("path/posix");
const promise = require("../models/conexion.js");
const conexion = require("../models/conexion.js");

let AlumnoDb = {};

AlumnoDb.insertar = function insertar(alumno){
    return new Promise((resolver,reject)=>{
        let sqlConsulta = "insert into alumnos set ?;"
        conexion.query(sqlConsulta,alumno,function(err,res){
            if(err){
                reject(err.message)
            }else{
                resolver({
                    id: res.insertId,
                    matricula: alumno.matricula,
                    nombre: alumno.nombre,
                    domicilio: alumno.domicilio,
                    sexo: alumno.sexo,
                    especialidad: alumno.especialidad
                })
            }
        })
    })
}
// Mostrar todos
AlumnoDb.mostrarTodos = function mostrarTodos(){
    alumno = {}
    return new Promise((resolver,reject)=>{
        let sqlConsulta ="select * from alumnos;";
        conexion.query(sqlConsulta,null,function(err,res){
            if(err){
                reject(err.message)
            }else{
                alumno = res;
                resolver(alumno)
            }
        })
    })
}

// Buscar por matricula
AlumnoDb.buscarMatricula = function buscarMatricula(matricula){
    alumno = {}
    return new Promise((resolver,reject)=>{
        let sqlConsulta ="select * from alumnos where matricula = ?;";
        conexion.query(sqlConsulta,[matricula],function(err,res){
            if(err){
                reject(err.message)
            }else{
                alumno = res;
                resolver(alumno)
            }
        })
    })
}

// Borrar por matricula
AlumnoDb.borrarMatricula = function borrarMatricula(matricula){
    return new Promise((resolver,reject)=>{
        alumno = {}
        let sqlConsulta ="delete from alumnos where matricula = ?;";
        conexion.query(sqlConsulta,[matricula],function(err,res){
            if(err){
                reject(err.message)
            }else{
                resolver(res.affectedRows)
                //console.log(res.affectedRows)
            }
        })
    })
}
// Actualizar alumno
AlumnoDb.actualizar = function actualizar(alumno){
    return new Promise((resolver,reject)=>{ 
        let sqlConsulta ="update alumnos set ? where ?";
        conexion.query(sqlConsulta,alumno,function(err,res){
            if(err){
                reject(err.message)
            }else{
                resolver(res.changedRows)
            }
        })
    })
}
module.exports = AlumnoDb;