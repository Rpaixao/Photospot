import * as ActionTypes from '../redux-actions';
import { List, Map } from 'immutable';

const initialState = Map({
    cards: List([]),
    isSearchLoading: false,
    // [TODO] Por isto dentro de settings
    filters: {},
    radius: 10
});

export default function cardsReducer (state = initialState, action = {}) {

    if (action.type === ActionTypes.GET_CARDS) {
        return state.withMutations((stateCtx) => {
            stateCtx.set('totalCards', action.totalCards);
            stateCtx.set('cards', action.cards);
        });
    }

    if (action.type === ActionTypes.GET_MORE_CARDS) {

        return state.withMutations((stateCtx) => {
            stateCtx.set('totalCards', action.totalCards);
            stateCtx.set('cards',  stateCtx.get('cards').concat(action.cards));
        });
    }

    if (action.type === ActionTypes.SET_FILTERS) {
        return state.withMutations((stateCtx) => {
            stateCtx.set('filters', action.filters);
        });
    }

    if (action.type === ActionTypes.SET_LOCATION) {
        return state.withMutations((stateCtx) => {
            stateCtx.set('latitude', action.lat);
            stateCtx.set('longitude', action.long);
        });
    }

    return state;
}
