const express = require('express');
// const bodyParser = require("body-parser");
// require db connection or functions?


let app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));


// CONTROLLERS



let port = 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

