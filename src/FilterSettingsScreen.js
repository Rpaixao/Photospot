import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Text, Body, CheckBox, ListItem, Button, Toast} from 'native-base';
import { connect } from 'react-redux';
import PhotospotState from './state/PhotospotState';
import {
    Slider
} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';

class FilterSettingsScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Filter Settings'
    });

    state = this.props.filters;

    onCheckBoxPress(value){
        this.setState({
          [value]: !this.state[value]
        });
    }

    renderListItems(){
                var listItems = PhotospotState.tags.map((tag) => {
            return (
                <ListItem key={tag} onPress={() => this.onCheckBoxPress(tag)}>
                    <CheckBox color="#999" checked={this.state[tag]} onPress={() => this.onCheckBoxPress(tag)}/>
                    <Body>
                    <Text>{tag}</Text>
                    </Body>
                </ListItem>
            )
        });

        return listItems;
    }

    render() {

        const { goBack } = this.props.navigation;

        return (
            <Container>
                <Content>
                    { this.renderListItems() }

                    <Button full success onPress={ () => {
                        this.props.setFilters(this.state);
                        this.props.resetCards();
                        this.props.getCards(this.state, this.props.latitude, this.props.longitude);
                        goBack();
                    }}>
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

import { getCards, setFilters, resetCards } from './redux-actions';

function select (store) {
    return {
        filters: store.cardsReducer.get('filters'),
        latitude: store.cardsReducer.get('latitude'),
        longitude: store.cardsReducer.get('longitude')
    };
}

function actions (dispatch) {
    return {
        setFilters: (filters) => dispatch(setFilters(filters)),
        getCards: (filters, lat, long) => dispatch(getCards(filters, lat, long)),
        resetCards: () => dispatch(resetCards()),
    };
}

const styles = StyleSheet.create({
    headerRightButton: {
        marginRight: 10
    },
});

export default connect(select, actions)(FilterSettingsScreen);