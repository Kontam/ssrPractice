import 'firebase/auth';
import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyDyn3UYXuaB-kfl2wS4amrug5EZVde-t2U",
    authDomain: "longo-ed4e7.firebaseapp.com",
    databaseURL: "https://longo-ed4e7.firebaseio.com",
    projectId: "longo-ed4e7",
    storageBucket: "longo-ed4e7.appspot.com",
    messagingSenderId: "805207857372",
    appId: "1:805207857372:web:dbae48e3b69e7122a1bc19"
};

firebase.initializeApp(config);

export default firebase;
