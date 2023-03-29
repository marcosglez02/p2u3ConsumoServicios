const mysql = require("mysql2");
let sqlConnection = mysql.createConnection({
    host:"3.17.37.0",
    user:"admin",
    password:"123Marcos!",
    database:"sistema"
});

sqlConnection.connect(function(err){
    if(err){
        console.log("Error al conectar " + err.message)
    }else{
        console.log("Se conectó con éxito")
    }
});

module.exports = sqlConnection;