"use strict";

module.exports = function(sequelize, DataTypes) {
	  var Videojuego = sequelize.define('Videojuego', {
	  	nombre: DataTypes.STRING,
	  	genero: DataTypes.STRING,
	  	descripcion: DataTypes.TEXT,
	  	fecha_des: DataTypes.DATEONLY
	}, {
      classMethods: {
        associate: function(models) {
          Videojuego.belongsTo(models.Usuario, {
						foreignKey: {
							allowNull: false
						}
					});
        }
      }
    });
  return Videojuego;
};
