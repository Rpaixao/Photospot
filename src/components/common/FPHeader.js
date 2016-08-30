const React = require('react');

const  {
    View,
    Text,
    ToolbarAndroid,
    StyleSheet
} = require('react-native');

class FPDistrictPicker extends React.Component {


    render() {

        return(
            <View style={styles.toolbarContainer}>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: BarcampColors.backgroundDarkColor
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  }
});

module.exports = FPDistrictPicker;
