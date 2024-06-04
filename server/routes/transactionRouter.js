const transactionRouter = require('express').Router();
const { Op } = require('sequelize');
const { startOfMonth, endOfMonth } = require('date-fns');
const { Transaction, Category, User } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

transactionRouter.post('/income', verifyAccessToken, async (req, res) => {
  try {
    const { year, month } = req.body;

    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month are required' });
    }

    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));
    // проверка что это дата
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
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka Transaction router' });
  }
});
transactionRouter.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka category router' });
  }
});

module.exports = transactionRouter;
