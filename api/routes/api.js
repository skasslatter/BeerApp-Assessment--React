let express = require('express');
let router = express.Router();
let Axios = require("axios");

let apiKey = process.env.APIKEY

router.get('/beers', function(req, res, next) {
  Axios
  .get(`https://sandbox-api.brewerydb.com/v2/beers?key=${process.env.APIKEY}`)
    .then(response =>{
      console.log("api response", response.data.data)
      res.json({beers: response.data.data})
    })
    .catch(err => {
      console.log(`get beers error: ${err}`)
      res.status(500);
      res.json({err})
    })
});

router.get('/breweries', function(req, res, next) {
  Axios
  .get(`https://sandbox-api.brewerydb.com/v2/breweries?withLocations=Y&key=${process.env.APIKEY}&withLocations=Y`)
    .then(response =>{
      console.log("api response", response.data.data)
      res.json({beers: response.data.data})
    })
    .catch(err => {
      console.log(`get beers error: ${err}`)
      res.status(500);
      res.json({err})
    })
});
// "https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&withLocations=Y"


module.exports = router;
