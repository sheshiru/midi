const distance = require("google-distance-matrix");

distance.key(process.env.APIKEY);

var origins = ["ironhack paris"];
var destination = ["bao bao paris"];

function getDistance(origins, destination, clbk) {
  distance.matrix(origins, destination, function(err, distances) {
    if (!err) {
      clbk(distances.rows[0].elements[0].distance.text);
    }
  });
}

module.exports = getDistance;
