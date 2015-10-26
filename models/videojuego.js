"use strict";

module.exports = function(sequelize, DataTypes) {
	  var Videojuego = sequelize.define('Videojuego', {
	  nombre: DataTypes.STRING,
	  genero: DataTypes.STRING,
	  descripcion: DataTypes.TEXT,
	  fecha_des: DataTypes.DATEONLY
	}, {
	  name: {singular: 'Videojuego', plural: 'Videojuegos'}
	}, {
      classMethods: {
        associate: function(models) {
          Videojuego.belongsTo(Usuario, {
			  constraints: false  
			});
        } 
      }
    });
  return Videojuego;
};
