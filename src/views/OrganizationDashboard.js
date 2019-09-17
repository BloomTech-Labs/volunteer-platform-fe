import React, { useState, useEffect } from "react";
import { Select } from 'antd';
import { StyledLink, StyledButton } from '../styled';
import { signOut, getUsersOrganizations } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import OrganizationInfo from '../components/OrganizationInfo';

const OrganizationDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ displayOrg, setDisplayOrg ] = useState(null); 

  useEffect( () => {
    if( state.auth.googleAuthUser ){
      const uid = state.auth.googleAuthUser.uid;
      getUsersOrganizations(uid, dispatch);
    };
  }, [] );
  
  const changeHandler = value => {
    setDisplayOrg(state.org.organizations.find(item => item.organizationName === value))
  }

  useEffect( () => {
    if (state.org.organizations.length > 0) {
      setDisplayOrg(state.org.organizations[0]);
    }
  }, [state.org.organizations])

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
        {state.org.organizations.map(item => (
          <Select.Option key={item.organizationName} value={item.organizationName}>{item.organizationName}</Select.Option>
        ))}
      </Select>
      {displayOrg ? <OrganizationInfo org={displayOrg} /> : <div>You have not created any organization yet</div>}
    </div> 
  );
};

export default OrganizationDashboard;