import { action } from './action';
import firebase, { store } from '../firebase/FirebaseConfig';

export const CREATE_EVENT = "CREATE_EVENT";

export const createEvent = (event, dispatch) => {
  store.collection("events").add()
};
