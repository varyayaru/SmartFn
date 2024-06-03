const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {

    static associate({ Category, User, TransGoal }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Category, { foreignKey: 'catId' });
      this.hasMany(TransGoal, { foreignKey: 'transId' });

      // define association here
    }
  }
  Transaction.init(
    {
      sum: DataTypes.INTEGER,
      bool: DataTypes.BOOLEAN,
      catId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transaction',
    },
  );
  return Transaction;
};
