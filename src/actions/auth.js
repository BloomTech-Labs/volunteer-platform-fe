import React from "react";
import { action } from "./action";

export const SIGNED_IN = "SIGNED_IN";

/**
 * Sign a user in.
 *
 * @param {Object} user
 * @param {Function} dispatch
 */
export const signedIn = ( user, dispatch ) => {
  dispatch( action( SIGNED_IN, user ) );
};

export const SIGNED_OUT = "SIGNED_OUT";

/**
 * Sign a user out.
 *
 * @param {Function} dispatch
 */
export const signedOut = ( dispatch ) => {
  dispatch( action( SIGNED_OUT ) );
};