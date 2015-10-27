// -------------------------------------------------------------------------------------------
// API REST para GAMESBOOK
var express = require('express');
var app = express();
var models = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var usuarios = require('./routes/usuario');
app.use('/usuarios', usuarios);

app.get('/', function(pet, res){
  res.status(200);
  res.send("<h1>Bienvenido a GAMESBOOK</h1>");
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

module.exports = app;
