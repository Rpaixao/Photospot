const React = require('react');

const  {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} = require('react-native');

var ResponsiveImage = require('react-native-responsive-image');

import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

var PhotoView = React.createClass({

  onImagePress() {
      this.props.navigator.pop();
  },

  render() {
      return(
      <View style={{flex: 1, backgroundColor: 'black'}}>
          <View key="fixed-header-back" style={[styles.fixedSection, {flex: 1, alignItems:'flex-end'}]}>
              <TouchableOpacity style={{width: 30}} onPress={(onPress) => {this.props.navigator.pop()}}>
                  <Image source={require('./cross.png')}  style={{ width: 24, height: 24}} />
              </TouchableOpacity>
          </View>
          <View style={{flex: 9, alignItems:'center', justifyContent:'center'}}>
              <ResponsiveImage initWidth={windowWidth} initHeight={400} source={{uri: this.props.route.imageUri}}/>
          </View>
      </View>
      )
  }

});

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black'
},
    fixedSection: {

    bottom: -10,
        right: 15
    },
});


module.exports = PhotoView;
