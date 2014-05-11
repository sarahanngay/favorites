var mongoose     = require('mongoose')
  , AddressModel = require(__dirname + '../../../models/address')
  , async        = require('async')
  , geocoder     = require('geocoder');


module.exports = add;

function add (req, res, next) {

  // create the waterfall steps
  var wtrfll = [check_duplicate, geo_addr];

  // if we're editing, push edit into the waterfall,
  // otherwise, push add
  if (req.method === 'PUT') {
    wtrfll.push(edit_location);
  } else {
    wtrfll.push(save_location);
  }

  // create the address object for save
  var addr_obj = {
    line: req.body.line,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    name: req.body.name,
    latitude: null,
    longitude: null
  };

  // start the process of adding a location
  async.waterfall(wtrfll, function (error, body) {
    var status = error ? 400 : 200;
    return res.send(body.message, status);
  })

  function check_duplicate (callback) {
    AddressModel.findOne(addr_obj, function (error, data) {
      // create the return value
      var retval = {
        error: true,
        message: null
      };

      // if there is an error, set the error message
      if (error) {
        retval.message = 'Could not add location';
      // if the location already exists, set the error message
      } else if (data) {
        retval.message = 'Location already exists';
      // otherwise, set error to false and set status to 200
      } else {
        retval.error = false;
      }

      return callback(null, retval);
    });    
  }

  function geo_addr (previous, callback) {
    if (previous.error) {
      return callback(null, previous);
    } else {
      var geo_string = addr_obj.line[0] + ' ' 
                       + addr_obj.city + ', ' 
                       + addr_obj.state + ' ' 
                       + addr_obj.country;

      // try to geocode the address given
      geocoder.geocode(geo_string, function(error, result) {

        // if there was an error, return the error message
        if (error) {
          previous.message = error;
          previous.error = true;
          return callback(null, previous);
        } else {

          var obj = result.results[0]
            , lat = null
            , lng = null;

          // if we have an object, grab the lat/long
          if (obj) {
            obj = obj.geometry;
            lat = obj.location.lat;
            lng = obj.location.lng;
          }

          // set the lat/long
          addr_obj.latitude = lat;
          addr_obj.longitude = lng;

          // fill out the return value
          previous.error = false;
          previous.message = null;

          return callback(null, previous);
        }
      });
    }
  }

  function save_location (previous, callback) {
    if (previous.error) {
      return callback(null, previous);
    } else {
      // create a new address object
      var Address = new AddressModel(addr_obj);

      // save the address
      Address.save(function (error, results) {
        // if there was an error, return the error message
        if (error) {
          previous.message = error;
          previous.error = true;
          return callback(null, previous);
        } else {
          // fill out the return value
          previous.error = false;
          previous.message = 'Location added';
          return callback(null, previous);          
        }
      });
    }
  }

  function edit_location (previous, callback) {
    if (previous.error) {
      return callback(null, previous);
    } else {
      // create a new address object
      var Address = new AddressModel(addr_obj);

      // save the address
      AddressModel.findByIdAndUpdate(req.body.id, addr_obj, function (error, results) {
        // if there was an error, return the error message
        if (error) {
          previous.message = error;
          previous.error = true;
          return callback(null, previous);
        } else {
          // fill out the return value
          previous.error = false;
          previous.message = 'Location updated';
          return callback(null, previous);          
        }
      });
    }
  }

}
