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
import { Text, View, Container, Button, Icon, DeckSwiper, Card, CardItem, Left, Right, H1, Body} from 'native-base';

import { connect } from 'react-redux';

const window = Dimensions.get('window');

class CardsScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Photospot',
        headerStyle: {
            flexDirection: 'row'
        },
        headerRight: <TouchableOpacity style={styles.headerRightButton} onPress={() => navigation.navigate('SettingsScreen')}>
            <IconIonic name={'ios-cog'} size={30} color='#1258e5'/>
        </TouchableOpacity>
    });

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
        if(this.props.totalCards === -1){
            return(
                <ActivityIndicator style={{flex: 1}} size="large"></ActivityIndicator>
            );
        } else if(this.props.totalCards > 0){
            return (
                <Container>
                    <View padder >
                        <DeckSwiper dataSource={this.props.cards}
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
                                                    <Button transparent onPress={() => this.props.navigation.navigate('LoginScreen')}>
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
                <Container>
                    <View padder>
                        <H1 style={{color: '#555', textAlign: 'center'}}>No results, please try a differnt location.</H1>
                    </View>
                </Container>
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

import { getCards, setCurrentLocation } from './redux-actions';

function select (store) {
    return {
        cards: store.cardsReducer.get('cards'),
        totalCards: store.cardsReducer.get('totalCards'),
        nav: store.navRecucer
    };
}

function actions (dispatch) {
    return {
        getCards: (filters, lat, long) => dispatch(getCards(filters, lat, long)),
        setCurrentLocation: (lat, long, onFinishCallback) => dispatch(setCurrentLocation(lat, long, onFinishCallback))
    };
}

export default connect(select, actions)(CardsScreen);
