// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_apiKey || 'AIzaSyDwfPz6dmK0gH_PJhSCpYolpVvZbChHZaQ',
  authDomain:
    process.env.REACT_APP_authDomain ||
    'volunteer-platform-87cd0.firebaseapp.com',
  databaseURL:
    process.env.REACT_APP_databaseURL ||
    'https://volunteer-platform-87cd0.firebaseio.com',
  projectId: process.env.REACT_APP_projectId || 'volunteer-platform-87cd0',
  storageBucket:
    process.env.REACT_APP_storageBucket ||
    'volunteer-platform-87cd0.appspot.com',
  messagingSenderId: process.env.REACT_APP_messagingSenderId || '365723598489',
  appId:
    process.env.REACT_APP_appId || '365723598489:web:2aebb2f4b4cd06c63cc208',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const store = firebase.firestore();

export default firebase;
