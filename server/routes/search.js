module.exports.searchEdamam = {
  getRecipeFromEdamam: (ingredients) => {

    let q = ingredients.reduce((acc, ingredient) => (
      acc.concat(`, ${ingredient}`)
    ))

    console.log('query for edamam search is ', q);

    return new Promise((resolve, reject) => {
      axios.get('https://api.edamam.com/search',{
        params: {
          q: q,
          app_id: `${config.EDAMAM_APP_ID}`,
          app_key: `${config.EDAMAM_KEY}`,
          to: 1,
        }
      })
      .then(res => {

        resolve(res)
      })
      .catch(err => {
        console.log('error in api get from edamam', err);
        reject('error in api get from edamam', err);
      })
    })
  },
};