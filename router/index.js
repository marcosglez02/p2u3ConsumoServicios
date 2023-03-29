const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");

router.get('/', (req,res)=>{
res.render('index.html')
})

module.exports = router