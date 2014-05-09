
  var express  = require('express');
  var app      = express();
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://sarahbobber:dumble11@ds031627.mongolab.com:31627/favorites');   // connect to mongoDB database on modulus.io

  app.use(express.static(__dirname + '/public/index'));     // set the static files location /public/img will be /img for users
  app.use(require('body-parser')());              // pull information from html in POST
  app.use(require('method-override')());            // simulate DELETE and PUT

  app.listen(4000);

  app.get('/', function (req, res) {
    res.send({hello: 'world'})
  });