const React = require('react');

const  {
    Platform,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} = require('react-native');

var ResponsiveImage = require('react-native-responsive-image');
import PhotoView from 'react-native-photo-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import Dimensions from 'Dimensions';
let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

var PhotoFullScreenView = React.createClass({

    onImagePress() {
        this.props.navigator.pop();
    },

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <View key="fixed-header-back" style={[styles.fixedSection, {flex: 1, alignItems:'flex-start'}]}>
                    <TouchableOpacity style={{width: 30}} onPress={(onPress) => {this.props.navigator.pop()}}>
                        <Icon name="times" size={32} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 9}}>
                    <PhotoView
                        source={{uri: this.props.route.imageUri}}
                        minimumZoomScale={0.5}
                        maximumZoomScale={3}
                        androidScaleType="center"
                        onLoad={() => console.log("Image loaded!")}
                        style={{width: windowWidth, height: 400}} />
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
        ...Platform.select({
            ios: {
                bottom: -35
            },
            android: {
                bottom: -40
            },
        }),
        right: -10
    },
});


module.exports = PhotoFullScreenView;
