import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';


const LAST_LOGGED_IN_USERINFO_STORAGE_KEY = '@PhotospotLogin:lastLoggedInUserInfo';
import Routes from './config/routes';

export const AppNavigator = StackNavigator(Routes);

/*
 * Vamos extender o stackNavigator para conseguir implementar um componentWillMount que le dados do storage
 */
class PhotospotAppNavigator extends AppNavigator {

    componentWillMount(){
        if(searchUserInfoOnStorage){
            searchUserInfoOnStorage = false;
            AsyncStorage.getItem(LAST_LOGGED_IN_USERINFO_STORAGE_KEY, (error, userInfo) => {

                if (error || !userInfo) {
                    return;
                }

                let userInfoFromStorage = JSON.parse(userInfo.toString());
                this.props.setUserInfo(userInfoFromStorage);
                alert("Welcome " + userInfoFromStorage.user.name);

            });
        }
    }

}

const AppWithNavigationState = ({ dispatch, nav }) => (
    <PhotospotAppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

var searchUserInfoOnStorage = true;

function mapStateToProps (state) {
    return {
        nav: state.navReducer
    };
}

import { setUserInfo } from './redux-actions';

function actions (dispatch) {
    return {
        setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo))
    };
}

export default connect(mapStateToProps, actions)(PhotospotAppNavigator);