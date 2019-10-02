import React, {useEffect} from 'react';
import {useStateValue} from '../hooks/useStateValue';
import {StyledButton} from '../styled';
import {createNewMessageThread, getOrganizationByOrgId} from '../actions';

export const Organization = ({match, history}) => {
  
  const [{org, auth}, dispatch] = useStateValue();
  
  useEffect(() => {
    getOrganizationByOrgId(match.params.id, dispatch);
  }, [match.params.id]);
  
  const createMessageThread = () => {
    
    const from = {
      type: 'users',
      uid: auth.googleAuthUser.uid,
    };
    
    const to = {
      type: 'organizations',
      uid: org.organization.orgId,
    };
    
    createNewMessageThread(to, from);
    history.push('/messages');
  };
  
  return (
    <div>
      <h1>{org.organization.organizationName}</h1>
      <StyledButton onClick={createMessageThread}>Message</StyledButton>
    </div>
  );
};
