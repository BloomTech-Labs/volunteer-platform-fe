import React from "react";
import { Redirect, Route } from "react-router";
import { useStateValue } from "../hooks/useStateValue";
import Signup from "../views/Signup";

const ProtectedRoute = ( { component: Component, ...rest } ) => {
  const [ state ] = useStateValue();
  debugger;
  return ( <Route
    { ...rest }
    render={ props => {
      return !state.auth.loggedIn ||
      ( state.auth.loggedIn && state.auth.signedUp ) ?
        <Component { ...props }/> : <Redirect to={ "/signup" }/>;
    } }
  /> );
};

export default ProtectedRoute;