import React, { Component } from 'react';

import ReactNative, {
   Platform,
   StyleSheet,
   TouchableOpacity,
   Image,
   Button,
   View,
   ListView,
   Text,
   ToolbarAndroid,
   ActivityIndicator,
   AsyncStorage
 } from 'react-native';

 var ResponsiveImage = require('react-native-responsive-image');
 var PhotoRowContent = require('./photorow');

 import Dimensions from 'Dimensions';
 let windowWidth = Dimensions.get('window').width;
 let windowHeight = Dimensions.get('window').height;
 var PHOTOS = [];
 var DATASOURCE_MANAGER;

 var REQUEST_BASE_URL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2254d4b9a1d5a438cafc2621d2f002f3&privacy_filter=1&has_geo=1&format=json&nojsoncallback=1&per_page=200&page=1&extra=views";
 var LOCATION_REQUEST_BASE_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=2254d4b9a1d5a438cafc2621d2f002f3&format=json&nojsoncallback=1&';

module.exports = React.createClass({

  getInitialState(){
    DATASOURCE_MANAGER = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var titleString = "Location Photos"
      return {
        latitude: this.props.navigator.navigationContext.currentRoute.currentLatitude,
        longitude: this.props.navigator.navigationContext.currentRoute.currentLatitude,
        title: titleString
      };
  },

  componentDidMount(){
    this.fetchPhotos();
  },

  fetchPhotos(){
    var radius = this.props.navigator.navigationContext.currentRoute.radius;
    var latitude = this.props.navigator.navigationContext.currentRoute.currentLatitude;
    var longitude = this.props.navigator.navigationContext.currentRoute.currentLongitude;

    var urlString = REQUEST_BASE_URL + '&lat=' + latitude + '&lon=' + longitude + '&radius=' + radius + '&sort=date-taken-desc';
    console.log(urlString);
    fetch(urlString, {
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        let photosJson = jsonResponse.photos.photo;
        this.setState({
            dataSource : DATASOURCE_MANAGER.cloneWithRows(photosJson),
            hasPhotos: photosJson.length > 0
        })
    }).catch((err) => {
        alert("Ups..Error fetching data: " + err);
    });
  },

    onPressEvent(rowData){
        this.props.navigator.push({name: 'photodetail', photoData: rowData});
    },

    onHomePress(){
        this.props.navigator.pop();
    },

    onAddFavoriteGeoLocationClick(){
        try {
            AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
            var value = AsyncStorage.getItem('@MySuperStore:key');
            return;
          } catch (error) {
            alert("Error saving");
        }
    },

    renderHeader(){
      if(Platform.OS === 'ios'){
        return(
          <View style={styles.stickySection}>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginLeft: 20, marginTop: 5, alignItems: 'center', height: STICKY_HEADER_HEIGHT}} onPress={(onPress) => {this.props.navigator.pop()}}>
              <Image source={require('./left-arrow24.png')}  style={{ width: 24, height: 24}} />
            </TouchableOpacity>
            <View style={{flex: 9, alignItems: 'center', marginTop: 10, marginRight: 35}}>
              <Text style={styles.stickySectionText}>{this.state.title}</Text>
            </View>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row', marginRight: 10, marginTop: 5, alignItems: 'center', height: STICKY_HEADER_HEIGHT}} onPress={(onPress) => {this.onAddFavoriteGeoLocationClick()}}>
              <Image source={require('./star.png')}  style={{ width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
        )
        }else{
          return(
            <ToolbarAndroid
              titleColor='white'
              style={{backgroundColor: '#2A3132', height: 56}}
              title={ this.state.title }
              navIcon={require('./left-arrow24.png')}
              onIconClicked={(onBackPress) => {this.props.navigator.pop()}}
              actions={[{title: 'Fav', icon: require('./star.png'), show: 'always'}]}
              onActionSelected={this.onAddFavoriteGeoLocationClick}
            />
          )
        }
      },

      hasEnoughData() {
        return this.state.dataSource && this.state.hasPhotos;
      },

      hasEnoughDataButHasNoPhotos() {
        return this.state.dataSource && !this.state.hasPhotos;
      },

      renderImage(rowData){
        var urlString = 'https://farm' + rowData.farm + '.staticflickr.com/' + rowData.server + '/' + rowData.id + '_' + rowData.secret + '_c.jpg';
        return(
          <ResponsiveImage initWidth= "120" initHeight="120" source={{uri:urlString}}/>
        )
      },

      renderPhotosList(){
        if(this.hasEnoughData()){

          return(
            <ListView
              ref="ListView"
              style={styles.listContainer}
              dataSource={ this.state.dataSource }
              renderSeparator={(sectionID, rowID) => <View key={`separator-${rowID}`} style={styles.listSeparator}/>}
              renderRow={(rowData) => (
                <TouchableOpacity style={styles.rowContainer} onPress={(onPress) => {this.props.navigator.push({name: 'photodetail', photoData: rowData})}}>
                    { this.renderImage(rowData) }
                    <PhotoRowContent rowData={rowData}/>
                  </TouchableOpacity>
               )}
            />
          );
        }else{
          if(!this.hasEnoughData() && !this.hasEnoughDataButHasNoPhotos()){
            return(
              <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large"/>
              </View>
            );
          }else{
            return(
              <View style={{flex:1, marginTop: 20, marginLeft: 10, marginRight: 5, alignItems: 'center'}}>
                <Text style={{fontSize: 24}}>:( There are no photos here.. </Text>
                <Text style={{fontSize: 16, marginTop: 10, textAlign: 'center'}}>Please try to increase the distance or choose another geolocation.</Text>
                <TouchableOpacity onPress = {() => this.props.navigator.pop()} style={styles.noPhotosBackButton}>
                  <Image source={require('./left-arrow24.png')}  style={{ width: 24, height: 24}} />
                </TouchableOpacity>
              </View>
            );
          }

        }
      },

    render() {
      const { onScroll = () => {} } = this.props;
      return (
        <View style={styles.container}>
          { this.renderHeader() }
          { this.renderPhotosList() }
        </View>
    )
  }
  });

const window = Dimensions.get('window');

const AVATAR_SIZE = 90; //original: 120
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 56; ;
const STICKY_HEADER_TEXT_TOP_MARGIN = Platform.OS === 'ios' ? 15 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  background: {
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#2A3132',
    width: window.width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: STICKY_HEADER_TEXT_TOP_MARGIN
  },
  fixedSection: {
    ...Platform.select({
      ios: {
        bottom: 35
      },
      android: {
        bottom: 40
      },
    }),
    right: -10
  },
  listSeparator: {

  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 15,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  rowContainer:{
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  row: {
    flex: 1
  },
  rowText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10
  },
  rowSubText: {
    fontSize: 10,
    color: '#999',
    marginLeft: 10,
    marginBottom: 10
  },
  noPhotosBackButton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#2A3132',
    elevation: 10,
    borderRadius: 50,
    width: 48,
    height: 48,
  },
});
