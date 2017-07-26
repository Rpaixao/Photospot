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
    Button,
    TextInput
} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text style={{fontSize: 32, marginTop: 10, marginBottom: 10, textAlign: 'center', color: '#AAA'}}> Lets configure your preferences!</Text>

                <TextInput placeholder="Interests" style={{height: 40, backgroundColor: '#EEE', borderWidth: 1, borderColor: '#DDD', textAlign: 'center'}}/>
                <TextInput placeholder="Age" style={{height: 40, backgroundColor: '#EEE', borderWidth: 1, borderColor: '#DDD', textAlign: 'center'}}/>

                <View style={{marginTop: 10}}>
                    <Button
                        style={{marginTop: 10}}
                        title="Done"
                        onPress={() =>
                            navigate('Profile', { name: 'Jane' })
                        }
                    /></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
