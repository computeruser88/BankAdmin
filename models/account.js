module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
      name: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['checking', 'savings']]
        }
      }
    });
    Account.associate = function(models) {
      Account.hasMany(models.Transaction, {
        onDelete: "cascade"
      });
    };
    Account.associate = function (models) {
        Account.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
              }
        });
    };

  
    return Account;
  };
  