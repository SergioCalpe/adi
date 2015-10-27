var models = require('../models');
var express = require('express');
var router = express.Router();




// Obtener listado de Usuarios de la BBDD
router.get('/', function(pet, res){
  models.Usuario.findAll().then(function(results){
    res.status(200);
    res.send(results);
  });
});

// Obtener usuario por su id
router.get('/:id', function(pet, res) {
  models.Usuario.findById(pet.params.id).then(function(results) {
    if(results == null) {
      res.status(404);
      res.send('Error el resurso no existe');
      res.end();
    } else {
      res.status(200);
      res.send(results);
    }
  })
});

// Crear un nuevo usuario
router.post('/', function(pet, res){
  var objeto = pet.body;
  models.Usuario.find({
    where: {login: objeto.login}
  }).then(function(u){
      if(u == null) {
        return models.Usuario.create({
          login: objeto.login,
          nombre: objeto.nombre,
          apellidos: objeto.apellidos,
          email: objeto.email,
          fecha_nac: objeto.fecha_nac
        }).then(
          function(u){
            res.status(201);
            res.location('https://localhost:3000/usuarios/' + u.id)
            res.send("El usuario se ha creado correctamente");
          });
      }else {
        res.status(400);
        res.send("Ya existe ese login en la BBDD");
      }
    });
});

// Actualizar usuario a partr de us id
router.put('/:id', function(pet, res) {
  var objeto = pet.body;
  models.Usuario.update(
   {
      login: objeto.login,
      nombre: objeto.nombre,
      apellidos: objeto.apellidos,
      email: objeto.email,
      fecha_nac: objeto.fecha_nac
   },
   {
      where: { id : pet.params.id }
   }).then(function(u){
    if(u[0]){
      res.status(204); // Recurso actualizado correctamente
      res.end();
    } else {
      res.status(404);
      res.send("No existe ese login en la BBDD");
    }
  })
});

// Eliminar un elemento
router.delete('/:id', function(pet, res) {
  models.Usuario.destroy({
    where: {
      id: pet.params.id
    }
  }).then(function(results) {
    if(results) {
      console.log(results);
      res.status(204);
      res.end();
    } else {
      res.status(404);
      res.send("No existe ese login en la BBDD");
    }
  });
});

// Obtener los videojuegos de un usuario
router.get('/:id/videojuegos', function(pet, res){
  models.Usuario.findById(pet.params.id).then(function(u){
    return u.getVideojuegos();
  }).then(function(results){
    res.status(200);
    res.send(results)
  });
});

module.exports = router;
