const transGoalRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const { TransGoal, Transaction, Goal } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

transGoalRouter.post('/', verifyAccessToken, async (req, res) => {
  const { sum, id } = req.body;

  try {
    const data = await Transaction.create({
      sum,
      bool: null,
      catId: 1,
      userId: res.locals.user.id,
    });
    console.log(`!!!!!!!!!!!!!!!!!!!!${data}`);
    await TransGoal.create({
      goalId: id,
      transId: data.id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka Transaction router', error });
  }
});

module.exports = transGoalRouter;
