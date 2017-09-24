import ApiRestService from "../services/api-rest-service";
import PhotospotState from "../state/PhotospotState";


import {
    Alert
} from 'react-native';

export const GET_CARDS = 'GET_CARDS';
export const GET_MORE_CARDS = 'GET_MORE_CARDS';
export const SET_FILTERS = 'SET_FILTERS';
export const SET_LOCATION = 'SET_LOCATION';

export function resetCards () {
    return function (dispatch) {
        dispatch(getCardsHandleResponse(-1, []));
    }
}


export function getCards (filters = null, lat = 0, long = 0, currentPage = 1) {

    let filterString = filters ? PhotospotState.getFiltersString(filters) : "";

    return function (dispatch) {
        ApiRestService.fetchPhotos(lat, long, filterString, 10, currentPage)
            .then((serverResponse) => {
                if(currentPage == 1){
                    dispatch(getCardsHandleResponse(serverResponse.length, serverResponse));
                }else {
                    dispatch(getMoreCardsHandleResponse(serverResponse.length, serverResponse));
                }

            })
            .catch((errorObject) => {
                Alert.alert(
                    'Oh, there is a problem. Please try again',
                    errorObject,
                    [ {text: 'Ok'} ]
                );
            });
    };
}

export function setFilters(filters){
    return function (dispatch){
        dispatch(
            {
                type: SET_FILTERS,
                filters
            }
        )
    }
};

export function setCurrentLocation(latitude, longitude, onFinishCallback){
    if(latitude || longitude){
        return function (dispatch) {
            dispatch(setCurrentLocationHandleResponse(latitude, longitude));
            onFinishCallback && onFinishCallback(setCurrentLocationHandleResponse(latitude, longitude));
        }
    }else {
        return function (dispatch){
            return navigator.geolocation.getCurrentPosition(
                (position) => {
                    var currentLatitude = position.coords.latitude;
                    var currentLongitude = position.coords.longitude;
                    dispatch(setCurrentLocationHandleResponse(currentLatitude, currentLongitude));
                    onFinishCallback && onFinishCallback(setCurrentLocationHandleResponse(currentLatitude, currentLongitude));
                },
                (error) => {
                    console.log("Erro while getting your location: " + error.message);
                    onFinishCallback && onFinishCallback(setCurrentLocationHandleError());
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
        }
    }
};

export function getCardsHandleResponse (totalCards = -1, cards = []) {
    return {
        type: GET_CARDS,
        totalCards,
        cards
    };
}

export function getMoreCardsHandleResponse (totalCards = -1, cards = []) {
    return {
        type: GET_MORE_CARDS,
        totalCards,
        cards
    };
}

export function setCurrentLocationHandleResponse (lat, long) {
    return(
            {
                type: SET_LOCATION,
                lat,
                long
            }
    )
}

export function setCurrentLocationHandleError () {
    return(
    {
        type: SET_LOCATION,
        lat: null,
        long: null
    }
    )
}