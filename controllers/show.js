var AddressModel = require(process.cwd() + '/models/address');

module.exports = show;

function show (req, res, next) {

  AddressModel.find({}, function (error, data) {
    res.send(data, 200);
  })
}