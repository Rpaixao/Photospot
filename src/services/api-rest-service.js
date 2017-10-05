
module.exports = {
    fetchPhotos(lat, lng, filter, currentRadius, currentPage = 1){

        let REQUEST_BASE_URL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2254d4b9a1d5a438cafc2621d2f002f3&privacy_filter=1&has_geo=1&format=json&nojsoncallback=1&&extras=views&page=";

        var radius = currentRadius;
        var latitude = lat;
        var longitude = lng;
        var urlString = REQUEST_BASE_URL + currentPage + '&lat=' + latitude + '&lon=' + longitude + '&radius=' + radius + '&sort=interestingness-desc&per_page=10&tags=' + filter;


        return fetch(urlString, {
            method: 'get'
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            return jsonResponse.photos.photo.sort(function(a, b) {return b.views - a.views})
        }).catch((err) => {
            alert("Ups..Error fetching data :( " + err);
            console.log("Ups..Error fetching data :( : " + err);
        });
    },


    fetchPhotoDetails(item){

        let REQUEST_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=2254d4b9a1d5a438cafc2621d2f002f3&format=json&nojsoncallback=1&';

        var requestURLWithPhotoID = REQUEST_URL + "&photo_id=" + item.id;
        return fetch(requestURLWithPhotoID, {
            method: 'get'
        }).then((response) => {
            console.log("[DEBUG] RECEBI A RESPOSTA do GEO LOCATION do " + item.id);
            return response.json();
        }).then((jsonResponse) => {
            let locationJson = jsonResponse.photo.location;
            return locationJson;
        }).catch((err) => {
            console.log('why!! -' + err)
        });
    },

    fetchSearchHints(){
          return [...this.fetchFlickrFilters(),...this.fetchGooglePlaces()];
    },

    fetchFlickrFilters(){
        return [
            {type: 'filter', hint: 'Trees'},
            {type: 'filter', hint: 'Landscapes'},
            {type: 'filter', hint: 'Cities'},
            {type: 'filter', hint: 'Animals'},
            {type: 'filter', hint: 'Cars'},
        ];
    },

    fetchGooglePlaces(){
        return [
            {type: 'place', hint: 'Lisbon'},
            {type: 'place', hint: 'Porto'},
            {type: 'place', hint: 'Braga'},
            {type: 'place', hint: 'Porto Côvo'},
            {type: 'place', hint: 'Algarve'},
        ];
    }



};