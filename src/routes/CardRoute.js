import React from "react";
import { Redirect, Route } from "react-router";
import { useStateValue } from "../hooks/useStateValue";

export const CardRoute = ( { component: Component, ...rest } ) => {
  
  return ( <Route
    { ...rest }
    render={ props => {
        return (<Redirect to={ "/eventcard" }/> && <Component { ...props }/>)
    }}
    /> );
};

export default CardRoute;