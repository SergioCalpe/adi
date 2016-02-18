var models = require('../models');
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');



// Obtener listado de Usuarios de la BBDD
router.get('/', function(pet, res){
  models.Usuario.findAll().then(function(results){
    res.status(200);
    res.send(results);
  });
});

// Obtener usuario por su id
router.get('/:id', function(pet, res) {
  var token = pet.query.token || pet.headers['x-access-token'];
  models.Usuario.findById(pet.params.id).then(function(Datos) {
    if(Datos == null) {
      res.status(404);
      res.send('Error el resurso no existe');
      res.end();
    } else {
      res.status(200);
      res.json({
        Datos,
        'Operaciones' : {
          crear_juego:  'http://localhost:3000/usuarios/'+pet.params.id+'/videojuegos'+'?token='+token,
          modificar:    'http://localhost:3000/usuarios/'+pet.params.id+'?token='+token,
          delete:       'http://localhost:3000/usuarios/'+pet.params.id+'?token='+token
        }
      });
      res.end();
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
          password: objeto.password,
          nombre: objeto.nombre,
          apellidos: objeto.apellidos,
          email: objeto.email,
          fecha_nac: objeto.fecha_nac,
          imagen: objeto.imagen
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
      password: objeto.password,
      nombre: objeto.nombre,
      apellidos: objeto.apellidos,
      email: objeto.email,
      fecha_nac: objeto.fecha_nac,
      imagen: objeto.imagen
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

// Obtener Videojuego por su id
router.get('/:id/videojuegos/:id_videojuego', function(pet, res) {
  var token = pet.query.token || pet.headers['x-access-token'];
  models.Videojuego.findById(pet.params.id_videojuego).then(function(Datos) {
    if(Datos == null) {
      res.status(404);
      res.send('Error el resurso no existe');
      res.end();
    } else {
      res.status(200);
      res.json({
        Datos,
        'Operaciones' : {
          modificar:  'http://localhost:3000/usuarios/'+pet.params.id+'/videojuegos/'+pet.params.id_videojuego+'?token='+token,
          delete:     'http://localhost:3000/usuarios/'+pet.params.id+'/videojuegos/'+pet.params.id_videojuego+'?token='+token
        }
      });

      res.end();
    }
  })
});
router.get('/:id/videojuegos', function(pet, res){
  var pagina = pet.query.pagina || parseInt("1");
  var token = pet.query.token || pet.headers['x-access-token'];
  models.Usuario.findById(pet.params.id).then(function(u){
    return u.getVideojuegos();
  }).then(function(results){

    res.status(200);
    res.send(results);

  });
});

// Crear un nuevo videojuego por parte de un usuario dado
router.post('/:id/videojuegos', function(pet, res){
  var objeto = pet.body;
  models.Videojuego.find({
    where: {nombre: objeto.nombre}
  }).then(function(u){
      if(u == null) {
        return models.Videojuego.create({
          nombre: objeto.nombre,
          categoria: objeto.categoria,
          descripcion: objeto.descripcion,
          fecha_des: objeto.fecha_des,
          imagen: objeto.imagen,
          UsuarioId: pet.params.id
        }).then(
          function(videojuego){
            res.status(201);
            res.location('https://localhost:3000/usuarios/' +pet.params.id+'/videojuegos/'+videojuego.id)
            res.send("El videojuego se ha creado correctamente");
          });
      }else {
        res.status(400);
        res.send("Ya existe ese login en la BBDD");
      }
    });
});

// Eliminar un elemento
router.delete('/:id/videojuegos/:id_vid', function(pet, res) {
  models.Videojuego.destroy({
    where: {
      id: pet.params.id_vid
    }
  }).then(function(results) {
    if(results) {
      console.log(results);
      res.status(204);
      res.end();
    } else {
      res.status(404);
      res.send("ID incorrecto. No existe ese juego en la BBDD");
    }
  });
});

// Actualizar videojuego a partr de us id
router.put('/:id/videojuegos/:id_vid', function(pet, res) {
  var objeto = pet.body;
  models.Videojuego.update(
   {
     nombre: objeto.nombre,
     categoria: objeto.categoria,
     descripcion: objeto.descripcion,
     fecha_des: objeto.fecha_des,
      imagen: objeto.imagen

   },
   {
      where: { id : pet.params.id_vid }
   }).then(function(u){
    if(u[0]){
      res.status(204); // Recurso actualizado correctamente
      res.end();
    } else {
      res.status(404);
      res.send("No existe ese videojuego en la BBDD");
    }
  })
});

module.exports = router;
