import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

interface IImage {
    width: number,
    height: number,
    url: string
}

export interface ISong {
    previewUrl: string,
    name: string,
    duration: number,
    artist: string,
    images: { biggest: IImage, medium: IImage, small: IImage }
}

const initialState = {
    error: '',
    loading: false,
    fetchedSongs: []
};

const fetchSongsFail = (state: any, error: any) => {
    console.log('[SPOTIFY REDUCER] fetch song fail', error)
    return updateObject(state, { error: error, loading: false })
}

const fetchSongsStart = (state: any) => {
    console.log('[SPOTIFY REDUCER] fetch song start')
    return updateObject(state, {loading: true});
}

const fetchSongsSuccess = (state: any, data: any) => {
    console.log('[SPOTIFY REDUCER] fetch song success', data);
    return updateObject(state, { fetchedSongs: data, loading: false });
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {       
        case actionTypes.FETCH_SONG_START:
            return fetchSongsStart(state);
        case actionTypes.FETCH_SONG_SUCCESS:
            return fetchSongsSuccess(state, action.data);
        case actionTypes.FETCH_SONG_FAIL:
            return fetchSongsFail(state, action.error);
        default:
            return state;
    }
}

export default reducer;