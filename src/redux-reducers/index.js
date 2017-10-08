import { combineReducers } from "redux";
import cardsReducer from './cards-reducers';
import loginReducer from './login-reducers';
import navReducer from './nav-reducers';

export default function getRootReducer() {
    return combineReducers({
        cardsReducer: cardsReducer,
        loginReducer: loginReducer,
        navReducer: navReducer
    });
}