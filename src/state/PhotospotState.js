
import ApiRestService from '../services/api-rest-service';

module.exports = {
    tags : ['Trees', 'Sea', 'Landscape', 'Flowers', 'Nature', 'Summer', 'City', 'Bird', 'Bridge', 'People'],

    getFiltersString(filters = ""){

        var filtersString = "";
        this.tags.map( (tag) => {
            if(filters[tag]){
                filtersString += tag + ",";
            }
        });

        return filtersString;

    },

    setRadius(radius){
        this.settings.radius = radius
    },

    getCards(){
        this.cards = [];
        return ApiRestService.fetchPhotos(this.latitude, this.longitude, this.getFiltersString(), 32)
            .then((sortedList) => {
                this.cards = sortedList;
                return sortedList;
            });
    }

};

