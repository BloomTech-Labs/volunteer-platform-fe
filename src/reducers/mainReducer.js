import {authReducer} from "./authReducer";
import {orgReducer} from './orgReducer';


export const mainReducer = ( {auth, org}, action ) => ( {
  auth: authReducer(auth, action),
  org: orgReducer(org, action)
} );


