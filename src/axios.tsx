import axios from 'axios';

export const firebase = axios.create({
    baseURL: 'https://website-d1578.firebaseio.com',
});

export const personal = axios.create({
    baseURL: 'https://website-admin-6337d.firebaseio.com',
})

export const spotify_api = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 1000
});

export const spotify_accounts = axios.create({
    baseURL: 'https://accounts.spotify.com'
})