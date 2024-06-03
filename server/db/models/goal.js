const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    static associate({ Category, User, TransGoal }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Category, { foreignKey: 'catId' });
      this.hasMany(TransGoal, { foreignKey: 'goalId' });
    }
  }
  Goal.init(
    {
      name: DataTypes.STRING,
      sum: DataTypes.INTEGER,
      catId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Goal',
    },
  );
  return Goal;
};
