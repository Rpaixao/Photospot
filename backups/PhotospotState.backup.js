let tags = ['beach', 'trees', 'sea', 'landscape', 'flowers', 'nature', 'summer', 'city', 'bird'];

module.exports = {
    settings: {
      filters: '',
      radius: 10
    },

    setFilters(filters){
        /*
         beach: false,
         trees: false,
         sea: false,
         landscape: false,
         flowers: false,
         nature: false,
         summer: false,
         city: false,
         bird: false,
         */
        var filtersString = "";

        if(filters['beach']){
            filtersString += 'beach,'
        }

        if(filters['trees']){
            filtersString += 'trees,'
        }

        if(filters['sea']){
            filtersString += 'sea,'
        }

        if(filters['landscape']){
            filtersString += 'landscape,'
        }

        if(filters['flowers']){
            filtersString += 'flowers,'
        }

        if(filters['nature']){
            filtersString += 'nature,'
        }

        if(filters['summer']){
            filtersString += 'summer,'
        }

        if(filters['city']){
            filtersString += 'city,'
        }

        if(filters['bird']){
            filtersString += 'bird'
        }

        this.settings.filters = filtersString;

        alert(this.settings.filters);
    },

    setRadius(radius){
        this.settings.radius = radius
    }

};

