var mongoose = require('mongoose')
  , Schema   = mongoose.Schema;

  // create a schema for addresses
  var AddressSchema = new Schema({
    line: [{type: String, default: ''}],
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    zip: {type: String, default: ''},
    country: {type: String, default: ''},
    name: {type: String, default: ''},
    latitude: {type: String, default: null},
    longitude: {type: String, default: null}
  });

module.exports = mongoose.model('Address', AddressSchema);