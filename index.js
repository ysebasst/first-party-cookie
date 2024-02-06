const express = require('express');
const path = require('path')
const cors = require('cors');
const morgan = require('morgan');
const cookieDYRoutes = require('./routes/cookie-dy.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.use('/cookie-dynamic-yield', cookieDYRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})