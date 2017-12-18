import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Icon, H1, Header } from 'native-base';

export default class FloatingLabelExample extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Login',
    });

    render() {
        return (
            <Container style={{marginTop: 20, alignItems: 'center'}}>
                <Content >
                    <H1 style={{color: '#AAA', textAlign: 'center'}}>Please, log in in your account first</H1>

                    <Button style={{backgroundColor: '#3B5998',
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