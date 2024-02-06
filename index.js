const express = require('express');
const path = require('path')
const cors = require('cors')

const app = express();
const port = process.argv[3] || 3000;

app.use(cors())
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cookie-dynamic-yield', (req, res) => {
  console.log(req.headers)
  const dyid = req.headers['dyid'];
  console.log(dyid)
  if (!dyid) {
    res.status(400).json({msg: 'No se encontro cookie'})
  }

  const oneYear = 31536000000;
  const expires = new Date(Date.now() + oneYear);

  res.cookie('_dyid_server', dyid, { // store a new server-side cookie named "_dyid_server" with the DYID value
    expires, // Set a 1 year expiration for the new cookie
  }).status(200).json({msg: 'Se retorna cookie _dyid_server'});
});

app.post('/cookie-dynamic-yield', (req, res) => {
  console.log(req.body)
  const dyid = req.body['dyid'];
  console.log(dyid)
  if (!dyid) {
    res.status(400).json({msg: 'No se encontro cookie'})
  }

  const oneYear = 31536000000;
  const expires = new Date(Date.now() + oneYear);

  res.cookie('_dyid_server', dyid, { // store a new server-side cookie named "_dyid_server" with the DYID value
    expires, // Set a 1 year expiration for the new cookie
    domain: '.onrender.com',
  }).status(200).json({msg: 'Se retorna cookie _dyid_server'});
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})