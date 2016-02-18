// ---------------------------------------------------------------------------------------------
var models = require('./models');
// Sincronización con la BBDD
models.sequelize.sync({force:true}).then(function(){
  return models.Usuario.create({login:'SergioCalpe', password:'1234', nombre: 'Sergio', apellidos:'Jimenez Femenia', email:'sergiojimenezfemenia90@gmail.com', imagen: 'http://noticias.coches.com/wp-content/uploads/2014/07/ford_mustang-hero-custom-2013_r7.jpg'})
}).then(function(usuario){
  return models.Videojuego.bulkCreate([
    {nombre:'Battlefield3', fecha_des:'2015-12-01T23:00:00.000Z', categoria:'PS4', UsuarioId:usuario.id, descripcion:'Battlefield 4 (comúnmente abreviado como BF4) fue desarrollado por la compañía EA Digital Illusions CE (DICE) y distribuido por Electronic Arts (EA) para Microsoft Windows, Xbox 360, Xbox One, PlayStation 3 y PlayStation 4. Es la decimotercera entrega de la serie Battlefield y el sucesor del aclamado juego de 2011, Battlefield 3. Fue lanzado oficialmente el 31 de octubre de 2013.1', imagen:'https://eaassets-a.akamaihd.net/origin-com-store-final-assets-prod/76889/231.0x326.0/1007077_LB_231x326_en_US_%5E_2014-08-26-14-16-37_dc204da02063323b31b517ee74425c49b2e2a4ae.png'},
    {nombre:'FIFA16',  fecha_des:'2015-12-01T23:00:00.000Z',categoria:'XBOX ONE',UsuarioId:usuario.id, imagen: 'http://edgecast.buscafs.com/www.levelup.com/public/uploads/images/359814_832x1127.jpg'},
    {nombre:'Battlefront', fecha_des:'2015-12-01T23:00:00.000Z',categoria:'PS4', UsuarioId:usuario.id, imagen: 'http://static1.gamespot.com/uploads/scale_medium/1197/11970954/2848833-2848826-star%2Bwars%2Bbattlefront%2Bkey%2Bart.jpg'},
    {nombre:'Uncharted4', fecha_des:'2015-12-01T23:00:00.000Z',categoria:'PS4', UsuarioId:usuario.id},
    {nombre:'FIFA17', fecha_des:'2015-12-01T23:00:00.000Z',categoria:'PS5', UsuarioId:usuario.id},
    {nombre:'PES16',  fecha_des:'2015-12-01T23:00:00.000Z',categoria:'WII', UsuarioId:usuario.id},
    {nombre:'Ponys Y otras mierdas',  fecha_des:'2015-12-01T23:00:00.000Z',categoria:'XBOX TWO', UsuarioId:usuario.id},
    {nombre:'GTAV',  fecha_des:'2015-12-01T23:00:00.000Z',categoria:'PSP', UsuarioId:usuario.id},
    {nombre:'GTAX',  fecha_des:'2015-12-01T23:00:00.000Z',categoria:'PS4', UsuarioId:usuario.id}
  ]);
}).then(function(){
  app.listen(3000, function(){
    console.log('Servidor abierto.\nEscuchando puerto 3000 . . .');
  })
});

// -------------------------------------------------------------------------------------------
// API REST para GAMESBOOK
var express = require('express');
var app = express();

// Permitir XMLHttpRequest  
var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');

app.use(bodyParser.json());

var session = require('./routes/session');
app.use('/', session);
  
var usuario = require('./routes/usuario');
app.use('/usuarios', usuario);

var videojuegos = require('./routes/videojuego');
app.use('/videojuegos', videojuegos);
