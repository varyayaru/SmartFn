const transactionRouter = require('express').Router();
const { Op } = require('sequelize');
const { startOfMonth, endOfMonth, subMonths, format } = require('date-fns');
const { Transaction, Category, TransGoals } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

transactionRouter.post('/income', verifyAccessToken, async (req, res) => {
  try {
    const { year, month } = req.body;

    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month are required' });
    }

    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));
    const data = await Transaction.findAll({
      where: {
        bool: true,
        userId: res.locals.user.id,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

transactionRouter.post('/expend', verifyAccessToken, async (req, res) => {
  try {
    const { year, month } = req.body;

    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month are required' });
    }

    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    const data = await Transaction.findAll({
      where: {
        bool: false,
        userId: res.locals.user.id,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [{ model: Category }],
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

transactionRouter.post('/createincome', verifyAccessToken, async (req, res) => {
  const { sum } = req.body;
  try {
    const data = await Transaction.create({
      sum,
      bool: true,
      catId: null,
      userId: res.locals.user.id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka Transaction router' });
  }
});

transactionRouter.post('/createexpend', verifyAccessToken, async (req, res) => {
  const { sum, catId } = req.body;
  try {
    const data = await Transaction.create({
      sum,
      bool: false,
      catId,
      userId: res.locals.user.id,
    });
    const dataWithCat = await Transaction.findOne({
      where: { id: data.id },
      include: Category,
    });
    res.json(dataWithCat);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka Transaction router' });
  }
});
transactionRouter.delete('/income/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    await Transaction.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka category router', error: error.message });
  }
});

transactionRouter.post('/income/barchart', verifyAccessToken, async (req, res) => {
  try {
    const now = new Date();
    const halfAYearAgo = new Date(now.setMonth(now.getMonth() - 6));
    const startDate = startOfMonth(halfAYearAgo);
    const endDate = endOfMonth(now);

    const transactions = await Transaction.findAll({
      where: {
        bool: true,
        userId: res.locals.user.id,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const incomeByMonth = transactions.reduce((acc, transaction) => {
      const monthName = new Date(transaction.createdAt).toLocaleString('ru-RU', { month: 'long' });
      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      acc[monthName] += transaction.sum;
      return acc;
    }, {});

    const result = Object.entries(incomeByMonth).map(([month, income]) => ({ month, income }));

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

transactionRouter.post('/income/summary', verifyAccessToken, async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 6);
    const startDate = startOfMonth(sixMonthsAgo);
    const endDate = endOfMonth(now);

    const transactions = await Transaction.findAll({
      where: {
        bool: true,
        userId: res.locals.user.id,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const incomeByMonth = transactions.reduce((acc, transaction) => {
      const month = format(new Date(transaction.createdAt), 'yyyy-MM');
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += transaction.sum;
      return acc;
    }, {});

    const sortedMonths = Object.keys(incomeByMonth).sort();
    const result = sortedMonths.map((month) => incomeByMonth[month]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});

transactionRouter.post('/exp/summary', verifyAccessToken, async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = subMonths(now, 6);
    const startDate = startOfMonth(sixMonthsAgo);
    const endDate = endOfMonth(now);

    const transactions = await Transaction.findAll({
      where: {
        bool: false,
        userId: res.locals.user.id,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const incomeByMonth = transactions.reduce((acc, transaction) => {
      const month = format(new Date(transaction.createdAt), 'yyyy-MM');
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += transaction.sum;
      return acc;
    }, {});

    const sortedMonths = Object.keys(incomeByMonth).sort();
    const result = sortedMonths.map((month) => incomeByMonth[month]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
});
module.exports = transactionRouter;
