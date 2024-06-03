const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransGoal extends Model {
    static associate({ Transaction, Goal }) {
      this.belongsTo(Transaction, { foreignKey: 'transId' });
      this.belongsTo(Goal, { foreignKey: 'goalId' });
    }
  }
  TransGoal.init(
    {
      transId: DataTypes.INTEGER,
      goalId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TransGoal',
    },
  );
  return TransGoal;
};
