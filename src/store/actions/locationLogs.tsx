import { personal } from '../../axios';
import * as actionTypes from './actionTypes';

export const fetchLocationsStart = () => {
    return {
        type: actionTypes.FETCH_LOCATIONS_START
    }
}

export const fetchLocationsSuccess = (locations: any) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_SUCCESS,
        locations: locations
    }
}

export const fetchLocationsFail = (error: any) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAIL,
        error: error
    }
}

export const fetchLocations = () => {
    return (dispatch: any) => {
        dispatch(fetchLocationsStart());
        personal.get('locationLogs.json')
        .then(res => {
            dispatch(fetchLocationsSuccess(res.data));         
        })
        .catch(err => {
            dispatch(fetchLocationsFail(err.response.data.error));
        })
    }
}

const fetchCountryStart = () => {
    return {
        type: actionTypes.FETCH_COUNTRY_START
    }
}

const fetchCountryFail = (error: any) => {
    return {
        type: actionTypes.FETCH_COUNTRY_FAIL,
        error: error
    }
}

const fetchCountrySuccess = (res: any) => {
    return {
        type: actionTypes.FETCH_COUNTRY_SUCCESS,
        data: res.data
    }
}

export const fetchCountryInfo = () => {
    return (dispatch: any) => {
        dispatch(fetchCountryStart());
        personal.get('locationLogs.json?orderBy="$key"&limitToLast=1')
        .then(res => {
            dispatch(fetchCountrySuccess(res));
        })
        .catch(err => {
            dispatch(fetchCountryFail(err.response.data.error));
        })
    }
}