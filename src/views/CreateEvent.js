import React, { useState, useEffect } from 'react';
import {
  StyledButton, StyledForm, StyledInput, StyledTag, StyledDatePicker,
  StyledNumber, StyledTimePicker,
} from '../styled';
import { Tag, Tooltip, Icon, message } from 'antd';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent } from '../actions';

const CreateEvent = props => {
  const [ localState, setState ] = useState( {
    event: {
      tags: [ 'Add a tag' ],
    }, inputVisible: false, inputValue: '',
  } );
  
  const [ state, dispatch ] = useStateValue();
  
  //Destructuring
  let { event, inputVisible, inputValue } = localState;
  
  useEffect( () => {
    if( props.location.state.org ){
      setState( {
        ...localState, event: {
          ...event, orgId: props.location.state.org.orgId,
        },
      } );
    }
  }, [ props.location.state.org ] );
  
  console.log( localState.event.orgId );
  
  //Date Format
  const dateFormat = 'MM/DD/YYYY';
  
  const changeValue = e => {
    setState( {
      ...localState, event: {
        ...event, [ e.target.name ]: e.target.value,
      },
    } );
  };
  
  //Handle DatePicker
  const handleDatePicker = datestring => {
    setState( {
      ...localState, event: {
        ...event, date: datestring,
      },
    } );
  };
  
  //Handle Time
  const handleStartTime = ( _time, timeObject ) => {
    console.log( timeObject );
    setState( {
      ...localState, event: {
        ...event, startTime: timeObject,
      },
    } );
  };
  
  const handleEndTime = ( _time, timeObject ) => {
    console.log( timeObject );
    setState( {
      ...localState, event: {
        ...event, endTime: timeObject,
      },
    } );
  };
  
  //Handle Submit for Form
  const handleSubmit = e => {
    debugger;
    e.preventDefault();
    localState.event.date = localState.event.date.unix();
    if( isFormValid() ){
      createEvent( localState.event, dispatch );
    }
  };
  
  //Handles Tags Opening/Closing
  const handleClose = removedTag => {
    const tags = event.tags.filter( tag => tag !== removedTag );
    setState( { tags } );
  };
  
  //Shows Input on Tag
  const showInput = () => {
    setState( {
      ...localState, inputVisible: true,
    } );
  };
  
  //Handles Tag Input Change
  const handleInputChange = e => {
    setState( {
      ...localState, inputValue: e.target.value,
    } );
  };
  
  //Handles Tag Submitt
  const handleInputSubmit = () => {
    if( event.tags.includes( inputValue ) ){
      message.error( 'Please enter a different tag name...' );
    }
    if( inputValue && event.tags.indexOf( inputValue ) === -1 ){
      event.tags = [ ...event.tags, inputValue ];
    }
    
    setState( {
      ...localState, event, inputVisible: false, inputValue: '',
    } );
  };
  
  //Handles Numbers
  const handleNumber = value => {
    setState( {
      ...localState, event: {
        ...event, numberOfPeople: value,
      },
    } );
  };
  
  //Handles Tags
  const handleTags = event.tags.map( ( tag, index ) => {
    const isTagLong = tag.length > 1;
    const tagElem = ( <Tag key={ tag } closable={ index !== 0 }
                           onClose={ () => handleClose( tag ) }>
      { isTagLong ? `${ tag.slice( 0, 11 ) }` : tag }
    </Tag> );
    return isTagLong ? ( <Tooltip title={ tag } key={ tag }>
      { tagElem }
    </Tooltip> ) : ( tagElem );
  } );
  
  //Error Handling
  
  const isFormValid = () => {
    if( isFormEmpty() ){
      message.error( 'Please fill out all fields...' );
      return false;
    }else{
      return true;
    }
  };
  const isFormEmpty = () => {
    if( !event.volunteerType || !event.numberOfPeople || !event.startTime ||
      !event.endTime || !event.date || !event.pointOfContact ||
      !event.description || !event.volunteerRequirements ){
      return true;
    }
  };
  
  return ( <div>
    <h1>Create An Event</h1>
    <StyledForm onSubmit={ handleSubmit }>
      <StyledInput
        name={ 'Volunteer Type' }
        values={ event }
        onChange={ changeValue }
        type="text"
      />
      <label>Number: </label>
      <StyledNumber
        name={ 'Number of People' }
        onChange={ handleNumber }
        type="number"
      />
      <label>Start Time: </label>
      <StyledTimePicker
        name={ 'Start Time' }
        defaultOpenValue={ moment( '00:00', 'hh:mm' ) }
        onChange={ handleStartTime }
        use12Hours
        format={ 'h:mm a' }
        type="time"
      />
      
      <label>End Time: </label>
      <StyledTimePicker
        name={ 'End Time' }
        defaultOpenValue={ moment( '00:00', 'hh:mm' ) }
        onChange={ handleEndTime }
        use12Hours
        format={ 'h:mm a' }
        type="time"
      />
      <label>Date: </label>
      <StyledDatePicker
        name={ 'Date' }
        values={ event }
        onChange={ handleDatePicker }
        defaultValue={ moment( '11/11/1111', dateFormat ) }
        format={ dateFormat }
      />
      
      <StyledInput
        name={ 'Point of Contact' }
        values={ event }
        onChange={ changeValue }
        type="text"
      />
      <StyledInput
        name={ 'Description' }
        values={ event }
        onChange={ changeValue }
        type="text"
      />
      
      <StyledInput
        name={ 'Volunteer Requirements' }
        values={ event }
        onChange={ changeValue }
        type="text"
      />
      <StyledInput onChange={ changeValue } name={ 'State' } values={ event }/>
      <StyledInput onChange={ changeValue } name={ 'City' } values={ event }/>
      <label>Tags: </label>
      { event.tags.length >= 0 ? handleTags : console.log( 'nahh' ) }
      { inputVisible && ( <StyledTag
        type="text"
        name={ 'Tags' }
        size="small"
        style={ { width: 78 } }
        values={ localState.inputValue }
        onChange={ handleInputChange }
        onBlur={ handleInputSubmit }
        onPressEnter={ handleInputSubmit }
      /> ) }
      { !inputVisible && ( <Tag
        onClick={ showInput }
        style={ { background: '#fff', borderStyle: 'dashed' } }
      >
        <Icon type="plus"/>
      </Tag> ) }
      <StyledButton type="primary" htmlType="submit">
        Create Event
      </StyledButton>
    </StyledForm>
  </div> );
};

export default CreateEvent;
