const cors = require('cors');
const morgan = require('morgan');
const express = require('express')
const cookieParser = require('cookie-parser');
const tokensRouter = require('./routes/tokensRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const goalRouter = require('./routes/goalRouter');
const transactionRouter = require('./routes/transactionRouter');
const transGoalRouter = require('./routes/transgoal');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/auth', userRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/category', categoryRouter);
app.use('/api/goal', goalRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/transgoal', transGoalRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
