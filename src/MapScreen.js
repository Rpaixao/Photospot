import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator} from 'react-native';
import { Text, Button} from 'native-base';

import MapView from 'react-native-maps';

import { connect } from 'react-redux';

class MapScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Choose the spot'
    });

    componentWillMount(){
         setTimeout(()=>this.setState({statusBarHeight: 1}),500);
         this.props.setCurrentLocation(null, null, (response) => {
            if(response.lat && response.long){
                this.setState({
                   region: {
                       latitude: response.lat,
                       longitude: response.long,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421,
                   }
                });
            } else{
                alert("GPS not available. Please choose any location on map");
                this.props.setCurrentLocation(47.516231, 14.550072, (response) => {
                    this.setState({
                        region: {
                            latitude: response.lat,
                            longitude: response.long,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }
                    });
                });
            }
         });
    }

    onRegionChange = this.onRegionChange.bind(this);
    onRegionChange(region = undefined) {
        if(region){
            this.setState({
                region
            });
        }
    }

    isMapDataRenderingAvailable() {
        return this.state && this.state.region && this.state.region.latitude && this.state.region.longitude;
    }

    render() {

        if(this.isMapDataRenderingAvailable()){

        const { navigate } = this.props.navigation;
        return (
            <View style={[styles.container, {paddingTop: this.state.statusBarHeight}]}>
                <MapView
                    style={styles.map}

                    onRegionChange={this.onRegionChange}
                    initialRegion={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <View style={{paddingBottom: 10}}>
                    <Button rounded success onPress={() => {
                        this.props.setCurrentLocation(this.state.region.latitude, this.state.region.longitude, (response) => {
                            if(response.lat && response.lat){
                                this.props.getCards(this.props.filters, response.lat, response.long);
                                this.props.resetCards();
                            } else{
                                alert("Error :( try again");
                            }
                        });
                        navigate('CardsScreen')
                    }}>
                        <Text>Go!</Text>
                    </Button>
                </View>
            </View>
        );
        } else {
            return (
                <ActivityIndicator style={{flex: 1}} size="large"></ActivityIndicator>
            )
        }
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