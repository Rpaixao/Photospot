import React, { Component } from 'react';

import ReactNative, {
   Platform,
   StyleSheet,
   TouchableOpacity,
   Image,
   Button,
   View,
   ListView,
   Text,
   ToolbarAndroid,
   ActivityIndicator
 } from 'react-native';

 var ResponsiveImage = require('react-native-responsive-image');

 import Dimensions from 'Dimensions';

 var REQUEST_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=2254d4b9a1d5a438cafc2621d2f002f3&format=json&nojsoncallback=1&';

module.exports = React.createClass({

    getInitialState(){
      DATASOURCE_MANAGER = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {};
    },

    componentDidMount(){
      this.fetchGeoLocation();
    },

    fetchGeoLocation(){
      var requestURLWithPhotoID = REQUEST_URL + "&photo_id=" + this.props.rowData.id;
      fetch(requestURLWithPhotoID, {
          method: 'get'
      }).then((response) => {
          return response.json();
      }).then((jsonResponse) => {
          let locationJson = jsonResponse.photo.location;
          this.setState({
              geoLocationData : {
                country: locationJson.country._content,
                locality: locationJson.locality !== undefined ? locationJson.locality._content : "",
                region: locationJson.region !== undefined ? locationJson.region._content : "",
                county: locationJson.county !== undefined ? locationJson.county._content : "",
                latitude: locationJson.latitude,
                longitude: locationJson.longitude
              }
          })
      }).catch((err) => {
          console.log('why!! -' + err)
      });
    },

    hasEnoughData() {
      return this.state.geoLocationData ;
    },

    render(){
      if(this.hasEnoughData()){
        return(
          <View style={ styles.row }>
            <Text style={ styles.rowText } ellipsizeMode="tail" numberOfLines={4}>
              { this.state.geoLocationData.locality }, { this.state.geoLocationData.county }
            </Text>
            <Text style={ styles.rowSubText } ellipsizeMode="tail" numberOfLines={4}>
              { this.state.geoLocationData.region }, { this.state.geoLocationData.country }
            </Text>
            <Text style={ styles.rowSubSubText }>
                { this.props.rowData.title }
            </Text>
          </View>
        );
      }else{
        return(
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        )
      }

    },
  });

const window = Dimensions.get('window');

const AVATAR_SIZE = 90; //original: 120
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 56; ;
const STICKY_HEADER_TEXT_TOP_MARGIN = Platform.OS === 'ios' ? 15 : 0;

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  rowText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10
  },
  rowSubText: {
    fontSize: 12,
    marginLeft: 10,
    marginTop: 5
  },
  rowSubSubText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 10,
    marginTop: 5
  }
});
