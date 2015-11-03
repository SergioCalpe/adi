"use strict";
// Defenimos la tabla Usuario
module.exports = function(sequelize, DataTypes) {
  var Usuario = sequelize.define('Usuario', {
      login: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fecha_nac: DataTypes.DATEONLY
    },  {
      classMethods: {
        associate: function(models) {
          Usuario.hasMany(models.Videojuego); // Dado un Usuario poder obtener todos los juegos que ha añadido.
        }
      }
    });
  return Usuario;
};
