const React = require('react');

const  {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} = require('react-native');

const ImageZoom = require('react-native-image-zoom').default;

import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

var PhotoView = React.createClass({

  onImagePress() {
      this.props.navigator.pop();
  },

  render() {
      return(
          <TouchableOpacity onPress={this.onImagePress} style={styles.highlightTouchableContainer} >
            <ImageZoom
                  style={styles.container}
                  resizeMode={Image.resizeMode.contain}
                  source={{ uri: this.props.route.imageUri }} />
          </TouchableOpacity>
      )
  }

});

const styles = StyleSheet.create({
container: {
  flex: 1,
    backgroundColor: 'black'
},
highlightTouchableContainer: {
  flex: 1,
}
});


module.exports = PhotoView;
