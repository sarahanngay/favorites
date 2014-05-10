var AddressModel = require(process.cwd() + '/models/address');

module.exports = remove;

function remove (req, res, next) {

  var id = req.body.id;

  // make sure an id is given
  if (!id) {
    return es.send('id is missing', 400);
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