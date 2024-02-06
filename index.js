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
    res.json({msg: 'No se encontro cookie'})
  }

  res.cookie('_dyid_server', dyid, { // store a new server-side cookie named "_dyid_server" with the DYID value
    expires: new Date(Date.now() + 31540000000000), // Set a 1 year expiration for the new cookie
  }).status(200).json({msg: 'Se encontro cookie'});
});

app.post('/cookie-dynamic-yield', (req, res) => {
  console.log(req.body)
  const dyid = req.body['dyid'];
  console.log(dyid)
  if (!dyid) {
    res.json({msg: 'No se encontro cookie'})
  }

  res.cookie('_dyid_server', dyid, { // store a new server-side cookie named "_dyid_server" with the DYID value
    path: 'https://www.farmatodo.com.co/',
    expires: new Date(Date.now() + 31540000000000), // Set a 1 year expiration for the new cookie
  }).status(200).json({msg: 'Se encontro cookie'});
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})