const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
// require db connection or functions?


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));


// CONTROLLERS
app.get('/api/recipes', function(req, res) {
  //query datbase for a list of short recipe descriptions and return them
  res.status(200).send('Under construction! List of recipes to come.');
})

app.get('/api/recipes/:recipeId', function(req, res) {
  //query databse for detailed information on the given recipe and return it
  res.status(200).send('Under construction! Recipe information to come.');
})

app.get('/api/ingredients', function(req, res) {
  //Query database for ingredients matching a particular search string, and present them
  res.status(200).send('Under construction! Possible ingredient matches to come.');
})

app.get('/api/ingredients/usda', function(req, res) {
  //Query USDA NDB API for ingredients matching a particular search string, and present them
  res.status(200).send('Under construction! Possible NDB ingredient matches to come.');
})

app.get('/api/ingredients/usda/:ndbno', function(req, res) {
  //Query USDA API for nutritional data about the provided item number
  res.status(200).send('Under consruction! Possible nutritional information to come.');
})

app.post('/api/recipes', function(req, res) {
  //Store recipe in database
  res.status(404).send('Under construction! We are not currently able to store data.');
})

app.post('/api/ingredients', function(req, res) {
  //Store ingredient in database
  res.status(404).send('Under construction! We are not currently able to store data.');
})


// FALLBACK ROUTE
// React Router is a Client Side Router (CSR)
// All the router logic lives at the top level/root of the app
// If page is refreshed outside of root url, send request to the root html, where the CSR logic lives
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})


let port = 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

