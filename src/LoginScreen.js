import React, { Component } from 'react';
import { Container, Content, Toast, Button, Text, Icon, H1} from 'native-base';
import { Linking, AsyncStorage } from 'react-native';
import { facebook  } from 'react-native-simple-auth';
import { connect } from 'react-redux';

import secrets from './login-utils/secrets'

const LAST_LOGGED_IN_USERINFO_STORAGE_KEY = '@PhotospotLogin:lastLoggedInUserInfo';

class LoginScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Login',
    });

    constructor(props) {
        super(props);
        this.state = {
            showToast: false
        }
    }

    componentDidMount() {
        Linking.addEventListener('url', this._handleOpenURL);
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this._handleOpenURL);
    }

    _handleOpenURL(event) {
        console.log("Photospot opened from URL");
    }

    render() {
        return (
            <Container style={{marginTop: 20, alignItems: 'center'}}>
                <Content >
                    <H1 style={{color: '#AAA', textAlign: 'center'}}>Please, log in in your account first</H1>

                    <Button onPress={() => {
                            facebook(secrets.facebook).then((userInfo) => {

                                if(userInfo){
                                    this.props.setUserInfo(userInfo);
                                    Toast.show({
                                        text: 'Logged in with Facebook!',
                                        position: 'bottom',
                                        duration: 2000
                                    });
                                    AsyncStorage.setItem(LAST_LOGGED_IN_USERINFO_STORAGE_KEY, JSON.stringify(userInfo), (error) => {
                                        // Por agora não precisamos de tratar erros aqui, visto que se trata de usabilidade apenas (Não ha mal não conseguir gravar)
                                        if (error) {
                                            return;
                                        }

                                    });
                                    this.props.navigation.goBack();
                                }else {
                                    alert("A problem has occurred. Please try again.");
                                }

                            }).catch((error) => {
                                alert("An error has occurred. Please try again.");
                                console.log("[E] [LOGIN] " + error);
                            })
                        }
                    }
                        style={{backgroundColor: '#3B5998',
                            marginTop: 20,
                            marginLeft: 10,
                            marginRight: 10}} block>
                            <Icon name="logo-facebook" />
                            <Text>Login with Facebook</Text>
                    </Button>
                    <Button style={{backgroundColor: '#ff0000',
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10}} block>
                            <Icon name="logo-google" />
                            <Text>Login with Google</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}

import { setUserInfo } from './redux-actions';

function select (store) {
    return {
        cards: store.cardsReducer.get('userInfo'),
    };
}

function actions (dispatch) {
    return {
        setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo))
    };
}

export default connect(select, actions)(LoginScreen);