import React, { Component } from 'react';
import ReactNative, { View, Navigator, Platform, StatusBar, BackAndroid, AsyncStorage } from 'react-native';

var PhotoDetail = require('./components/photodetail');
var List = require('./components/photoslist');
var Home = require('./components/home');
var MapView = require('./components/mapview');
var PhotoView = require('./components/photoview')
var Intro = require('./components/intro')

var SCENE_CONFIG = Platform.OS === 'ios' ? Navigator.SceneConfigs.PushFromRight : Navigator.SceneConfigs.FadeAndroid;

var ROUTES = {
  list: List,
  photodetail: PhotoDetail,
  home: Home,
  mapview: MapView,
  photoview: PhotoView,
  intro: Intro
};

var PhotospotApp = React.createClass({

  getInitialState(){
    return{
        rootScreen: null
      }
  },

  componentDidMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  },

  componentWillMount: function(){

    var myRootScreen;

    AsyncStorage.getItem("@PhotospotStore:introAlreadyWatched0", (error, result) => {
        var favorites = [];
        if(error || result === null){
          myRootScreen = "intro";
          AsyncStorage.setItem('@PhotospotStore:introAlreadyWatched0', "1");
        }else{
          myRootScreen = "mapview";
          console.log("map is going to be rendered");
        }

        this.setState({
          rootScreen: myRootScreen
        });

    });

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

    if(this.state.rootScreen === undefined || this.state.rootScreen === null){
      return(
        <View></View>
      );
    }else{
      return(
        <View style={{flex: 1}}>
        <StatusBar
              backgroundColor="#171c1c"
              barStyle="light-content"
        />
        <Navigator
          ref="navigator"
          initialRoute={{name: this.state.rootScreen}}
          renderScene={this.renderScene}
          configureScene={(route) => { return SCENE_CONFIG }}
        />
        </View>
      );
    }

  }
});

module.exports = PhotospotApp;
