import {action} from "./action";

export const SIGNED_IN = "SIGNED_IN";

/**
 * Sign a user in.
 *
 * @param user
 * @param dispatch
 */
export const signedIn = (user, dispatch) => {
  dispatch(action(SIGNED_IN, user));
};

export const SIGNED_OUT = "SIGNED_OUT";
export const signedOut = (dispatch) => {
  dispatch(action(SIGNED_OUT));
};