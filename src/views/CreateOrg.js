import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { StyledButton, StyledForm, StyledInput } from '../styled';
import { registerOrganization } from '../actions';
import { useStateValue } from '../hooks/useStateValue';

const CreateOrg = () => {
  
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
  const [ localState, setState ] = useState();
  const [ state, dispatch ] = useStateValue();
  
  useEffect( () => {
    if( state.auth.googleAuthUser ){
      setState( {
        ...localState, organizationOwnerUID: state.auth.googleAuthUser.uid,
      } );
    }
  }, [ state ] );
  
  const changeValue = e => {
    setState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    registerOrganization( localState, dispatch );
  };
  return ( <div>
    <StyledForm onSubmit={ handleSubmit }>
      <StyledInput name={ 'Organization Name' } values={ localState }
                   onChange={ changeValue }/>
      <StyledInput name={ 'Organization Type' } values={ localState }
                   onChange={ changeValue }/>
      <StyledInput name={ 'Mission Statement' }
                   values={ localState }
                   onChange={ changeValue }/>
      <StyledInput name={ 'About Us' }
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
  </div> );
};

export default CreateOrg;