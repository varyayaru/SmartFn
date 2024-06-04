const { Op, fn, col, literal } = require('sequelize');
const { Transaction } = require('./db/models');

export default function getIncomesBarChart() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  Transaction.findAll({
    attributes: [
      [fn('date_trunc', 'month', col('createdAt')), 'month'],
      [fn('COUNT', '*'), 'count'],
    ],
    where: {
      createdAt: {
        [Op.gte]: sixMonthsAgo,
      },
    },
    group: [literal('1')],
  })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
}
