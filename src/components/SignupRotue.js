import React from "react";
import { Redirect, Route } from "react-router";
import { useStateValue } from "../hooks/useStateValue";

const SignupRoute = ( { component: Component, ...rest } ) => {
  const [ state ] = useStateValue();
  debugger;
  return ( <Route
    { ...rest }
    render={ props => {
      return state.auth.signedUp ? <Redirect to={ "/" }/> :
        <Component { ...props }/>;
    } }
  /> );
};

export default SignupRoute;