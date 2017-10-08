import React from 'react';

import {
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
    ListView
} from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import { View, Container, H1 } from 'native-base';
import { connect } from 'react-redux';

import PhotospotCard from './components/PhotospotCard';

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

    constructor(){
        super();
        this.state = {
            currentPage: 1,
        };
    }

    onEndReached = this.onEndReached.bind(this);
    onEndReached() {

        let nextPage = this.state.currentPage + 1;
        this.state = {
            currentPage: nextPage
        };

        console.log("[D] END REACHED - Page " + nextPage);

        this.props.getCards(this.props.filters, this.props.latitude, this.props.longitude, nextPage);
    }

    onPressAddToFavoritesButton = this.onPressAddToFavoritesButton.bind(this);
    onPressAddToFavoritesButton(){
        if(this.props.userInfo && this.props.userInfo.isLoggedIn){
            alert(this.props.userInfo.username + ", this feature is not implemented yet.");
        } else {
            this.props.navigation.navigate('LoginScreen');
        }
    }

    render() {

        if(this.props.totalCards === -1){
            return(
                <ActivityIndicator style={{flex: 1}} size="large"></ActivityIndicator>
            );
        } else if(this.props.totalCards > 0){
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.state = {
                dataSource: ds.cloneWithRows(this.props.cards),
                currentPage: this.state.currentPage
            };

            return (
                <ListView
                        ref="CardsListView"
                        dataSource={this.state.dataSource}
                        onEndReached={() => {
                                this.onEndReached();
                            }
                        }
                        renderRow={(item)=>
                            <View padder>
                                <PhotospotCard onPressAddToFavoritesButton={this.onPressAddToFavoritesButton}
                                photoObject={item}
                                navigation={this.props.navigation} />
                            </View>
                        }>
                </ListView>
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
        nav: store.navRecucer,
        latitude: store.cardsReducer.get('latitude'),
        longitude: store.cardsReducer.get('longitude'),
        userInfo: store.loginReducer.get('userInfo')
    };
}

function actions (dispatch) {
    return {
        getCards: (filters, lat, long, currentPage) => dispatch(getCards(filters, lat, long, currentPage)),
        setCurrentLocation: (lat, long, onFinishCallback) => dispatch(setCurrentLocation(lat, long, onFinishCallback))
    };
}

export default connect(select, actions)(CardsScreen);
