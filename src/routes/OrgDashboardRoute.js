import React from 'react';
import { Redirect, Route } from 'react-router';
import { useStateValue } from '../hooks/useStateValue';

const OrganizationRoute = ( { component: Component, ...rest } ) => {
  const [ state ] = useStateValue();
  
  return ( <Route
    { ...rest }
    render={ props => {
      return ( state.auth.loggedIn && state.org.createdOrg ) ?
        <Component { ...props }/> : <Redirect to={ '/' }/>;
    } }
  /> );
};

export default OrganizationRoute;