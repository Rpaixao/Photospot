import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { Text, Button} from 'native-base';

import MapView from 'react-native-maps';

import { connect } from 'react-redux';

class MapScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Map'
    });

    state = {
        region: {
            latitude: 38.666707,
            longitude: -9.0377,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    }

    onRegionChange = this.onRegionChange.bind(this);
    onRegionChange(region) {
        this.setState({
            region
        });
    }

    render() {

        let latitude = this.props.latitude ? this.props.latitude : 38.666707;
        let longitude = this.props.longitude ? this.props.longitude : -9.0377;

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    onRegionChange={this.onRegionChange}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.3922,
                        longitudeDelta: 0.3421,
                    }}
                />
                <Button full success onPress={() => {
                    this.props.setCurrentLocation(this.state.region.latitude, this.state.region.longitude, (response) => {
                        if(response.lat && response.lat){
                            this.props.getCards("", response.lat, response.long);
                            this.props.resetCards();
                        } else{
                            alert("Error :( try again");
                        }
                    });
                    this.props.navigation.goBack();
                }}>
                    <Text>Save</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    headerRightButton: {
        marginRight: 10
    },
});

import { getCards, resetCards, setCurrentLocation } from './redux-actions';

function select (store) {
    return {
        cards: store.cardsReducer.get('cards'),
        filters: store.cardsReducer.get('filters'),
        latitude: store.cardsReducer.get('latitude'),
        longitude: store.cardsReducer.get('longitude'),
        nav: store.navRecucer
    };
}

function actions (dispatch) {
    return {
        setCurrentLocation: (lat, long, onFinishCallback) => dispatch(setCurrentLocation(lat, long, onFinishCallback)),
        getCards: (filters, lat, long) => dispatch(getCards(filters, lat, long)),
        resetCards: () => dispatch(resetCards()),
    };
}

export default connect(select, actions)(MapScreen);