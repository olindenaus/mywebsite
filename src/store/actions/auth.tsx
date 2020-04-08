import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token: string, userId: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error: any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('firebase_token');
    localStorage.removeItem('firebase_expirationTime');
    localStorage.removeItem('firebase_userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.FIREBASE_KEY, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('firebase_token', response.data.idToken);
                localStorage.setItem('firebase_expirationDate', expirationDate.getTime().toString());
                localStorage.setItem('firebase_userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};

export const authCheckState = () => {
    return (dispatch: any) => {
        const firebaseToken = localStorage.getItem('firebase_token');
        if (!firebaseToken) {
            dispatch(logout());
        } else {
            const expirationTime = localStorage.getItem('firebase_expirationDate') as string;
            if (expirationTime > new Date().getTime().toString()) {
                const userId = localStorage.getItem("firebase_userId") as string;
                dispatch(authSuccess(firebaseToken, userId));
                dispatch(checkAuthTimeout((Number.parseInt(expirationTime) - new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }
        }
    }
}