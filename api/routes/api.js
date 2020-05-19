let express = require("express");
let Axios = require("axios");

let router = express.Router();

const brewerydbBaseUrl = 'https://sandbox-api.brewerydb.com/v2';

router.get("/beers", function (req, res, next) {
  Axios.get(
    `${brewerydbBaseUrl}/beers?key=${process.env.APIKEY}`
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
    `${brewerydbBaseUrl}/beer/${selectedBrewery}/?key=${process.env.APIKEY}`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ beer: response.data.data });
    })
    .catch((err) => {
      console.log(`get beer error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

router.get("/breweries", function (req, res, next) {
  Axios.get(
    `${brewerydbBaseUrl}/breweries?withLocations=Y&key=${process.env.APIKEY}&withLocations=Y`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ breweries: response.data.data });
    })
    .catch((err) => {
      console.log(`get breweries error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

router.get("/breweries/:id/beers", function (req, res, next) {
  console.log("req.params", req);
  const selectedBrewery = req.params.id;
  Axios.get(
    `${brewerydbBaseUrl}/brewery/${selectedBrewery}/beers?key=${process.env.APIKEY}`
  )
    .then((response) => {
      console.log("api response", response.data.data);
      res.json({ beers: response.data.data });
    })
    .catch((err) => {
      console.log(`get brewery beers error: ${err}`);
      res.status(500);
      res.json({ err });
    });
});

module.exports = router;
