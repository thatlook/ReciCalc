module.exports.location = {
  host : 'localhost',
  user : process.env.user,
  password : process.env.password,
  connection: 'postres://user:password@localhost/recipe',
  database : 'recipe'
};
 
module.exports.production = {
  client: 'pg',
  // connection: process.env.DATABASE_URL + '?ssl=true',
  connection: process.env.DATABASE_URL + '?ssl=true',
}


module.exports.environment = 'production'
  //Used in database/db.js to determine with part of knexfile.js to use