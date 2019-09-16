import { action } from "./action";
import firebase, { store } from "../firebase/FirebaseConfig";

/**
 * Register a new non profit organization.
 * @param {Organization} org - non profit to be registered
 * @param {Dispatch} dispatch
 */
export const registerOrganization = (org, dispatch) => {
	store.collection("organizations").add(org).then(res => {
	
	}).catch(err => {
		console.log(err);
	})
};