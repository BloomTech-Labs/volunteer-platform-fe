import React from "react";
import { Redirect, Route } from "react-router";
import { useStateValue } from "../hooks/useStateValue";

const LoginRoute = ( { component: Component, ...rest } ) => {
  const [ state ] = useStateValue();
  
  return ( <Route
    { ...rest }
    render={ props => {
      return state.auth.loggedIn ? <Redirect to={ "/" }/> :
        <Component { ...props }/>;
    } }
  /> );
};

export default LoginRoute;