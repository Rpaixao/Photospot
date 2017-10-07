import HomeScreen from '../HomeScreen';
import HelloScreen from '../HelloScreen';
import CardsScreen from '../CardsScreen';
import LoginScreen from '../LoginScreen';
import FilterSettingsScreen from '../FilterSettingsScreen';
import SettingsScreen from '../SettingsScreen';
import MapScreen from '../MapScreen';

import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

const Routes = {
    Home: { screen:  HelloScreen},
    HomeScreen: { screen: HomeScreen },
    CardsScreen: { screen: CardsScreen },
    LoginScreen: { screen: LoginScreen },
    FilterSettingsScreen: { screen: FilterSettingsScreen },
    SettingsScreen: { screen: SettingsScreen },
    MapScreen: { screen: MapScreen }
};

export default Routes;