const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const xlsx = require("xlsx");
const workbook = xlsx.readFile("./data/data.xlsx");

const {
  passport
} = require('./auth');

const app = express();
app.enable('trust proxy'); // https://expressjs.com/en/guide/behind-proxies.html
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(helmet());
app.use(passport.initialize());


app.get('/', passport.authenticate('basic', {
  session: false
}), (req, res) => {
  res.json({
    status: 'OK',
    data: xlsx.utils.sheet_to_json(workbook.Sheets["Sheet1"])
  })
});


app.listen(8081, '127.0.0.1', () => {
  console.info('Started server');
});