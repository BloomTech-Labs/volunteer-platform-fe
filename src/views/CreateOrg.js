import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { StyledButton, StyledCard, StyledForm, StyledInput } from '../styled';
import { registerOrganization } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import { AreaText } from '../styled/StyledTextArea';
import styled from 'styled-components';

const CreateOrg = (props) => {
  const org = {
    organizationOwnerUID: '',
    organizationName: '',
    organizationType: '',
    missionStatement: '',
    aboutUs: '',
    city: '',
    state: '',
    email: '',
    phone: '',
    socialMedia: [],
    website: '',
  };
  const [localState, setState] = useState();
  const [state, dispatch] = useStateValue();
  
  useEffect(() => {
    if (state.auth.googleAuthUser) {
      setState({
        ...localState,
        organizationOwnerUID: state.auth.googleAuthUser.uid,
      });
    }
  }, [ state ] );
  
  const changeValue = e => {
    setState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    registerOrganization(localState, dispatch);
    props.history.push('/org-dashboard')
  };
  return ( <StyledCreateOrg>
    <StyledCard>
      <h1>Create new organization!!</h1>
      <StyledForm onSubmit={ handleSubmit }>
        <StyledInput name={ 'Organization Name' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'Organization Type' } values={ localState }
                     onChange={ changeValue }/>
        <AreaText name={ 'Mission Statement' }
                  values={ localState }
                  onChange={ changeValue }/>
        <AreaText name={ 'About Us' }
                  values={ localState }
                  onChange={ changeValue }/>
        <StyledInput name={ 'City' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'State' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'Email' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'Phone' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'Website' } values={ localState }
                     onChange={ changeValue }/>
        
        <StyledButton type="primary" htmlType="submit">
          Register
        </StyledButton>
      </StyledForm>
    </StyledCard>
  </StyledCreateOrg> );
};

const StyledCreateOrg = styled.div`
display: flex;
justify-content: center;
<<<<<<< HEAD
`

=======
`;
>>>>>>> staging
export default CreateOrg;
