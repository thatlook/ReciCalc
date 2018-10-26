const API_KEY = require('../config.example.js').API_KEY;
module.exports.recipes = {
  getList: (req, res) => {
    //query datbase for a list of short recipe descriptions and return them
    res.status(200).send('Under construction! List of recipes to come.');
  },
  getOne: (req, res) => {
    //endpoint: /api/recipes/:recipeId
    //query databse for detailed information on the given recipe and return it
    res.status(200).send(`Under construction! Information on recipe ${req.params.recipeId} to come.`);
  },
  post: (req, res) => {
    //Store recipe in database
    res.status(404).send('Under construction! We are not currently able to store data.');
  }
};

module.exports.ingredients = {
  getDbByName: (req, res) => {
    //expect req.params to have 'q' or 'searchTerm' or something
    //Query database for ingredients matching a particular search string, and present them
    res.status(200).send('Under construction! Possible ingredient matches to come.');
  },
  getUsdaByName: (req, res) => {
    //Client-side example get function ------------->
    //Retrieves USDA NDBNO for ingredient that user searches for

    /*axios.get('api/ingredients/usda', {
      params: {
        query: 'deli ham'
      }
    })
      .then((data) => {
        const list = data.data.map(item => {
          return [item.name, item.ndbno, item.group]
        })
        console.log(`${data.config.params.query} successfully searched: `,list);
      })
      .catch(error => {
        throw(error)
      });
      */


    //Query USDA NDB API for ingredients matching a particular search string, and present them
    //expect req.params to have 'q' or 'searchTerm' or something
    console.log('looking for ndbno')
    axios.get(`https://api.nal.usda.gov/ndb/search/?`, {
      params: {
        format: 'JSON',
        q: req.query.query,
        sort: 'r',
        max: 25,
        offset: 0,
        ds: 'Standard Reference',
        api_key: `${API_KEY}`
      },
    })
      .then((data) => {
        res.status(200).send(data['data']['list']['item']);
      })
      .catch(error => {
        throw(error);
      });
  },
  getUsdaIngredientInfo: (req, res) => {
    //Client-side example get function ------------->
    //Retrieves nutrients and info using ndbno number from user-selected ingredient

    /*axios.get('api/ingredients/usda/:', {
      params: {
        ndbno: '07028'
      }
    })
      .then(data => {
        console.log('success!', data.data[0], data.data[0].nutrients)
      })
      .catch(error => {
        throw(error.message);
      })
      */ 

    //expect req.params.ndbno 
    //Query USDA API for nutritional data about the provided item number
    console.log('looking for nutrients')
    axios.get('https://api.nal.usda.gov/ndb/nutrients/?', {
      params: {
        format: 'JSON',
        api_key: `${API_KEY}`,
        nutrients: ['208', '204', '606', '291', '203', '307', '601', '269', '205'],
        ndbno: req.query.ndbno
      },
      paramsSerializer: function(params) {
        return qs.stringify(params, {indices: false})
      },
    })
      .then(data => {
        res.status(200).send(data.data.report.foods)
      })
      .catch(error => {
        throw(error)
      });
  },
  post: (req, res) => {
    //Store ingredient in database
    res.status(404).send('Under construction! We are not currently able to store data.');
  }
}
