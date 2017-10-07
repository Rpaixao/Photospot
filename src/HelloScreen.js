/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'MapScreen'})
    ]
})

export default class HelloScreen extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        const { navigate } = this.props.navigation;



        return (
            <View style={styles.container}>
                <View>

                    <Text style={styles.modalTitle}> Hello Jonh Doe! </Text>
                    <Text style={styles.text}> Let's introduce you to Photospot...</Text>
                    <Button style={{backgroundColor: '#BBBBB',
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10}}
                            block
                            title="Login In"
                            onPress={() => {
                                navigate('LoginScreen');
                            }}>
                    </Button>
                    <Button style={{backgroundColor: '#FFFFF',
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10}}
                            block
                            title="Stay Anonymous"
                            onPress={() => {
                                navigate('FilterSettingsScreen');
                        }}>
                    </Button>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#222',
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
