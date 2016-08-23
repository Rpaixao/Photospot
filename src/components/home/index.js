'use strict';
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

import React, {
  Component
} from 'react';

import ReactNative, {
  AppRegistry,
  Platform,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Slider,
  ActivityIndicator
 } from 'react-native';

var Home = React.createClass({
  getInitialState: function() {
    return {
      currentLocation: 'unknown',
      locationRadius: 2
    };
  },

  onPressEvent(){

  },

  onPressLocationEvent(){
    this.props.navigator.push({name: 'list', title: 'Location Photos', currentLatitude: "39.915535", currentLongitude: "-8.319510000000037", radius: this.state.locationRadius});
  },

  onPressMapEvent(){
    this.setState({
      gpsLoading: true
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var currentLatitude = position.coords.latitude;
        var currentLongitude = position.coords.longitude;
        this.setState({
          gpsLoading: false
        });
        this.props.navigator.push({name: 'mapview', currentLatitude: currentLatitude, currentLongitude: currentLongitude});
      },
      (error) => {
        this.setState({
          gpsLoading: false
        });
        alert("Erro while getting your location: " + error.message);
      }
    );
  },

  onPressNearbyEvent(){
      this.setState({
        gpsLoading: true
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          var currentLatitude = position.coords.latitude;
          var currentLongitude = position.coords.longitude;
          this.setState({
            gpsLoading: false
          });
          this.props.navigator.push({name: 'list', title: 'Nearby Photos', currentLatitude: currentLatitude, currentLongitude: currentLongitude, radius: this.state.locationRadius});
        },
        (error) => {
          this.setState({
            gpsLoading: false
          });
          alert("Erro while getting your location: " + error.message);
        }
      );
  },

  renderGPSLoading(){
    if(this.state.gpsLoading){
      return(
        <ActivityIndicator size="large"/>
      );
    }
  },

  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={require('./bg8.png')} />

            {/**
            <View style={{borderRadius: 2, marginTop: 50, marginLeft: 5, marginRight: 5, backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <Text style={[styles.whiteFont, {marginTop: 5}]}>SEARCH BY TEXT</Text>
              <TextInput
                style={{height: 50, marginBottom: 5, marginTop: 10, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
                keyboardType="numeric"
                placeholder="Type a keyword"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <TouchableOpacity onPress={this.onPressEvent} style={{marginBottom: 10, marginLeft: 40, marginRight: 40}}>
                <View style={styles.chooseLocationButton}>
                    <Text style={styles.whiteFont}>SEARCH</Text>
                </View>
              </TouchableOpacity>
            </View>
            **/}

            <View style={{borderRadius: 2, marginTop: 40, marginLeft: 5, marginRight: 5, backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <Text style={[styles.whiteFont, {marginTop: 5}]}>SEARCH BY LOCATION</Text>
              <TouchableOpacity onPress={this.onPressMapEvent} style={{marginTop: 10, marginBottom: 10, marginLeft: 40, marginRight: 40}}>
                <View style={styles.chooseLocationButton}>
                    <Text style={styles.whiteFont}>OPEN MAP</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              { this.renderGPSLoading() }
            </View>

            <View style={{borderRadius: 2, marginTop: 40, marginLeft: 5, marginRight: 5, backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <TouchableOpacity onPress={this.onPressLocationEvent} style={{marginTop: 10, marginBottom: 10, marginLeft: 40, marginRight: 40}}>
                <View style={styles.chooseLocationButton}>
                    <Text style={styles.whiteFont}>DUMMY</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{borderRadius: 2, marginTop: 40, marginLeft: 5, marginRight: 5, backgroundColor: 'rgba(0,0,0,0.3)'}}>
              <TouchableOpacity onPress={this.onPressNearbyEvent} style={{marginTop: 10, marginBottom: 10, marginLeft: 40, marginRight: 40}}>
                <View style={styles.chooseLocationButton}>
                    <Text style={styles.whiteFont}>CURRENT LOCATION</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
    );
  }
});
var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    nearbyButton: {
        borderRadius: 5,
        backgroundColor: '#2A3132',
        padding: 20,
        alignItems: 'center'
    },
    chooseLocationButton: {
        borderRadius: 5,
        backgroundColor: '#336B87',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      textAlign: 'center',
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold'
    }
})
module.exports = Home;
