// firebase.js
import firebase from "firebase/app";
import "firebase/database";

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const firebaseconfig = {
    apiKey: "AIzaSyC9_ifzps_1DQ-2zArCIMANCwx8JWPuJWU",
    authDomain: "lucy-2b3db.firebaseapp.com",
    databaseURL: "https://lucy-2b3db.firebaseio.com",
    projectId: "lucy-2b3db",
    storageBucket: "lucy-2b3db.appspot.com",
    messagingSenderId: "1067313877074",
    appId: "1:1067313877074:web:cd0841155b5fe30c584f8b",
};

firebase.initializeApp(firebaseconfig);

// this exports the CONFIGURED version of firebase
export default firebase;
