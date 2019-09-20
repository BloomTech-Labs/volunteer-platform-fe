import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import {
  StyledButton, StyledCard, StyledForm, StyledInput, StyledSelect,
} from '../styled';
import { registerOrganization, updateOrganization } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import { StyledTextArea } from '../styled/StyledTextArea';
import { Select, Icon, Tooltip } from 'antd';
import styled from 'styled-components';
import UploadImage from '../components/UploadImage';

export const CreateOrg = ( props ) => {
  const { Option } = Select;
  
  const org = {
    organizationOwnerUID: '',
    organizationName: '',
    causeAreas: [],
    aboutUs: '',
    city: '',
    state: '',
    email: '',
    phone: '',
    socialMedia: [],
    website: '',
  };
  const [ localState, setState ] = useState( org );
  const [ state, dispatch ] = useStateValue();
  
  useEffect( () => {
    if( state.auth.googleAuthUser ){
      setState( {
        ...localState, organizationOwnerUID: state.auth.googleAuthUser.uid,
      } );
    }
  }, [ state ] );
  
  useEffect( () => {
    if( props.location.state ){
      setState( props.location.state.org );
    }
    
  }, [ props.location.state ] );
  
  const changeValue = e => {
    setState( { ...localState, [ e.target.name ]: e.target.value } );
  };
  
  const changeCauses = e => {
    setState( {
      ...localState, causeAreas: e,
    } );
  };
  
  console.log( state.tags.causeAreas );
  
  const handleSubmit = e => {
    e.preventDefault();
    if( props.location.state ){
      updateOrganization( props.location.state.org.orgId,
        localState,
        dispatch,
      );
      props.history.push( '/org-dashboard' );
    }else{
      registerOrganization( localState, dispatch );
      props.history.push( '/org-dashboard' );
    }
    setState( org );
  };
  
  const cancel = e => {
    e.preventDefault();
    setState( org );
    if( props.location.state ){
      props.history.push( '/org-dashboard' );
    }else{
      props.history.push( '/' );
    }
  };
  
  const onFileUpload = ( path ) => {
    debugger;
    setState( { ...localState, imagePath: path } );
  };
  
  return ( <StyledCreateOrg>
    <StyledCard>
      <UploadImage fileUploadComplete={ onFileUpload }/>
      <h1>{ props.location.state ? 'Update organization info' :
        'Create new organization!!' }</h1>
      <StyledForm onSubmit={ handleSubmit }>
        <StyledInput name={ 'Organization Name' } values={ localState }
                     onChange={ changeValue }/>
        <StyledSelect name={ 'Cause Areas' } value={ localState.causeAreas }
                      mode='multiple' onChange={ changeCauses }
                      tooltipTitle={ 'Choose all that apply' }>
          { state.tags.causeAreas.map( ( item, index ) => <Option
            key={ `causeArea${ index }` }
            value={ item }>{ item }</Option> ) }
        </StyledSelect>
        <StyledTextArea name={ 'About Us' }
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
          { props.location.state ? 'Update' : 'Register' }
        </StyledButton>
        <StyledButton type="danger" onClick={ cancel }>
          Cancel
        </StyledButton>
      </StyledForm>
    </StyledCard>
  </StyledCreateOrg> );
};

const StyledCreateOrg = styled.div`
display: flex;
justify-content: center;
`;
export default withRouter( CreateOrg );
