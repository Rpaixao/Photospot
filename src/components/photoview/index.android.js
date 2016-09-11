const React = require('react');

const  {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
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
          <TouchableOpacity onPress={this.onImagePress} style={styles.container} >
                <ResponsiveImage initWidth={windowWidth+30} initHeight={windowHeight+40} source={{uri: this.props.route.imageUri}}/>
          </TouchableOpacity>
      )
  }

});

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black'
}
});


module.exports = PhotoView;
