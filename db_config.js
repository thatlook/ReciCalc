module.exports.location = {
  host : 'localhost',
  user : process.env.user,
  password : process.env.password,
  database : 'test'
};

module.exports.environment = 'development' 
  //Used in database/db.js to determine with part of knexfile.js to use