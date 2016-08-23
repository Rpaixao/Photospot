import React, { Component } from 'react';
import ReactNative, { View, Navigator, Platform, StatusBar, BackAndroid } from 'react-native';

var FestaDetail = require('./components/photodetail');
var List = require('./components/photoslist');
var Home = require('./components/home');
var MapView = require('./components/mapview');

var SCENE_CONFIG = Platform.OS === 'ios' ? Navigator.SceneConfigs.PushFromRight : Navigator.SceneConfigs.FadeAndroid;

var ROUTES = {
  list: List,
  festa: FestaDetail,
  home: Home,
  mapview: MapView
};

var PhotospotApp = React.createClass({
  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  handleBackButton: function() {
    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }
    return false;
  },

  renderScene: function(route, navigator){
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },

  render : function(){
    return(
      <View style={{flex: 1}}>
      <StatusBar
            backgroundColor="#171c1c"
            barStyle="light-content"
      />
      <Navigator
        ref="navigator"
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene}
        configureScene={(route) => { return SCENE_CONFIG }}
      />
      </View>
    );
  }
});

module.exports = PhotospotApp;
