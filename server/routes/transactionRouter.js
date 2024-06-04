const transactionRouter = require('express').Router();
const { Transaction, Category, User } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

transactionRouter.get('/income', verifyAccessToken, async (req, res) => {
  const data = await Transaction.findAll({
    where: { bool: true, userId: res.locals.user.id },
    unclude: [{ model: Category }, { model: User }],
  });
  res.status(200).json(data);
});
transactionRouter.get('/expend', verifyAccessToken, async (req, res) => {
  const data = await Transaction.findAll({
    where: { bool: false, userId: res.locals.user.id },
    unclude: [{ model: Category }, { model: User }],
  });
  res.status(200).json(data);
});
transactionRouter.post('/income', verifyAccessToken, async (req, res) => {
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

transactionRouter.post('/expend', verifyAccessToken, async (req, res) => {
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
