module.exports = show;

function show (req, res, next) {
  return res.send({herp: 'derp'});
}