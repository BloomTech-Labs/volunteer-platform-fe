import React, { useState, useEffect } from "react";
import { Select } from 'antd';
import { StyledLink, StyledButton } from '../styled';
import { signOut, getUsersOrganizations, getAllEventsByOrg } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import OrganizationInfo from '../components/OrganizationInfo';

const OrganizationDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ displayOrg, setDisplayOrg ] = useState(''); 

  useEffect( () => {
    if( state.auth.googleAuthUser ){
      const uid = state.auth.googleAuthUser.uid;
      getUsersOrganizations(uid, dispatch);
    };
    if (state.org.userOrganizations.length > 0) {
      setDisplayOrg(state.org.userOrganizations[0]);
      if (displayOrg) {
        getAllEventsByOrg(displayOrg.orgId, dispatch);
      }
    }
  }, [state.org.userOrganizations] );
  
  const changeHandler = value => {
    setDisplayOrg(state.org.userOrganizations.find(item => item.orgId === value))
  }

  return ( 
    <div>
      { !state.auth.loggedIn ? (
        <StyledLink to={ '/login' }>Login</StyledLink> 
      ) : (
        <>
          <StyledLink to={ '/' }>Main Dashboard</StyledLink> 
          <StyledLink to={ '/create-org' }>CreateOrganization</StyledLink>
          <StyledButton onClick={ () => signOut( dispatch ) }>Log out</StyledButton> 
        </> 
      )}
      <h1>Organization dashboard</h1>
        <Select defaultValue='select' onChange={changeHandler}>
          <Select.Option value='select' disabled>Select one</Select.Option>
          {state.org.userOrganizations.map(item => (
            <Select.Option key={item.orgId} value={item.orgId}>{item.organizationName}</Select.Option>
          ))}
        </Select>
        {displayOrg ? <OrganizationInfo org={displayOrg} /> : <div>You have not created any organization yet</div>}
        {state.events.events.length > 0 ? <EventList events={state.events.events}/> : <div>No event has been created</div>}
    </div> 
  );
};

export default OrganizationDashboard;