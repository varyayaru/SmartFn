const transGoalRouter = require('express').Router();
const { TransGoal, Transaction, Goal } = require('../db/models');

transGoalRouter.get('/', async (req, res) => {
  try {
    const data = await TransGoal.findAll({
      include: [
        {
          model: Transaction,
        },
        {
          model: Goal,
        },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ meesage: 'OSHIBKA ROUTER' });
  }
});
module.exports = transGoalRouter;
