import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View, Image, ActivityIndicator, Colors } from 'react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';

export default class App extends React.Component {

    static navigationOptions = {
        title: 'Find Places',
    };

    state = {
        modalVisible: true,
        geoCoordinatesLoaded: false,
        currentImageID: 1,
        currentImageURL: 'https://c1.staticflickr.com/1/449/19203047008_a45cb7c7e8_k.jpg',
        currentImageTitle: 'Sunset @ Ribatejo',
        currentImageInfo: 'by ruben.npaixao on 2017-04-10'
    }

    setModalVisible = this.setModalVisible.bind(this);
    setModalVisible(visible = false) {
        this.setState({modalVisible: visible});
    }

    setGeoCoordinates = this.setGeoCoordinates.bind(this);
    setGeoCoordinates() {
        this.setState({geoCoordinatesLoaded: true});
    }

    nextImage = this.nextImage.bind(this);
    nextImage(){

        if(this.state.currentImageID === 1){
            this.setState({
                currentImageID: 2,
                currentImageURL: 'https://c1.staticflickr.com/9/8779/17190862746_8cb1b85d89_k.jpg',
                currentImageTitle: 'Tree @ Monsaraz',
                currentImageInfo: 'by bryan-photography on 2017-04-14'
            });
        }else if(this.state.currentImageID === 2) {
            this.setState({
                currentImageID: 3,
                currentImageURL: 'https://c1.staticflickr.com/8/7224/27035347343_ba4ebca36e_k.jpg',
                currentImageTitle: 'Ilha do Pessegueiro @ Porto Covo',
                currentImageInfo: 'by ruben.npaixao on 2016-05-13'
            });
        } else if(this.state.currentImageID === 3) {
            this.setState({
                currentImageID: 4,
                currentImageURL: 'https://c1.staticflickr.com/8/7649/16607755393_7dd080e782_k.jpg',
                currentImageTitle: 'Cromeleque dos Almendres @ Évora, Portugal',
                currentImageInfo: 'by ruben.npaixao on 2016-05-13'
            });
        } else {
            this.setState({
                currentImageID: 1,
                currentImageURL: 'https://c1.staticflickr.com/1/449/19203047008_a45cb7c7e8_k.jpg',
                currentImageTitle: 'Sunset @ Évora',
                currentImageInfo: 'by ruben.npaixao on 2017-04-10'
            });
        }

    }

    renderStatusIndicator(){
        if(!this.state.geoCoordinatesLoaded){
            return (
                <ActivityIndicator size="large" style={styles.activityIndicator}/>
            )
        } else {
            return (
                <View style={styles.activityIndicator}>
                    <IconIonic name={'md-done-all'} size={40} color='#333'/>
                </View>
            )
        }
    }

    render() {

        setTimeout( () => this.setGeoCoordinates() , 2000);
        setTimeout( () => this.setModalVisible(false) , 2500);

        return (
            <Image source={{uri:this.state.currentImageURL}} style={styles.backgroundImage} >

                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>{this.state.currentImageTitle}</Text>
                        <Text style={styles.text}>{this.state.currentImageInfo}</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={styles.navigateButtonAndroidStyle} onPress={() => alert("Open Maps")}>
                            <IconIonic name={'md-navigate'} size={40} color='white'/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextButtonAndroidStyle} onPress={this.nextImage}>
                            <IconIonic name={'md-close'} size={40} color='white'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.")
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View>

                            <Text style={styles.modalTitle}> We are trying to find you...</Text>

                            { this.renderStatusIndicator() }

                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={styles.text}>Set geo coordinates manually</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>

            </Image>
        );
    }
}

let styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 52,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    modalTitle: {
        fontSize: 52,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#222'
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#888'
    },
    activityIndicator : {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    topContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor:'rgba(0,0,0,0)'
    },
    bottomContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextButtonAndroidStyle: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 60,
        backgroundColor:'#e00202'
    },
    navigateButtonAndroidStyle: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 60,
        backgroundColor:'#11512f'
    }
});
