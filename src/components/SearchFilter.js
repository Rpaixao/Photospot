import React, { Component } from 'react';
import { StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { View, Text } from 'native-base';
import SearchBar from 'react-native-searchbar';
import restApi from '../services/api-rest-service';

class SearchFilter extends Component {

    /**
     * Constructor
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            results: [],
            searchBarIsOpen: true
        };
        this._handleResults = this._handleResults.bind(this);
        this._handleAutoCompletePress = this._handleAutoCompletePress.bind(this);
    }

    /**
     * Get all hints from a rest a service
     *
     */
    componentWillMount(){
        this.setState({items: restApi.fetchSearchHints()});
    }

    /**
     * Filter hints based on user search
     *
     * @param results
     * @private
     */
    _handleResults(results) {
        this.setState({ results: results, searchBarIsOpen: true });
    }

    /**
     * Handle user choice
     *
     * @private
     */
    _handleAutoCompletePress() {
        this.setState({searchBarIsOpen: false});
    }

    /**
     * Render view
     *
     * @returns {XML}
     */
    render() {
        return (
            <View>
                {this.renderResults()}
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={this.state.items}
                    handleResults={this._handleResults}
                    showOnLoad/>
            </View>

        );
    }

    /**
     * If user are search, the app will show the results
     *
     * @returns {XML}
     */
    renderResults(){
        if(this.state.searchBarIsOpen){
            return (
                <ScrollView style={{ marginTop: 60, backgroundColor:'#fff'}}>
                    {
                        this.state.results.map((result, i) => {
                            return (

                                <TouchableHighlight key={i} underlayColor="#ddd" onPress={this._handleAutoCompletePress}>
                                    <Text style={{borderBottomWidth:1, borderBottomColor: '#ccc', padding:20,fontSize:18,color:'#aaa'}}>{result.hint.toString()}</Text>
                                </TouchableHighlight>
                            );
                        })
                    }
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
});

export default SearchFilter;