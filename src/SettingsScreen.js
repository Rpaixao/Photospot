import React, { Component } from 'react';
import { Container, Content, Text, Icon, Card, CardItem, Right} from 'native-base';

class FilterSettingsScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Settings',
    });

    render() {

        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem button onPress={() => this.props.navigation.navigate('FilterSettingsScreen')}>
                            <Icon active name="ios-color-filter-outline" />
                            <Text>Filters</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem button onPress={() => alert("Not implemented")}>
                            <Icon active name="ios-locate-outline" />
                            <Text>Radius</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

export default FilterSettingsScreen;