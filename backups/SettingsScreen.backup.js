import React, { Component } from 'react';
import { Container, Content, Text, Body, CheckBox, ListItem, Button} from 'native-base';
import PhotospotState from './state/PhotospotState';

let tags = ['beach']

export default class FilterSettingsScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Settings'
    });

    state = {
        beach: false,
        trees: false,
        sea: false,
        landscape: false,
        flowers: false,
        nature: false,
        summer: false,
        city: false,
        bird: false,
    }

    onCheckBoxPress(value){
        this.setState({
          [value]: !this.state[value]
        });
    }

    render() {
        //TODO: Esta lista deverá ser criada com um ciclo for
        return (
            <Container>
                <Content>
                    <ListItem onPress={() => this.onCheckBoxPress('beach')}>
                        <CheckBox checked={this.state['beach']} onPress={() => this.onCheckBoxPress('beach')}/>
                        <Body>
                        <Text>Beach</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('trees')}>
                        <CheckBox checked={this.state['trees']} />
                        <Body>
                        <Text>Trees</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('sea')}>
                        <CheckBox checked={this.state['sea']} />
                        <Body>
                        <Text>Sea</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('landscape')}>
                        <CheckBox checked={this.state['landscape']} />
                        <Body>
                        <Text>Landscape</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('flowers')}>
                        <CheckBox checked={this.state['flowers']} />
                        <Body>
                        <Text>Flowers</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('nature')}>
                        <CheckBox checked={this.state['nature']} />
                        <Body>
                        <Text>Nature</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('summer')}>
                        <CheckBox checked={this.state['summer']} />
                        <Body>
                        <Text>Summer</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('city')}>
                        <CheckBox checked={this.state['city']} />
                        <Body>
                        <Text>City</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.onCheckBoxPress('bird')}>
                        <CheckBox checked={this.state['bird']} />
                        <Body>
                        <Text>Bird</Text>
                        </Body>
                    </ListItem>
                    <Button full onPress={ () => PhotospotState.setFilters(this.state)}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}