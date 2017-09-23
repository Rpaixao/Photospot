import React, { Component } from 'react';
import ApiRestService from "../services/api-rest-service";
import {
    AppRegistry,
    Image,
    Linking,
    Dimensions
} from 'react-native';

import { Text, Button, Icon, Card, CardItem, Left, Right, Body } from 'native-base';

const window = Dimensions.get('window');
export default class PhotospotCard extends React.Component {

    componentWillMount(){

        let item = this.props.photoObject;

        this.setState({
            cardInfo: {
                image: 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_c.jpg'
            }
        });

        ApiRestService.fetchPhotoDetails(item).then( (serverResponse) => {
            this.setState({
                cardInfo : {
                    locality: serverResponse.locality !== undefined ? serverResponse.locality._content : "",
                    region: serverResponse.region !== undefined ? serverResponse.region._content : "",
                    county: serverResponse.county !== undefined ? serverResponse.county._content : "",
                    latitude: serverResponse.latitude,
                    longitude: serverResponse.longitude,
                    id: item.id,
                    image: 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_c.jpg',
                    mapsURL: "http://maps.google.com/maps?z=12&t=m&q=loc:" + serverResponse.latitude + "+" + serverResponse.longitude + "",
                    views: parseInt(item.views),
                    owner: item.owner
                }
            });

        });
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

    render() {

        let item = this.state.cardInfo;
        return(
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
                        <Button transparent onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <Icon name="ios-heart-outline" style={{fontSize: 45, color: 'red'}}/>
                        </Button>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: item.image}} style={{height: window.height/1.6, width: 100, flex: 1}}/>
                </CardItem>
                <Button full success onPress={() => this.onPressShowMeDirections(item.mapsURL)}>
                    <Icon name="ios-navigate" style={{fontSize: 30, color: 'white'}}/>
                    <Text>Show me directions !</Text>
                </Button>
            </Card>
        )


    }
}
