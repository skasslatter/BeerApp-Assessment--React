let express = require('express');
let router = express.Router();
let Axios = require("axios");

let apiKey = process.env.APIKEY

router.get('/beers', function(req, res, next) {
  const url = `https://sandbox-api.brewerydb.com/v2/beers?withBreweries=Y&key=${apiKey}`;
  Axios
    .get(url)
    .then(response =>{
      res.json({beers: response.data})
    })
    .catch(err => {
      console.log(`get beers error: ${err}`)
      res.status(500);
      res.json({err})
    })
});

module.exports = router;
