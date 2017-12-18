import { combineReducers } from "redux";
import cardsReducer from './cards-reducers';
import navReducer from './nav-reducers';

export default function getRootReducer() {
    return combineReducers({
        cardsReducer: cardsReducer,
        navReducer: navReducer
    });
}