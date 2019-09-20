// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_apiKey || 'AIzaSyCak5UocLSUJaNkssFNXgEmLJBy-DLfeiw',
  authDomain:
    process.env.REACT_APP_authDomain ||
    'volunteer-platform-staging.firebaseapp.com',
  databaseURL:
    process.env.REACT_APP_databaseURL ||
    'https://volunteer-platform-staging.firebaseio.com',
  projectId: process.env.REACT_APP_projectId || 'volunteer-platform-staging',
  storageBucket:
    process.env.REACT_APP_storageBucket ||
    'volunteer-platform-staging.appspot.com',
  messagingSenderId: process.env.REACT_APP_messagingSenderId || '826760951967',
  appId:
    process.env.REACT_APP_appId || '1:826760951967:web:225a210952c9df46df4aaa',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const store = firebase.firestore();

export default firebase;
