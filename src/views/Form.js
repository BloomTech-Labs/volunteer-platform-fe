import React, { useState } from 'react';
import styled from 'styled-components';
import { WrappedAntdForm } from '../styled/AntdForm';
import AntdInput from '../styled/AntdInput';
import AntdSelect from '../styled/AntdSelect';
import AntdTimePicker from '../styled/AntdTimePicker';
import { StyledCard, StyledButton, StyledTimePicker } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { Icon, Select } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import moment from './CreateOrg';
import AntdTextArea from '../styled/AntdTextArea';

const Form = () => {
  const [ numberOfPOC, setNumberOfPOC ] = useState( 1 );
  const [ state, dispatch ] = useStateValue();
  const Option = Select.Option;
  
  const getPOCInputs = () => {
    const poc = [
      <AntdInput name={ 'First Name' }/>, <AntdInput name={ 'Last name' }/>,
      <AntdInput name={ 'Email' } type={ 'email' }/>,
    ];
    if( numberOfPOC > 1 ){
      poc.push( <StyledLine/> );
      poc.push( <AntdInput name={ 'First Name 2' } label={ 'First Name' }/> );
      poc.push( <AntdInput name={ 'Last Name 2' } label={ 'First Name' }/> );
      poc.push( <AntdInput name={ 'Email 2' } label={ 'Email' }
                           type={ 'email' }/> );
      
    }
    return poc;
  };
  
  const onSubmit = ( values ) => {
    debugger;
    const time = values.startTime.format( 'hh:mm a' ).toLocaleString();
    
  };
  
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday',
  ];
  
  return ( <div className={ 'flex center' }>
    <StyledCard maxWidth={ '900px' } margin={ '2rem 0 5rem 0' }>
      <h1>Let's Set up your organization!</h1>
      <WrappedAntdForm layout={ 'vertical' } onSubmit={ onSubmit }>
        <AntdInput name={ 'Organization Name' }
                   label={ 'Name of Organization' }/>
        <AntdSelect name={ 'Cause Areas' }
                    label={ <>Types of
                      causes <Icon type="question-circle-o"/></> }
                    mode={ 'multiple' } style={ { width: '100%' } }
                    placeholder={ 'Please select all that apply.' }
                    tooltipTitle={ 'Select all cause areas that your' +
                    ' organization helps.' }
        >
          { state.tags.causeAreas.map( cause => {
            return <Option key={ cause }>{ cause }</Option>;
          } ) }
        </AntdSelect>
        <AntdInput name={ 'City' }/>
        <AntdInput name={ 'State' }/>
        <AntdInput name={ 'Phone' }/>
        <h2>Who is the point of contact?</h2>
        { getPOCInputs() }
        { numberOfPOC === 1 ?
          <StyledButton onClick={ () => setNumberOfPOC( 2 ) }>
            Add another point of contact.</StyledButton> :
          <StyledButton onClick={ () => setNumberOfPOC( 1 ) }>Remove Point of
            Contact</StyledButton> }
        <h2>What are your hours of operation?</h2>
        <CheckboxGroup name={ 'Days of the week.' } options={ days }
                       style={ { width: '100%' } }/>
        <AntdTimePicker name={ 'Start Time' }
                        use12Hours
                        format={ 'h:mm a' }
        />
        <AntdTimePicker name={ 'End Time' }
                        use12Hours
                        format={ 'h:mm a' }
        />
        <AntdTextArea name={ 'About Us' }/>
        <AntdInput name={ 'Website' } type={ 'url' }/>
      </WrappedAntdForm>
    </StyledCard>
  </div> );
  
};

const StyledLine = styled.div`
border-bottom: 1px solid lightgrey;
margin-bottom: 1rem;
`;

export default Form;