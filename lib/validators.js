var Joi = require('joi')

module.exports = function (req, res, next) {

  // defined the schem required to add a location
  var schema =  {
    country: Joi.string().required(),
    line: Joi.array().includes(Joi.string(), Joi.string()).min(1).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    name: Joi.string().required()
  };

  // if we're editing an address, make sure to have id
  if (req.method === 'PUT') {
    schema.id = Joi.string().required();
  }

  // validate to make sure valid data was sent
  var errors = Joi.validate(req.body, schema);

  // if validation failed, send results
  if (errors) {
    return res.send(errors, 400);
  } else {
    return next();
  }

}