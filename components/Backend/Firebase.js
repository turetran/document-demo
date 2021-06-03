import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import { func } from 'prop-types';

var firebaseConfig = {
    apiKey: "AIzaSyCf2JsBatLtRm9XLlBcqdfUluLwq94si0M",
    authDomain: "kbase-15ce3.firebaseapp.com",
    databaseURL: "https://kbase-15ce3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kbase-15ce3",
    storageBucket: "kbase-15ce3.appspot.com",
    messagingSenderId: "348316659313",
    appId: "1:348316659313:web:311e013dd6de0e3524b5d0",
    measurementId: "G-VQSF0CEWGH"
  };

if( firebase.apps.length === 0 ){
    firebase.initializeApp(firebaseConfig);
}

export default  firebase;
