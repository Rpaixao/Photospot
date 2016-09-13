const React = require('react');

const  {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    Image
} = require('react-native');

var ResponsiveImage = require('react-native-responsive-image');
import Icon from 'react-native-vector-icons/FontAwesome';

import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

import ImageZoom from 'react-native-image-zoom'

var PhotoView = React.createClass({

  onImagePress() {
      this.props.navigator.pop();
  },

  render() {
      return(
      <View style={{flex: 1, backgroundColor: 'black'}}>
          <View key="fixed-header-back" style={[styles.fixedSection, {flex: 1, alignItems:'flex-end'}]}>
              <TouchableOpacity style={{width: 30}} onPress={(onPress) => {this.props.navigator.pop()}}>
                  <Icon name="times" size={32} color="white" />
              </TouchableOpacity>
          </View>
          <View style={{flex: 9}}>
              <ImageZoom style={styles.container}
                         resizeMode={Image.resizeMode.contain}
                         source={{ uri: this.props.route.imageUri }}/>
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
