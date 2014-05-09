
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logfmt   = require('logfmt');

mongoose.connect('mongodb://sarahbobber:dumble11@ds031627.mongolab.com:31627/favorites');   // connect to mongoDB database on modulus.io

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public/index'));
app.use(require('body-parser')());
app.use(require('method-override')());

app.get('/', function (req, res) {
  res.send({hello: 'world'})
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log("Listening on " + port);
});