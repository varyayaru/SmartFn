const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokensRouter = require('./routes/tokensRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const goalRouter = require('./routes/goalRouter');
const transactionRouter = require('./routes/transactionRouter');
const transGoalRouter = require('./routes/transgoal');
const aiRouter = require('./routes/aiRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api/auth', userRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/category', categoryRouter);
app.use('/api/goal', goalRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/transgoal', transGoalRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
