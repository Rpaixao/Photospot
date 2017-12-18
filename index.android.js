import { AppRegistry } from "react-native";
import React from 'react';
import { Provider } from "react-redux";
import getStore from "./src/redux-store/configureStore";
import App from "./src/App";
import AppReducer from './src/redux-reducers';
import { createStore } from 'redux';


class Photospot extends React.Component {

  store = getStore(AppReducer);

  render () {
    return (
        <Provider store={this.store}>
          <App/>
        </Provider>
    );
  }
}

AppRegistry.registerComponent("Photospot", () => Photospot);