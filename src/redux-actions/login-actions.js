
import {
    Alert
} from 'react-native';

export const SET_USERINFO = 'SET_USERINFO';

export function setUserInfo(userInfo){
    return function (dispatch){
        dispatch(
            {
                type: SET_USERINFO,
                userInfo
            }
        )
    }
};
