var models = require('../models');
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');


// Ruta para Autenticacion
var secretillo = 'Estoy Aprendiendo Mas Este Año Que En 5 De Carrera';

// Funcion para crear un token
function creaToken(usuario) {
  var payload = {
    login: usuario.login,
    id: usuario.id
  }
  return jwt.encode(payload, secretillo);
}

// Crear un nuevo usuario y devolver token
router.post('/signup', function(pet, res){
  var objeto = pet.body;
  
  models.Usuario.find({
    where: {login: objeto.login}
  }).then(function(u){
      if(u == null) {
        return models.Usuario.create({
          login: objeto.login,
          password: objeto.password,
          nombre: objeto.nombre,
          apellidos: objeto.apellidos,
          email: objeto.email,
          fecha_nac: objeto.fecha_nac
        })
        .then(function(u){
          if(u) {
            res.status(201);
            res.location('https://localhost:3000/usuarios/' + u.id)
            res.send({
              idToken: creaToken(u)
            });
          } else {
            res.send("Algo esta fallando en el callback");
          }
        });
      }else {
        res.status(400);
        res.send("Ya existe ese login en la BBDD");
      }
    });
});

// Crear token para un usuario ya registrado
router.post('/login', function(pet, res) {
  var usuarioLogin = pet.headers.login;
  var usuarioPassword = pet.headers.password;

  models.Usuario.find({
    where: {login: usuarioLogin}
  }).then(function(usuario) {
    if(usuario == null){
      res.status(404);
      res.send('Fallo de autenticación. !Usuario no encontrado!');
    } else{
      if(usuario.password != usuarioPassword) {
        res.status(403);
        res.send('Fallo de autenticación. !Contraseña incorrecta!');
      } else {
        res.status(201);
        res.send({
          idToken: creaToken(usuario)
        });
      }
    }
  });
});
module.exports = router;