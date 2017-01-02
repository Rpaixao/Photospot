import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';

module.exports = React.createClass({

  getInitialState(){
    return{};
  },

  onSkipBtnHandle(index) {
    this.props.navigator.replace({name: 'mapview'});
  },

  doneBtnHandle() {
    this.props.navigator.replace({name: 'mapview'});
  },

  nextBtnHandle(index) {
  },

  onSlideChangeHandle(index, total) {
    console.log(index, total);
  },

  render() {
    const pageArray = [{
      title: 'Search Fotos',
      description: 'Find great landscapes on earth',
      img: require('./1.png'),
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#2A3132',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Enjoy the Photos',
      description: 'Browse photos close to the geolocation you selected',
      img: require('./2.png'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    },
    {
     title: 'Navigate to the place you just found!',
     description: 'Enjoy!',
     img: require('./3.png'),
     imgStyle: {
       height: 93 * 2.5,
       width: 103 * 2.5,
     },
     backgroundColor: '#11b202',
     fontColor: '#fff',
     level: 10,
   }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
});
