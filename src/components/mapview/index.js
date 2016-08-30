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
   ActivityIndicator,
   Slider,
   StatusBar
 } from 'react-native';

 import MapView from 'react-native-maps';

 import Dimensions from 'Dimensions';
 var windowSize = Dimensions.get('window');

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
      this.props.navigator.push({name: 'list', title: 'Other Location Photos', currentLatitude: this.state.region.latitude, currentLongitude: this.state.region.longitude, radius: this.state.locationRadius});
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
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
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
              <View style={{top:(windowSize.height/2) - PIN_SHIFT}}>
                <TouchableOpacity onPress={() => {}}>
                  <Image source={require('./pin3.png')}  style={{ width: 24, height: 24}} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginLeft: 5, top:(windowSize.height/1.6)}}>
              <View style={{width: windowSize.width-10, marginBottom: 10, marginRight: 10, backgroundColor: 'rgba(0,0,0,0)', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress = {this.onPressMyLocationEvent} style={{alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: 'white', borderRadius: 50, borderWidth: 1, borderColor: '#DDD'}}>
                  <Image source={require('./mylocation-blue.png')}  style={{ width: 24, height: 24}} />
                </TouchableOpacity>
              </View>
              <View style={{width: windowSize.width-10, borderRadius: 10, marginBottom: 40, backgroundColor: 'rgba(0,0,0,0.3)'}}>
                <Slider style={{marginTop: 5, marginLeft: 10, marginRight: 10}} value={1} step={1} minimumValue={1} maximumValue={32} onValueChange={(locationRadius) => this.setState({locationRadius: locationRadius})}/>
                <Text style={styles.whiteFont} >
                  Map Radius: {this.state.locationRadius } Km
                </Text>
                <TouchableOpacity onPress={this.onPressLocationEvent} style={{marginTop: 10, marginBottom: 10, marginLeft: 40, marginRight: 40}}>
                  <View style={styles.nearbyButton}>
                      <Text style={styles.whiteFont}>VIEW PHOTOS</Text>
                  </View>
                </TouchableOpacity>
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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  whiteFont: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  nearbyButton: {
      borderRadius: 5,
      backgroundColor: '#2A3132',
      padding: 20,
      alignItems: 'center'
  },
});
