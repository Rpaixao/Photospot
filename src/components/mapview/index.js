import React, { Component } from 'react';

import ReactNative, {
   Platform,
   StyleSheet,
   TouchableOpacity,
   Image,
   View,
   ListView,
   Text,
   ToolbarAndroid,
   ActivityIndicator,
   Slider,
   StatusBar
 } from 'react-native';

 import MapView from 'react-native-maps';

 import Dimensions from 'Dimensions';
 var windowSize = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

 const PIN_SHIFT = (Platform.OS === 'ios') ? 10 : 25

module.exports = React.createClass({

    getInitialState(){
      var latitude = 0;
      var longitude = 0;
        return {
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          },
          locationRadius: 1,
        };
    },

    componentDidMount(){
      this.onPressMyLocationEvent();
    },

    onRegionChange(region) {
      this.setState({ region });
    },

    onPressLocationEvent(){
      this.props.navigator.push({name: 'list', currentLatitude: this.state.region.latitude, currentLongitude: this.state.region.longitude, radius: this.state.locationRadius});
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
        }
      );
    },

    render() {
      if(this.state.region){
        return (
          <View style={styles.mapContainer}>
            <StatusBar barStyle="default" />
           <MapView style={styles.map}
            region={this.state.region}
            onRegionChange={this.onRegionChange}>

            </MapView>
            <View>
              <View style={styles.pinView}>
                <TouchableOpacity onPress={() => {}}>
                  <Image source={require('./view42.png')}  style={{ width: 32, height: 32}} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.topContainer}>
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.myLocationButtonView}>
                <TouchableOpacity onPress = {this.onPressMyLocationEvent} style={styles.myLocationButton}>
                  <Image source={require('./mylocation-blue.png')}  style={{ width: 24, height: 24}} />
                </TouchableOpacity>
              </View>
              <View style={styles.sliderView}>
                <View style={{marginTop: 5}}>
                  <Text style={styles.whiteFont} >
                    {this.state.locationRadius } Km
                  </Text>
                </View>
                <Slider style={styles.slider} value={1} step={1} minimumValue={1} maximumValue={32} onValueChange={(locationRadius) => this.setState({locationRadius: locationRadius})}/>
                <View style={styles.photosButtonView}>
                  <TouchableOpacity onPress = {this.onPressLocationEvent} style={styles.photosButton}>
                      <Icon name="search" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      }else{
        return(
          <ActivityIndicator/>
        )
      }

    }

  });

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  pinView: {
    top:(windowSize.height/2) - PIN_SHIFT
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomContainer: {
    top:(windowSize.height/1.7),
  },
  topContainer:{
    top: 0
  },
  myLocationButtonView: {
    width: windowSize.width-10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end'
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
  sliderView: {
    borderTopWidth: 1,
    borderColor: 'rgba()rgba(0,0,0,0.1)',
    width: windowSize.width,
    height: windowSize.height/1.5,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  slider: {
    marginLeft: 10,
    marginRight: 10
  },
  photosButtonView: {
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photosButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#258039',
    elevation: 10,
    borderRadius: 50,
    width: 48,
    height: 48,
  },
  whiteFont: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
  nearbyButton: {
      borderRadius: 5,
      backgroundColor: '#2A3132',
      padding: 20,
      alignItems: 'center'
  },
});
