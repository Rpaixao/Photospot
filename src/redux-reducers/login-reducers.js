import * as ActionTypes from '../redux-actions';
import { Map } from 'immutable';
import LoginTypes from '../login-utils/login-types-enum'

const initialState = Map({
    userInfo: {
        isLoggedIn: false,
        loginType: undefined,
        username: undefined,
        firstName: undefined,
        lastName: undefined,
        link: undefined,
        userID: undefined,
        email: undefined,
        accessToken: undefined,
    }
});

export default function cardsReducer (state = initialState, action = {}) {

    if (action.type === ActionTypes.SET_USERINFO) {
        return state.withMutations((stateCtx) => {

            let userInfo = {
                isLoggedIn: true,
                loginType: LoginTypes.FACEBOOK,
                username: action.userInfo.user.name,
                firstName: action.userInfo.user.first_name,
                lastName: action.userInfo.user.last_name,
                link: action.userInfo.user.link,
                userID: action.userInfo.user.id,
                email: action.userInfo.user.email,
                accessToken: action.userInfo.credentials.access_token,

            }

            stateCtx.set('userInfo', userInfo);
        });
    }

    return state;
}
