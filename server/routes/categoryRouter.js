const categoryRouter = require('express').Router();
const { startOfMonth, endOfMonth } = require('date-fns');
const { Op } = require('sequelize');
const { Category, Transaction } = require('../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

categoryRouter.post('/trans', verifyAccessToken, async (req, res) => {
  try {
    const { year, month } = req.body;

    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month are required' });
    }

    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    const data = await Category.findAll({
      where: { userId: res.locals.user.id },
      include: [
        {
          model: Transaction({
            where: {
              createdAt: {
                [Op.between]: [startDate, endDate],
              },
            },
          }),
        },
      ],
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka category router' });
  }
});
categoryRouter.post('/', verifyAccessToken, async (req, res) => {
  const { name, emoji } = req.body;
  try {
    const data = await Category.create({ name, emoji, userId: res.locals.user.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka category router' });
  }
});
categoryRouter.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka category router' });
  }
});

categoryRouter.get('/', verifyAccessToken, async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});

categoryRouter.put('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    await Category.update(req.body, { where: { id } });
    const data = await Category.findByPk(id);
    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Oshibka category router' });
  }
});

module.exports = categoryRouter;
