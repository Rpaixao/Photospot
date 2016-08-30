/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

let PhotospotApp = require('./src/PhotospotApp');

class Photospot extends Component {
  render() {
    return (
      <PhotospotApp>
      </PhotospotApp>
    );
  }
}

AppRegistry.registerComponent('Photospot', () => Photospot);
