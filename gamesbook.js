

// -------------------------------------------------------------------------------------------
// API REST para GAMESBOOK
var express = require('express');
var app = express();
var models = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(pet, res){
  res.status(200);
  res.send("<h1>Bienvenido a GAMESBOOK</h1>");
});

// Obtener listado de Usuarios de la BBDD
app.get('/api/usuarios', function(pet, res){
  models.Usuario.findAll().then(function(results){
    res.status(200);
    res.send(results);
  });
});

// Obtener usuario por su id
app.get('/api/usuarios/:id', function(pet, res) {
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
app.post('/api/usuarios', function(pet, res){
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
            res.location('https://localhost:3000/api/usuarios/' + u.id)
            res.send("El usuario se ha creado correctamente");
          });
      }else {
        res.status(400);
        res.send("Ya existe ese login en la BBDD");
      }
    });
});

// Actualizar usuario a partr de us id
app.put('/api/usuarios/:id', function(pet, res) {
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
app.delete('/api/usuarios/:id', function(pet, res) {
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
app.get('/api/usuarios/:id/videojuegos', function(pet, res){
  models.Usuario.findById(pet.params.id).then(function(u){
    return u.getVideojuegos();
  }).then(function(results){
    res.status(200);
    res.send(results)
  });
});

// ---------------------------------------------------------------------------------------------
// Sincronización con la BBDD
models.sequelize.sync({force:true}).then(function(){
  return models.Usuario.create({login:'Sergio'})
}).then(function(usuario){
  return models.Videojuego.bulkCreate([
    {nombre:'Battlefield3', UsuarioId:usuario.id},
    {nombre:'FIFA16', UsuarioId:usuario.id}
  ]);
}).then(function(){
  app.listen(3000, function(){
    console.log('Servidor abierto.\nEscuchando puerto 3000 . . .');
  })
});




