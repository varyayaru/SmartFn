const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const tokensRouter = require('./routes/tokensRouter');
const userRouter = require('./routes/userRouter');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use('/api/students', verifyAccessToken, studentRouter);
// app.use('/api/groups', verifyAccessToken, groupRouter);
app.use('/api/auth', userRouter);
app.use('/api/tokens', tokensRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
