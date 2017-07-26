import React from 'react';
import {
    StyleSheet,
    Dimensions,
    Button as ReactButton,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';

import IconIonic from 'react-native-vector-icons/Ionicons';
import { Text, View, Container, Button, Icon, DeckSwiper, Card, CardItem, Left, Right, Toast, Body, Picker, Item } from 'native-base';
import ApiRestService from './services/api-rest-service';
import PhotospotState from './state/PhotospotState';

const window = Dimensions.get('window');

export default class App extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Photospot',
        headerStyle: {
            flexDirection: 'row'
        },
        headerRight: <TouchableOpacity style={styles.headerRightButton} onPress={() => navigation.navigate('FilterSettingsScreen')}>
            <IconIonic name={'ios-color-filter-outline'} size={30} color='#1258e5'/>
        </TouchableOpacity>,
        headerLeft: <TouchableOpacity style={styles.headerLeftButton} onPress={() => navigation.navigate('LoginScreen')}>
            <IconIonic name={'ios-heart-outline'} size={30} color='#1258e5'/>
        </TouchableOpacity>
    });

    state = {
        selected: 'key1',
        filter: 'photo',
        cards: []
    }

    componentWillMount(){
        this.getGPSLocationAndFetchData();
    }

    onPressShowMeDirections(urlString){
        urlString += "";
        Linking.canOpenURL(urlString).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ');
            } else {
                return Linking.openURL(urlString);
            }
        });
    }

    getGPSLocationAndFetchData(){

        this.setState({
            cards: []
        });

        return navigator.geolocation.getCurrentPosition(
            (position) => {
                var currentLatitude = position.coords.latitude;
                var currentLongitude = position.coords.longitude;
                this.setState({
                    region: {
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                    }
                });

                ApiRestService.fetchPhotos(this.state.region.latitude, this.state.region.longitude, PhotospotState.getFiltersString(), PhotospotState.settings.radius)
                    .then((sortedList) => {
                        console.log(sortedList);
                    this.setState({
                        cards: sortedList
                    })
                });

            },
            (error) => {
                alert("Erro while getting your location: " + error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    render() {

        if(this.state.cards.length > 0){
            return (
                <Container>
                    <View padder >
                        <DeckSwiper dataSource={this.state.cards}
                                    renderItem={(item)=>
                                        <Card style={{flex: 1}}>
                                            <CardItem>
                                                <Left>
                                                    <Body>
                                                    <Text>{item.locality}</Text>
                                                    <Text note>{item.county}, {item.region}</Text>
                                                    <Text note>{item.views} views</Text>
                                                    </Body>
                                                </Left>
                                                <Right>
                                                    <Button transparent onPress={()=> this.getGPSLocationAndFetchData()}>
                                                        <Icon name="ios-heart-outline" style={{fontSize: 45, color: 'red'}}/>
                                                    </Button>
                                                </Right>
                                            </CardItem>
                                            <CardItem cardBody>
                                                <Image source={{uri: item.image}} style={{height: window.height/1.6, width: null, flex: 1}}/>
                                            </CardItem>
                                            <Button full success onPress={() => this.onPressShowMeDirections(item.mapsURL)}>
                                                <Icon name="ios-navigate" style={{fontSize: 30, color: 'white'}}/>
                                                <Text>Show me directions !</Text>
                                            </Button>
                                        </Card>
                                    }>
                        </DeckSwiper>
                    </View>
                </Container>
            );
        }else {
            return(
                <ActivityIndicator style={{flex: 1}} size="large"></ActivityIndicator>
            );
        }

    }
}

let styles = StyleSheet.create({
    activityIndicator : {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRightButton: {
        marginRight: 10
    },
    headerLeftButton: {
        marginLeft: 10
    }
});
