import React, {
  Component
} from 'react';

import ReactNative, {
  Platform,
   View,
   Image,
   StyleSheet,
   TouchableOpacity,
   TouchableHighlight,
   ListView,
   Text,
   ToolbarAndroid,
   ActivityIndicator,
   Linking
 } from 'react-native';

import Share, {ShareSheet, Button} from 'react-native-share';
var ParallaxScrollView = require('react-native-parallax-scroll-view');
var photoURL = "";

import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').heights;
const STICKY_HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 56; ;
let mapHeight = Dimensions.get('window').height - STICKY_HEADER_HEIGHT - 40;

var LOCATION_REQUEST_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=2254d4b9a1d5a438cafc2621d2f002f3&format=json&nojsoncallback=1&';
var INFO_REQUEST_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2254d4b9a1d5a438cafc2621d2f002f3&format=json&nojsoncallback=1&';
var GMAPS_URL = 'https://maps.googleapis.com/maps/api/staticmap?size=' + windowWidth + 'x' + mapHeight + '&key=AIzaSyB3mA9yEf03lJWnmkmX4rowwWawOu6TTco&maptype=hybrid';

class PhotoDetail extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      navigator: props.navigator,
      photoData: this.props.navigator.navigationContext.currentRoute.photoData,
    };
  }

  componentDidMount(){
    this.fetchGeoLocation();
    this.fetchInfo();
  }

  fetchInfo(){
    var requestURLWithPhotoID = INFO_REQUEST_URL + "&photo_id=" + this.state.photoData.id;
    fetch(requestURLWithPhotoID, {
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        let infoJson = jsonResponse.photo;
        this.setState({
            photoInfo : {
              username: infoJson.owner.username,
              title: infoJson.title._content,
              url: infoJson.urls.url[0]._content,
              taken: infoJson.dates.taken
            }
        })
    }).catch((err) => {
        alert('why!! -' + err)
    });
  }

  fetchGeoLocation(){
    var requestURLWithPhotoID = LOCATION_REQUEST_URL + "&photo_id=" + this.state.photoData.id;
    fetch(requestURLWithPhotoID, {
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((jsonResponse) => {
        let locationJson = jsonResponse.photo.location;
        this.setState({
            geoLocationData : {
              country: locationJson.country !== undefined ? locationJson.country._content : "",
              locality: locationJson.locality !== undefined ? locationJson.locality._content : "",
              region: locationJson.region !== undefined ? locationJson.region._content : "",
              county: locationJson.county !== undefined ? locationJson.county._content : "",
              latitude: locationJson.latitude,
              longitude: locationJson.longitude
            }
        })
    }).catch((err) => {
        console.log('why!! -' + err)
    });
  }

  renderHeader(){
    var rowData = this.state.photoData;
    photoURL = 'https://farm' + rowData.farm + '.staticflickr.com/' + rowData.server + '/' + rowData.id + '_' + rowData.secret + '_c.jpg';
    return(
        <Image source={{uri: photoURL,
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT}}/>
    );
  }

  onImagePress(){
    this.props.navigator.push({name: 'photoview', imageUri: photoURL});
  }

  renderGMapsImage(){
      var urlString = GMAPS_URL + "&center=" + this.state.geoLocationData.latitude + "," + this.state.geoLocationData.longitude + "&markers=color:red%7C" + this.state.geoLocationData.latitude + "," + this.state.geoLocationData.longitude;
      console.log(urlString);
      return(
        <Image source={{uri: urlString,
                        width: window.width-10,
                        height: mapHeight}}>

            <TouchableHighlight underlayColor='#FFF' onPress={() => {this.onPressGoToWebsiteEvent(this.onPressGoToWebsiteEvent("http://maps.google.com/maps?z=12&t=m&q=loc:" + this.state.geoLocationData.latitude + "+" + this.state.geoLocationData.longitude + ""))}} style={{alignItems: 'center', justifyContent: 'center', width: 48, height: 48, backgroundColor: 'white', borderRadius: 50, borderWidth: 1, borderColor: '#DDD', marginLeft: 10, marginTop: 10}}>
             <Image source={require('./directions.png')}  style={{ width: 32, height: 32}} />
            </TouchableHighlight>
        </Image>
      );
  }

  hasEnoughData() {
    return this.state.geoLocationData ;
  }

  onPressGoToWebsiteEvent(urlString){
      urlString += "";
    Linking.canOpenURL(urlString).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ');
      } else {
        return Linking.openURL(urlString);
      }
    });
  }

  renderLocationContent(){
    if(this.hasEnoughData()){
      return(
        <View style={{borderWidth: 1, borderColor: '#DDD',  width: windowWidth-10, alignItems: 'center', marginTop: 10, marginLeft: 5}}>
          <View style={{alignItems: 'center', marginLeft: 10, marginRight: 10, marginBottom: 10}}>
            { this.renderGMapsImage() }
          </View>
        </View>
      );
    }else{
      return(
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
  }

  renderForegroundContent(){
      if(this.hasEnoughData()){
        return(
          <TouchableOpacity style={{height: PARALLAX_HEADER_HEIGHT}} onPress={() => {this.onImagePress()}}>
            <View key="parallax-header" style={ styles.parallaxHeader }>
              <Text style={ styles.sectionSpeakerText }>
                { this.state.geoLocationData.locality }, {this.state.geoLocationData.county}
              </Text>
              <Text style={ styles.sectionTitleText }>
                { this.state.geoLocationData.region }, { this.state.geoLocationData.country }
              </Text>
              <Text style={ styles.titleText } numberOfLines={3}>
                { this.state.photoData.title }
              </Text>
              <Text style={styles.titleBoldText}>
                taken on { this.state.photoInfo.taken }
              </Text>
              <Text style={styles.titleBoldText}>
                 by { this.state.photoInfo.username }
              </Text>
            </View>
          </TouchableOpacity>
        );
      }else{
        return(
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        );
      }
  }

  renderStickyHeaderContent(){
    if(this.hasEnoughData()){
      if(Platform.OS === 'ios'){
        return(
          <View>
            <View style={styles.stickySection}>
             <Text style={styles.stickySectionText}>{ this.state.geoLocationData.locality }</Text>
            </View>
          </View>
        )
        }else{
          return(
            <ToolbarAndroid
              titleColor='white'
              style={{backgroundColor: '#2A3132', height: 56}}
              title={this.state.geoLocationData.locality}
              navIcon={require('./empty24PNG.png')}
              onIconClicked={() => {}}
            />
          )
        }
    }else{
      return(
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
  }

  render() {
      const { onScroll = () => {} } = this.props;
      return (
        <View style={styles.container}>
            <ParallaxScrollView
              onScroll={onScroll}
              showsVerticalScrollIndicator={false}
              headerBackgroundColor="#333"
              stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
              parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
              backgroundSpeed={10}

              renderBackground={() => (
                  <View key="background">
                      { this.renderHeader() }
                      <View style={{position: 'absolute',
                                    top: 0,
                                    width: window.width,
                                    backgroundColor: 'rgba(0,0,0,.4)',
                                    height: PARALLAX_HEADER_HEIGHT}}/>
                  </View>
              )}

              renderForeground={() => this.renderForegroundContent()}

              renderStickyHeader={() => this.renderStickyHeaderContent()}

              renderFixedHeader={() => (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                      <View key="fixed-header-back" style={[styles.fixedSection, {flex: 1}]}>
                        <TouchableOpacity style={{width: 30}} onPress={(onPress) => {this.state.navigator.pop()}}>
                          <Image source={require('./left-arrow24.png')}  style={{ width: 24, height: 24}} />
                        </TouchableOpacity>
                      </View>
                      <View key="fixed-header-share" style={[styles.fixedSection, {flex: 12, alignItems:'flex-end', paddingRight: 20}]}>
                          <TouchableOpacity style={{width: 30}} onPress={()=>{Share.open({title: "React Native",
                              message: "Look this place I found on Photospot App!",
                              url: this.state.photoInfo.url,
                              subject: "I found this spot using Photospot App!",
                              title: "I found this spot using Photospot App!" })}}>
                          <Image source={require('./share.png')} style={{ width: 24, height: 24}} />
                          </TouchableOpacity>
                      </View>
                      <View key="fixed-header-flickr" style={[styles.fixedSection, {flex: 1, alignItems:'flex-end', paddingRight: 20}]}>
                          <TouchableOpacity style={{width: 30}} onPress={() => {this.onPressGoToWebsiteEvent(this.state.photoInfo.url)}}>
                              <Image source={require('./flickr48.png')} style={{ width: 24, height: 24}} />
                          </TouchableOpacity>
                      </View>
                  </View>
              )}>

              {this.renderLocationContent()}

              </ParallaxScrollView>
        </View>
      );
 }
}

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 300;
const AVATAR_SIZE = 90; //original: 120
const ROW_HEIGHT = 60;
const STICKY_HEADER_TEXT_TOP_MARGIN = Platform.OS === 'ios' ? 15 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    width: 100
  },
  directionsButtonView: {
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#2A3132',
    width: window.width,
    justifyContent: 'center',
    alignItems: 'center'
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
    right: -15
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
    paddingVertical: 5,
    textAlign: 'center'
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#BBB'
  },
  titleBoldText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#BBB',
    fontWeight: 'bold'
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

module.exports = PhotoDetail;
