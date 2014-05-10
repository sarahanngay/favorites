var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var controllers = require(process.cwd() + '/controllers');
var Schema      = mongoose.Schema;
var validator   = require(process.cwd() + '/lib/validators');

var db = mongoose.connection;

mongoose.connect('mongodb://sarahbobber:dumble11@ds031627.mongolab.com:31627/favorites');

app.use(express.static(__dirname + '/public/index'));
app.use(require('body-parser')());
app.use(require('method-override')());


app.get('/', function (req, res) {
  res.send('OK', 200);
})
app.get('/list', controllers.show);
app.post('/', validator, controllers.add);
app.delete('/', controllers.remove);
app.put('/', validator, controllers.edit);
