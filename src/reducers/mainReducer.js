import {authReducer} from "./authReducer";

export const mainReducer = ( {auth}, action ) => ( {
  auth: authReducer(auth, action),
} );


