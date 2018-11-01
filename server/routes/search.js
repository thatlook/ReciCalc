const axios = require('axios');
const config = require('../../config.js');


module.exports.searchEdamam = {
  getRecipeFromEdamam: (req, res) => {
    
    console.log('req in getRecipeFromEdamam is ', req.query);

    let ingredients = req.query.ingredients;

    let q = ingredients.reduce((acc, ingredient) => (
      acc.concat(`, ${ingredient}`)
    ))

    console.log('query for edamam search is ', q);

    axios.get('https://api.edamam.com/search',{
      params: {
        q: q,
        app_id: `${config.EDAMAM_APP_ID}`,
        app_key: `${config.EDAMAM_KEY}`,
        to: 1,
      }
    })
    .then(response => {
      res.end(response);
    })
    .catch(err => {
      console.log('error in api get from edamam', err);
      res.end('error in api get from edamam', err);
    })
  },
};