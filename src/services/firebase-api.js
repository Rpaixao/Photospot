let Firebase = require('firebase');
let myFutsalPortugalFirebaseRef = new Firebase("https://api.flickr.com/services/rest/?");

let connectChildFutsalPortugal = function (child) {
  return myFutsalPortugalFirebaseRef.child(child);
}

let api = {};

api.getUserById = function (userId) {
  return new Promise( function (resolve, reject) {
    connectChild(`/users/1`).once('value', (user) => {
        resolve(user.val());
    })
  })
}

api.getFestasSul = function(){
  var jsonResponse;

  fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key= 2254d4b9a1d5a438cafc2621d2f002f3&sort=date-taken-desc&privacy_filter=1&has_geo=1&lat=37.01682929999999&lon=-8.940593100000001&radius=5&format=json&nojsoncallback=1", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            jsonResponse = responseData;
        })
  .done();

  return jsonResponse
}

module.exports = api;
