const db = require('../..//database/db.js');

module.exports.users = {
  post: (req, response) => {
    db.addUser(req.body.user, (err, result) => {
      if (err) {
        console.log('err for users route is ', err);
        resonse.end('error in addUser')
      } else {
        // console.log('res for users route is ', result);
        response.end(result);
      }
    })
  }
}