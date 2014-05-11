var AddressModel = require(__dirname + '../../../models/address')

module.exports = show;

function show (req, res, next) {
  var id = req.params.id;

  // if we have an id, we're looking for one specific locations
  if (id) {
    // find the address by id
    AddressModel.findById(id, function(error, data) {
      // create the return value
      var retval = {
        message: null,
        status: 400
      };

      // if there is an error, set the response message
      if (error) {
        retval.message = error;
      } else {
        // if we didn't find the location, set proper message
        if (!data) {
          retval.message = 'Could not find location';
        // otherwise, set the status to 200 and send the location
        } else {
          retval.message = data;
          retval.status = 200;
        }
      }

      // return the respose
      return res.send(retval.message, retval.status);
    });
  // if we don't have an id, we want to grab the entire list
  } else {
    // find all locations within AddressModel
    AddressModel.find({}, function (error, data) {
      // if there is an error, return the error
      if (error) {
        return res.send(error, 400);
      // otherwise, send the data or an empty string
      } else {
        // just in case something unexpected is returned, default data to
        // an empty array
        data = data || [];
        return res.send(data, 200);
      }
    });
  }
}