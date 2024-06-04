const goalRouter = require('express').Router();
const { Goal, TransGoal, Transaction } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

goalRouter.get('/', verifyAccessToken, async (req, res) => {
  try {
    const data = await Goal.findAll({
      where: { userId: res.locals.user.id },
      include: [{ model: TransGoal, include: Transaction }],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'OIIIibka GOAL router' });
  }
}); // goal.Transgoal.reduce((acc,el) => acc+ el.sum ,0)

goalRouter.post('/', verifyAccessToken, async (req, res) => {
  const { name, sum } = req.body;
  try {
    const data = await Goal.create({
      name,
      sum,
      catId: 1,
      userId: res.locals.user.id,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka GOAL router' });
  }
});
goalRouter.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Goal.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka GOAL router' });
  }
});

goalRouter.put('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Goal.update(req.body, { where: { id } });
    const data = await Goal.findByPk(id);
    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka GOAL router' });
  }
});
module.exports = goalRouter;
