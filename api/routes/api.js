let express = require("express");
let router = express.Router();
let Axios = require("axios");

router.get("/beers", function (req, res, next) {
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/beers?key=${process.env.APIKEY}`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ beers: response.data.data });
    })
    .catch((err) => {
      console.log(`get beers error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

router.get("/beers/:id", function (req, res, next) {
  const selectedBrewery = req.params.id;
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/beer/${selectedBrewery}/?key=${process.env.APIKEY}`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ beers: response.data.data });
    })
    .catch((err) => {
      console.log(`get beers error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

router.get("/breweries", function (req, res, next) {
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/breweries?withLocations=Y&key=${process.env.APIKEY}&withLocations=Y`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ beers: response.data.data });
    })
    .catch((err) => {
      console.log(`get beers error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

router.get("/breweries/:id", function (req, res, next) {
  console.log("req.params", req);
  const selectedBrewery = req.params.id;
  Axios.get(
    `https://sandbox-api.brewerydb.com/v2/brewery/${selectedBrewery}/beers?key=${process.env.APIKEY}`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ beers: response.data.data });
    })
    .catch((err) => {
      console.log(`get beers error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

module.exports = router;
