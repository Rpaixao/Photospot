/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';

import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'CardsScreen'})
    ]
})

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    state = {
        geoCoordinatesLoaded: false
    }

    componentDidMount(){
        this.setGeoCoordinates();
    }

    setGeoCoordinates() {
        const { navigate, dispatch } = this.props.navigation;

        if(!this.state.geoCoordinatesLoaded){
            setTimeout( () => this.setState({geoCoordinatesLoaded: true}) , 2000);
            setTimeout( () => dispatch(resetAction) , 2500);
        }

    }

    renderStatusIndicator(){
        if(!this.state.geoCoordinatesLoaded){
            return (
                <ActivityIndicator size="large" style={styles.activityIndicator}/>
            )
        } else {
            return (
                <View style={styles.activityIndicator}>
                    <IconIonic name={'md-done-all'} size={40} color='#333'/>
                </View>
            )
        }
    }

    render() {

        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>

                    <Text style={styles.modalTitle}> We are trying to find you...</Text>

                    { this.renderStatusIndicator() }

                    <TouchableOpacity onPress={() =>
                        navigate('CardsScreen', { name: 'Jane' })
                    }>
                        <Text style={styles.text}>Set geo coordinates manually</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 52,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#222'
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#888'
    },
    activityIndicator : {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
