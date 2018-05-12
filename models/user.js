module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      address: DataTypes.TEXT
    });
  
    User.associate = function(models) {
        User.hasMany(models.Account, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  