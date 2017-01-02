import React, { Component } from 'react';

import ReactNative, {
   Platform,
   StyleSheet,
   TouchableOpacity,
   TouchableHighlight,
   Image,
   View,
   ListView,
   Text,
   ToolbarAndroid,
   ActivityIndicator,
   Slider,
   StatusBar,
   AsyncStorage,
    Button
 } from 'react-native';

 const PLATFORM_IOS = Platform.OS === 'ios';

 import MapView from 'react-native-maps';

 import PhotospotState from '../../state';

 import blueLocation from './mylocation-blue.png';

 import Dimensions from 'Dimensions';
 var windowSize = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

var Modal   = require('react-native-modalbox');

 const PIN_SHIFT = (Platform.OS === 'ios') ? 40 : 47;
 const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 56; ;

var favoriteCoordinates = [];
var totalFavorites;

var GOOGLE_GEO_API_BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDC6fKELCrHWfCXVSuDy65EB0n3XdDQpJM";

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

module.exports = React.createClass({

    getInitialState(){

        var latitude = 38.6667066;
        var longitude = -9.037761199999977;

        return {
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
          },
          isToRefreshMarkers: false,
          favorites : null,
          locationRadius: 32,
          isToReloadFavorites: false
        };
    },

    componentWillMount(){
        this.loadFavorites();
    },

    loadFavorites(){
      AsyncStorage.getItem("@PhotospotStore:favorites", (error, result) => {
          if (error) {
              AsyncStorage.setItem('@PhotospotStore:favorites', []);
              this.setState({
                favorites: []
              });
              return;
          }

          var favoritesFromStorage = JSON.parse(result);;

          if(favoritesFromStorage !== null){
            this.setState({
              favorites: favoritesFromStorage
            });
          }else{
            this.setState({
              favorites: []
            });
          }


      });
    },

    componentDidMount(){
      this.onPressMyLocationEvent();
    },

    onRegionChange(region) {
      var locationRadius = (region.latitudeDelta + region.longitudeDelta)/2;
      if(locationRadius <= 1){
        var value = parseInt((locationRadius * 32) / 1);
        if(value < 1){
          value = 1;
        }
      }else{
        var value = 32;
      }

      this.setState({
        locationRadius: value,
        region
       });

      if(PhotospotState.FAVORITES_CHANGED){
          this.loadFavorites();
          PhotospotState.FAVORITES_CHANGED = false;
      }
    },

    onPressLocationEvent(){
      this.props.navigator.push({name: 'list', loadFavoritesCallback: this.loadFavorites, currentLatitude: this.state.region.latitude, currentLongitude: this.state.region.longitude, radius: this.state.locationRadius});
    },

    onPressMyLocationEvent(){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var currentLatitude = position.coords.latitude;
          var currentLongitude = position.coords.longitude;
          this.setState({
            region: {
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            }
          });
        },
        (error) => {
          this.setState({
            gpsLoading: false
          });
          alert("Erro while getting your location: " + error.message);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    },

    onMarkerPress(marker){

    },

    render() {
      if(this.state.favorites !== null){
        return (
          <View style={styles.container}>

            {this.renderTopContainer()}

            <View style={styles.mapContainer}>

             <MapView style={styles.map}
              region={this.state.region}
              moveOnMarkerPress={false}
              onRegionChange={this.onRegionChange}>

                 {this.state.favorites.map(marker => (
                   <MapView.Marker key={marker.latitude} coordinate={marker} onPress={() => this.onMarkerPress(marker)}>
                       <MapView.Callout style={{width: 36, alignItems:'center', justifyContent: 'center'}} onPress={() => {this.removeFavorite(marker)}}>
                         <TouchableHighlight underlayColor='#FFF' onPress={() => {this.removeFavorite(marker)}}>
                          <Icon name="trash" size={24} color="black"/>
                         </TouchableHighlight>
                       </MapView.Callout>
                     </MapView.Marker>
                 ))}

              </MapView>

              <View style={styles.myLocationButtonView}>
                <TouchableOpacity onPress = {this.onPressMyLocationEvent} style={styles.myLocationButton}>
                  <Image source={require('./mylocation-blue.png')}  style={{ width: 24, height: 24}} />
                </TouchableOpacity>
              </View>

              <View>
                <View style={styles.pinView}>
                    <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0)'}}onPress={() => {}}>
                        <Icon name="map-marker" size={24} color="black"/>
                    </TouchableOpacity>
                    <Text style={{color: '#AAA', fontSize: 10, fontWeight: 'bold', paddingTop: 5}}>{this.state.locationRadius} Km</Text>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                  <View style={styles.photosButtonView}>
                    <TouchableHighlight underlayColor= "#2e9e46" onPress = {this.onPressLocationEvent} style={styles.photosButton}>
                        <Icon name="photo" size={24} color="white" />
                    </TouchableHighlight>
                  </View>
              </View>
            </View>

              { this.renderSearchModal()}

          </View>
        );
      }else{
        return(
          <ActivityIndicator/>
        )
      }

    },

    renderTopContainer(){
      return(
        <View style={styles.topContainer}>
          <View style={styles.infoButtonViewLeft}>
            <TouchableOpacity onPress={() => {alert("Info")}}>
              <Icon name="camera" size={18} color="white"/>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: PLATFORM_IOS ? 'center': 'flex-start', justifyContent:'center', flex: 14, marginTop: PLATFORM_IOS ? 25 : 14, marginLeft: PLATFORM_IOS ? 0 : 10}}>
            <Text style={[{flex: 1}, styles.whiteFont]} >
               Photospot
            </Text>
          </View>
          {/*<View style={{ flex: 3, marginTop: 20}} >
            <Slider  style={styles.slider} value={1} step={1} minimumValue={1} maximumValue={32} onValueChange={(locationRadius) => {this.radiusChanged(locationRadius)}}/>
          </View>
          <View style={{ flex: 2, marginTop: PLATFORM_IOS ? 30 : 18}}>
            <Text style={[{flex: 1,  marginRight: 20}, styles.whiteFont]} >
               {this.state.locationRadius} Km
            </Text>
          </View>*/}
          <View style={styles.infoButtonView}>
            <TouchableOpacity onPress={this.openModal1}>
              <Icon name="search" size={20} color="white"/>
            </TouchableOpacity>
          </View>

        </View>
      )
    },

    removeFavorite(marker){
      var i = 0;
      var markers = this.state.favorites;

      for(var i = markers.length - 1; i >= 0; i--) {
        if(markers[i].latitude === marker.latitude) {
           markers.splice(i, 1);
           AsyncStorage.setItem('@PhotospotStore:favorites', JSON.stringify(markers));
           alert("Location removed from favorites");
        }
      }

      this.loadFavorites();

    },

    openModal1: function(id) {
        this.refs.modal1.open();
    },

    radiusChanged(locationRadius){
      this.setState({
        locationRadius: locationRadius,
        region: {
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: 50/locationRadius,
          longitudeDelta: 50/locationRadius
        }
      })
    },

    getRadiusText(locationRadius){
      if(this.state.locationRadius === 1){
        return "Near";
      }else if(this.state.locationRadius === 16){
        return "Medium";
      }else{
        return "Far";
      }
    },

    renderSearchModal(){

        return(
            <Modal style={[styles.modal]} ref={"modal1"} swipeToClose={this.state.swipeToClose} onClosed={this.onClose} onOpened={this.onOpen} onClosingState={this.onClosingState}>

            <View style={{flex: 1}}>

                <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    autoFocus={true}
                    fetchDetails={true}
                    onPress={(data, detail) => {this.fetchGeolocation(detail)}}
                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0
                        },
                        textInput: {
                            marginLeft: 5,
                            marginRight: 5,
                            marginBottom: 5,
                            height: PLATFORM_IOS ? 38 : 45,
                            color: '#5d5d5d',
                            backgroundColor: PLATFORM_IOS ? '#DDD' : 'white',
                            fontSize: 16,
                            borderRadius: PLATFORM_IOS ? 5 : 0,
                            borderWidth: PLATFORM_IOS ? 0 : 1,
                            borderColor: '#DDD'
                        },
                        textInputContainer: {
                            height: 60,
                            backgroundColor: 'white'
                        },
                        predefinedPlacesDescription: {
                            color: 'black'
                        },
                        listView: {
                            backgroundColor: 'white',
                        },

                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyDC6fKELCrHWfCXVSuDy65EB0n3XdDQpJM',
                    }}
                    currentLocation={false}
                />

            </View>

            </Modal>
        );

    },

    fetchGeolocation(detail){
        this.setState({
            region: {
                latitude: detail.geometry.location.lat,
                longitude: detail.geometry.location.lng,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
            }
        })

        this.refs.modal1.close();

    }

  });

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    top: STICKY_HEADER_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  pinView: {
    alignItems: 'center',
    justifyContent: 'center',
    top:(windowSize.height/2) - PIN_SHIFT*2 - STICKY_HEADER_HEIGHT,
    backgroundColor: 'rgba(200,200,200,0.2)',
    borderRadius: 80,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#AAA'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  topContainer:{
    flex: 1,
    flexDirection: 'row',
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#2A3132'
  },
  myLocationButtonView: {
    top: 3,
    width: windowSize.width-(windowSize.width/2),
    marginBottom: 10,
    marginRight: PLATFORM_IOS ? windowSize.width/2 : 10,
    marginLeft: PLATFORM_IOS ? 10 : windowSize.width/2,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: PLATFORM_IOS ? 'flex-start' : 'flex-end'
  },
  infoButtonView: {
    alignItems: 'flex-end',
    flex: 1,
    marginTop: PLATFORM_IOS ? 25 : 17,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  infoButtonViewLeft: {
    alignItems: 'flex-end',
    flex: 1,
    marginTop: PLATFORM_IOS ? 28 : 19,
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  myLocationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 49,
    backgroundColor:'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  bottomContainer: {
    top:(windowSize.height/2),
  },
  photosButtonView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70
  },
  photosButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#258039',
    elevation: 10,
    borderRadius: 40,
    width: 65,
    height: 65,
  },
  whiteFont: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  blackFont: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  nearbyButton: {
      borderRadius: 5,
      backgroundColor: '#2A3132',
      padding: 20,
      alignItems: 'center'
  },
   modal: {
       width: windowSize.width - 10,
       //height: windowSize.height - STICKY_HEADER_HEIGHT*2,
       marginTop: STICKY_HEADER_HEIGHT,
       backgroundColor:'white',
       borderRadius: PLATFORM_IOS ? 5 : 0
   },
});
