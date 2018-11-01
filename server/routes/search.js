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
        to: 6,
      }
    })
    .then(data => {
      console.log('getFromEd data ', data.data.hits )
      
      res.status(200).send(data.data.hits);
    })
    .catch(err => {
      console.log('error in api get from edamam', err);
      res.status(400).end('error in api get from edamam', err);
    })
  },
};