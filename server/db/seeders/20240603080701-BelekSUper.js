const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { addDays, subMonths, startOfMonth, endOfMonth } = require('date-fns');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert the initial user
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

    // Insert categories
    const categories = [
      { name: 'Проезд', emoji: '🚂', userId: 1 },
      { name: 'Wildberries', emoji: '🍇', userId: 1 },
      { name: 'Кофе', emoji: '☕', userId: 1 },
      { name: 'Еда', emoji: '🍔', userId: 1 },
      { name: 'Успокоительное', emoji: '💊', userId: 1 },
      { name: 'Развлечения', emoji: '🍺', userId: 1 },
      { name: 'КрошкаКартошка', emoji: '🥔', userId: 1 },
      { name: 'Прочее', emoji: '📦', userId: 1 },
      { name: 'Образование', emoji: '📚', userId: 1 },
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

    // Insert goals
    await queryInterface.bulkInsert('Goals', [
      {
        name: 'iPad',
        sum: 50000,
        catId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'MacBook',
        sum: 112000,
        catId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Helper function to generate transactions
    const generateTransactions = (
      startDate,
      endDate,
      dailyExpenses,
      monthlyIncome,
      monthlyExpense,
      specialTransactions = [],
      expenseCategories = [3, 5, 7], // Default expense categories
    ) => {
      const transactions = [];
      let currentDate = startDate;

      while (currentDate <= endDate) {
        // Generate daily expenses
        for (let i = 0; i < dailyExpenses.length; i++) {
          transactions.push({
            sum: dailyExpenses[i],
            bool: false,
            catId: expenseCategories[Math.floor(Math.random() * expenseCategories.length)], // Random category from the specified list
            userId: 1,
            createdAt: currentDate,
            updatedAt: currentDate,
          });
        }

        // Generate monthly income
        if (currentDate.getDate() === 1) {
          transactions.push({
            sum: monthlyIncome,
            bool: true,
            catId: null,
            userId: 1,
            createdAt: currentDate,
            updatedAt: currentDate,
          });
        }

        currentDate = addDays(currentDate, 1);
      }

      // Add monthly expense
      transactions.push({
        sum: monthlyExpense,
        bool: false,
        catId: expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
        userId: 1,
        createdAt: startOfMonth(currentDate),
        updatedAt: startOfMonth(currentDate),
      });

      // Add special transactions
      transactions.push(...specialTransactions);

      return transactions;
    };

    const now = new Date();
    const startDate = subMonths(now, 6);
    const endDate = now;

    // Transactions for January
    const januaryDate = startOfMonth(subMonths(endDate, 5));
    const transactionsJanuary = generateTransactions(
      januaryDate,
      endOfMonth(januaryDate),
      Array(10)
        .fill()
        .map(() => Math.floor(Math.random() * 1000) + 100), // 10 random expenses between 100 and 1100
      130000, // Income 130k
      110000, // Expense 110k
    );

    // Transactions for February
    const februaryDate = startOfMonth(subMonths(endDate, 4));
    const transactionsFebruary = generateTransactions(
      februaryDate,
      endOfMonth(februaryDate),
      Array(10)
        .fill()
        .map(() => Math.floor(Math.random() * 1000) + 100), // 10 random expenses between 100 and 1100
      120000, // Income 120k
      90000, // Expense 90k
    );

    // Transactions for March
    const marchDate = startOfMonth(subMonths(endDate, 3));
    const transactionsMarch = generateTransactions(
      marchDate,
      endOfMonth(marchDate),
      Array(10)
        .fill()
        .map(() => Math.floor(Math.random() * 1000) + 100), // 10 random expenses between 100 and 1100
      150000, // Income 150k
      90000, // Regular Expense 90k
      [
        {
          sum: 330000,
          bool: false,
          catId: categories.find((category) => category.name === 'Образование').id,
          userId: 1,
          createdAt: marchDate,
          updatedAt: marchDate,
        },
      ],
    );

    // Transactions for April
    const aprilDate = startOfMonth(subMonths(endDate, 2));
    const transactionsApril = generateTransactions(
      aprilDate,
      endOfMonth(aprilDate),
      Array(10)
        .fill()
        .map(() => Math.floor(Math.random() * 1000) + 100), // 10 random expenses between 100 and 1100
      1000, // Income 1k
      Math.floor(Math.random() * 20000) + 50000, // Expense between 50k to 70k
      [],
      [3, 5, 7], // Categories: Кофе, Успокоительное, КрошкаКартошка
    );

    // Transactions for May
    const mayDate = startOfMonth(subMonths(endDate, 1));
    const transactionsMay = generateTransactions(
      mayDate,
      endOfMonth(mayDate),
      Array(10)
        .fill()
        .map(() => Math.floor(Math.random() * 1000) + 100), // 10 random expenses between 100 and 1100
      1000, // Income 1k
      Math.floor(Math.random() * 20000) + 50000, // Expense between 50k to 70k
      [],
      [3, 5, 7], // Categories: Кофе, Успокоительное, КрошкаКартошка
    );

    // Transactions for June
    const juneDate = startOfMonth(endDate);
    const transactionsJune = generateTransactions(
      juneDate,
      endDate,
      Array(10)
        .fill()
        .map(() => Math.floor(Math.random() * 1000) + 100), // 10 random expenses between 100 and 1100
      1000, // Income 1k
      Math.floor(Math.random() * 20000) + 50000, // Expense between 50k to 70k
      [],
      [3, 5, 7], // Categories: Кофе, Успокоительное, КрошкаКартошка
    );

    // Combine all transactions
    const allTransactions = [
      ...transactionsJanuary,
      ...transactionsFebruary,
      ...transactionsMarch,
      ...transactionsApril,
      ...transactionsMay,
      ...transactionsJune,
    ];

    await queryInterface.bulkInsert('Transactions', allTransactions, {});
  },

  async down(queryInterface, Sequelize) {
    // Add commands to revert seed here
    await queryInterface.bulkDelete('Goals', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Transactions', null, {});
  },
};
