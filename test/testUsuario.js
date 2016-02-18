var supertest = require('supertest');
var should = require('should');

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6IlNlcmdpbyJ9.KseN8XoAM__qsxazBZq0g95gQyN1pbdJmtK1LuiFQTU'
var api = 'localhost:3000';


describe('Test Usuario', function(){
    it('/usuarios return status(200)', function(done){
        //Al objeto supertest le pasamos la app de Express
        supertest(api)
            .get('/usuarios')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .expect(200, done);
    });

    it('/usuarios post crea nuevo usuario', function(done){
        var usuario = {login:'Pepe'}
        supertest(api)
            .post('/usuarios')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .send(usuario)
            .expect(201)
            .expect('El usuario se ha creado correctamente', done);
    });

    it('/usuarios modifico un usuario', function(done){
        var usuario = {nombre:'Modificacion desde TEST'}
        supertest(api)
            .put('/usuarios/2')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .send(usuario)
            .expect(204, done);
    });

    it('/usuarios/login', function(done){
        supertest(api)
            .get('/usuarios/login')
            .set('login', 'Sergio')
            .set('password', '1234')
            .expect('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6IlNlcmdpbyJ9.KseN8XoAM__qsxazBZq0g95gQyN1pbdJmtK1LuiFQTU')
            .expect(200, done);
    });

    it('/usuarios/:id devuelve el usuario correspondiente', function(done){
        supertest(api)
            .get('/usuarios/1')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .expect(200)
            .end(function(err, res){
              res.body.should.have.property('Datos');
              res.body.Datos.login.should.equal('Sergio');
              done();
            });
    });



    it('/usuarios/:id/videojuegos crea un nuevo videojuego return 201', function(done){
      var videojuego = {nombre:'Videojuego TEST'}
        supertest(api)
            .post('/usuarios/1/videojuegos')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .send(videojuego)
            .expect(201)
            .expect('El videojuego se ha creado correctamente', done);
    });

    it('/usuarios/:id/videojuegos/:id_vid devuelve el videojuego correspondiente', function(done){
        supertest(api)
            .get('/usuarios/1/videojuegos/1')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .expect(200)
            .end(function(err, res){
              res.body.should.have.property('Datos');
              res.body.Datos.nombre.should.equal('Battlefield3');
              done();
            });
    });

    it('/usuarios/:id/videojuegos devuelve la coleccion paginada de 1 en 1', function(done){
        supertest(api)
            .get('/usuarios/1/videojuegos')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .expect(200)
            .end(function(err, res){
              res.body.should.have.property('MetaDatos');
              res.body.MetaDatos.totalPaginas.should.equal(8);
              done();
            });
    });

    it('/usuarios/:id/videojuegos modifica videojuego return 204', function(done){
      var videojuego = {nombre:'Videojuego TEST'}
        supertest(api)
            .put('/usuarios/1/videojuegos/1')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .send(videojuego)
            .expect(204, done);
    });

    it('/usuarios/:id/videojuegos elimina un videojuego return 204', function(done){
      var videojuego = {nombre:'Videojuego TEST'}
        supertest(api)
            .delete('/usuarios/1/videojuegos/1')
            .set('x-access-token', token) //Cargamos en la cabecera el token de autentificación Posible Fallo
            .expect(204, done)
    });

});
