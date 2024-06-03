const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Goal, Transaction }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Goal, { foreignKey: 'catId' });
      this.hasMany(Transaction, { foreignKey: 'catId' });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      emoji: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
