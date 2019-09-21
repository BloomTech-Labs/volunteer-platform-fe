import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import {
  StyledButton, StyledCard, StyledForm, StyledInput, StyledSelect,
} from '../styled';
import { registerOrganization, updateOrganization } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import { StyledTextArea, StyledTimePicker } from '../styled';
import { message, Select, Checkbox } from 'antd';
import styled from 'styled-components';
import CreatePOCFormList from '../components/CreatePOCFormList';
import uuid4 from 'uuid4';

export const CreateOrg = ( props ) => {
  const { Option } = Select;
  
  const org = {
    organizationOwnerUID: '',
    organizationName: '',
    city: '',
    state: '',
    phone: '',
    pointOfContact: [ { firstName: '', lastName: '', email: '', id: uuid4() } ],
    causeAreas: [],
    hoursOfOperations: {
      days: [], startTime: '', endTime: '',
    },
    aboutUs: '',
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
  
  console.log( localState );
  
  const changePOC = ( id, e ) => {
    
    const pocs = localState.pointOfContact.map( poc => {
      if( poc.id === id ){
        poc[ e.target.name ] = e.target.value;
      }
      return poc;
    } );
    
    setState( {
      ...localState, pointOfContact: pocs,
    } );
  };
  
  const addPOC = () => {
    setState( {
      ...localState, pointOfContact: [
        ...localState.pointOfContact,
        { firstName: '', lastName: '', email: '', id: uuid4() },
      ],
    } );
  };
  
  const changeDays = e => {
    setState( {
      ...localState, hoursOfOperations: {
        ...localState.hoursOfOperations, days: e,
      },
    } );
  };
  
  const changeStartTime = ( time, timeString ) => {
    setState( {
      ...localState, hoursOfOperations: {
        ...localState.hoursOfOperations, startTime: timeString,
      },
    } );
  };
  
  const changeEndTime = ( time, timeString ) => {
    setState( {
      ...localState, hoursOfOperations: {
        ...localState.hoursOfOperations, endTime: timeString,
      },
    } );
  };
  
  const validateForm = () => {
    debugger;
    if( !localState.organizationName ){
      return false;
    }
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    if( validateForm() ){
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
    }else{
      message.error( 'Name of organization is required' );
    }
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
  
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday',
  ];
  
  return ( <StyledCreateOrg>
    <StyledCard>
      <h1>{ props.location.state ? 'Update organization info' :
        'Let\'s set up your organization' }</h1>
      <StyledForm onSubmit={ handleSubmit }>
        <StyledInput label={ 'Name of Organization*' }
                     name={ 'Organization Name' }
                     values={ localState }
                     onChange={ changeValue }/>
        <StyledSelect label={ 'Type of Cause' }
                      name={ 'Cause Areas' }
                      value={ localState.causeAreas }
                      mode='multiple' onChange={ changeCauses }
                      tooltipTitle={ 'Choose all that apply' }>
          { state.tags.causeAreas.map( ( item, index ) => <Option
            key={ `causeArea${ index }` }
            value={ item }>{ item }</Option> ) }
        </StyledSelect>
        <StyledInput name={ 'City' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'State' } values={ localState }
                     onChange={ changeValue }/>
        <StyledInput name={ 'Phone' } values={ localState }
                     onChange={ changeValue }/>
        <h3>Who is the point of contact?</h3>
        <CreatePOCFormList changePOC={ changePOC } addPOC={ addPOC }
                           pointOfContacts={ localState.pointOfContact }/>
        
        <h3>What are your hours of operation?</h3>
        <h5>Days of the week</h5>
        <Checkbox.Group options={ days } onChange={ changeDays }/>
        <h5>What time?</h5>
        <StyledTimePicker
          name={ 'Start Time' }
          defaultOpenValue={ moment( '00:00', 'hh:mm' ) }
          onChange={ changeStartTime }
          use12Hours
          format={ 'h:mm a' }
          type="time"
        /> to
        <StyledTimePicker
          name={ 'End Time' }
          defaultOpenValue={ moment( '00:00', 'hh:mm' ) }
          onChange={ changeEndTime }
          use12Hours
          format={ 'h:mm a' }
          type="time"
        />
        <StyledTextArea name={ 'About Us' }
                        values={ localState }
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
