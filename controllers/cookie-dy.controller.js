const cookieController = {};

cookieController.firstPartyCookie = (req, res) => {
  let dyid = '';
  if (req.method === 'GET') {
    console.log(req.headers)
    dyid = req.headers['dyid'];
  } else if (req.method === 'POST') {
    console.log(req.body)
    dyid = req.body['dyid'];
  }
  console.log('dyid', dyid)
  
  if (!dyid) {
    res.status(400).json({msg: 'No se encontro cookie'})
  }

  const oneYear = 31536000000;
  const expires = new Date(Date.now() + oneYear);

  res.cookie('_dyid_server', dyid, { // store a new server-side cookie named "_dyid_server" with the DYID value
    expires, // Set a 1 year expiration for the new cookie
    domain: '.onrender.com',
  }).status(200).json({msg: 'Se retorna cookie _dyid_server'});
};

module.exports = cookieController;
