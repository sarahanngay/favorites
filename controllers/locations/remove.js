var AddressModel = require(__dirname + '../../../models/address')

module.exports = remove;

function remove (req, res, next) {

  var id = req.params.id;

  // make sure an id is given
  if (!id) {
    return res.send('id is missing', 400);
  }

  // find by id and remove location
  AddressModel.findByIdAndRemove(id, function (error, data) {
    if (error) {
      return res.send(error, 400);
    } else {
      return res.send('Location removed', 200);
    }
  })

}