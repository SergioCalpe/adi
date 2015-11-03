var models = require('../models');
var express = require('express');
var router = express.Router();




// Obtener listado de Usuarios de la BBDD
router.get('/', function(pet, res){
  models.Videojuego.findAll().then(function(results){
    res.status(200);
    res.send(results);
  });
});

module.exports = router;
