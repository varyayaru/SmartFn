const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: 'admin',
          email: 'admin@admin',
          password: bcrypt.hashSync('admin', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    const categories = [
      { name: 'Цель', emoji: '🎯', userId: 1 },
      { name: 'Покупки', emoji: '🛒', userId: 1 },
      { name: 'Развлечения', emoji: '🎉', userId: 1 },
      { name: 'Еда', emoji: '🍔', userId: 1 },
      { name: 'Путешествия', emoji: '✈️', userId: 1 },
      { name: 'Спорт', emoji: '🏋️‍♂️', userId: 1 },
      { name: 'Здоровье', emoji: '💊', userId: 1 },
      { name: 'Образование', emoji: '📚', userId: 1 },
      { name: 'Транспорт', emoji: '🚗', userId: 1 },
      { name: 'Прочее', emoji: '📦', userId: 1 },
    ];
    await queryInterface.bulkInsert(
      'Categories',
      categories.map((category) => ({
        ...category,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {},
    );

    await queryInterface.bulkInsert(
      'Goals',
      [
        {
          name: 'Копим на машину',
          sum: 2000,
          catId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'iPhone',
          sum: 20003,
          catId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'iPad',
          sum: 20002,
          catId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'iMac',
          sum: 112000,
          catId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    const transactions = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);

      for (let j = 0; j < 10; j++) {
        transactions.push({
          sum: Math.floor(Math.random() * 10000),
          bool: true,
          catId: Math.floor(Math.random() * 9) + 2,
          userId: 1,
          createdAt: new Date(date.getFullYear(), date.getMonth(), j + 1),
          updatedAt: new Date(),
        });

        transactions.push({
          sum: Math.floor(Math.random() * 10000),
          bool: false,
          catId: Math.floor(Math.random() * 9) + 2,
          userId: 1,
          createdAt: new Date(date.getFullYear(), date.getMonth(), j + 11),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Transactions', transactions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
