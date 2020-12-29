import { types } from '../types/types';
import { firebase, googleAuthProvide } from '../firebase/firebase-config';
import { uiFinishLoading, uiStartLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(uiStartLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(uiFinishLoading());

                dispatch(login(user.uid, user.displayName));
            }, e => {
                dispatch(uiFinishLoading());
                console.log(e);
            });

    }
}

export const startRegister = (name, email, password) => {
    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            }, e => {
                console.log(e);
            });

    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvide)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            }, e => {
                console.log(e);
            });

    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName,
        }
    }
}