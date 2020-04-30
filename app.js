const express = require('express');
const morgan = require('morgan');
const app = express();
const html = require("html-template-tag");
const models = require('./models');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

const PORT = 1337;

const initSync = async () => {
  await models.db.sync();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`)
  })
}

initSync();

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

app.listen(3000);

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})
