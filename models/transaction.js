module.exports = function (sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
        type: DataTypes.STRING, // can be deposit or withdrawal
        amount: DataTypes.DECIMAL, 
        description: DataTypes.TEXT
    });

    Transaction.associate = function (models) {
        Transaction.belongsTo(models.Account, {
            foreignKey: {
                allowNull: false
              }
        });
    };

    return Transaction;
};
