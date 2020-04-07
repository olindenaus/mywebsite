import { spotify_api, firebase } from '../../axios';
import * as actionTypes from './actionTypes';

export const fetchSongsStart = () => {
    return {
        type: actionTypes.FETCH_SONG_START
    }
}

export const fetchSongsSuccess = (data: any) => {
    return {
        type: actionTypes.FETCH_SONG_SUCCESS,
        data: data
    }
}

export const fetchSongsFail = (error: any) => {
    return {
        type: actionTypes.FETCH_SONG_FAIL,
        error: error
    }
}

export const fetchSongs = () => {
    return (dispatch: any) => {
        dispatch(fetchSongsStart());
        firebase.get('songs.json') //?orderBy="$key"
            .then(res => {
                dispatch(fetchSongsSuccess(res.data));
            })
            .catch(err => {
                console.log("----->>>>>Error: ", err.response);
                dispatch(fetchSongsFail(err.response));
            })
    }
}