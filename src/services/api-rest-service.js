
module.exports = {
    fetchPhotos(lat, lng, filter, currentRadius){

        let REQUEST_BASE_URL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2254d4b9a1d5a438cafc2621d2f002f3&privacy_filter=1&has_geo=1&format=json&nojsoncallback=1&per_page=40&extras=views&page=";

        var radius = currentRadius;
        var latitude = lat;
        var longitude = lng;
        var currentPage = 1;
        var urlString = REQUEST_BASE_URL + currentPage + '&lat=' + latitude + '&lon=' + longitude + '&radius=' + radius + '&sort=interestingness-desc&per_page=40&tags=' + filter;

        return fetch(urlString, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {

            var promises = jsonResponse.photos.photo.map((item) => {
                var promise = this.fetchGeoLocation(item).then( (geoLocation) => {
                    return geoLocation;
                });

                return promise.then();

            });

            return Promise.all(promises).then((jsonPhotos) => {

                var sorted = jsonPhotos.sort(function(a, b) {return b.views - a.views});
                return sorted;

            });

        }).catch((err) => {
            alert("Ups..Error fetching data :( " + err);
            console.log("Ups..Error fetching data :( : " + err);
        });
    },


    fetchGeoLocation(item){

        let REQUEST_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=2254d4b9a1d5a438cafc2621d2f002f3&format=json&nojsoncallback=1&';

        var requestURLWithPhotoID = REQUEST_URL + "&photo_id=" + item.id;
        return fetch(requestURLWithPhotoID, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            let locationJson = jsonResponse.photo.location;
            return {
                locality: locationJson.locality !== undefined ? locationJson.locality._content : "",
                region: locationJson.region !== undefined ? locationJson.region._content : "",
                county: locationJson.county !== undefined ? locationJson.county._content : "",
                latitude: locationJson.latitude,
                longitude: locationJson.longitude,
                id: item.id,
                image: 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_c.jpg',
                mapsURL: "http://maps.google.com/maps?z=12&t=m&q=loc:" + locationJson.latitude + "+" + locationJson.longitude + "",
                views: parseInt(item.views),
                owner: item.owner
            };
        }).catch((err) => {
            console.log('why!! -' + err)
        });
    }

};