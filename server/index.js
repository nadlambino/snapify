require('./bootstrap.js');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const parser = require('body-parser');
const path = require('path');

const userRouter = require('./routes/user.route.js');
const authRouter = require('./routes/auth.route.js');
const postRouter = require('./routes/post.route.js');

app.use(cors());
app.use(express.json());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.json('Welcome to Feed API'));
app.use('/', authRouter);
app.use('/post', postRouter);
app.use('/users', userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started. Listening at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to connect to the database.`);
    console.log(`Error: `, error);
  });
