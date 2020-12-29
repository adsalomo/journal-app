import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAyWpy7f6-BxCRUgV3TObtkF8hgVXDhsm8",
    authDomain: "react-app-course-62106.firebaseapp.com",
    projectId: "react-app-course-62106",
    storageBucket: "react-app-course-62106.appspot.com",
    messagingSenderId: "195222583000",
    appId: "1:195222583000:web:61cd084605545055b409ad"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvide = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvide,
    firebase,
}