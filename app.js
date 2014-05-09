
  var express     = require('express');
  var app         = express();
  var mongoose    = require('mongoose');
  var controllers = require(process.cwd() + '/controllers');

  //mongoose.connect('mongodb://sarahbobber:dumble11@ds031627.mongolab.com:31627/favorites');   // connect to mongoDB database on modulus.io

  app.use(express.static(__dirname + '/public/index'));
  app.use(require('body-parser')());
  app.use(require('method-override')());

  app.listen(4000);

  app.get('/', controllers.show);
  app.post('/', controllers.add);
  app.delete('/', controllers.remove);
  app.put('/', controllers.edit);