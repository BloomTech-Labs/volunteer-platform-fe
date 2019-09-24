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
import AntdTextArea from '../styled/AntdTextArea';
import { registerOrganization, updateOrganization } from '../actions';
import createOrgImg from '../assets/undraw_unexpected_friends.svg';

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
      poc.push( <AntdInput name={ 'First Name 2' } label={ 'First Name' } notRequired/> );
      poc.push( <AntdInput name={ 'Last Name 2' } label={ 'First Name' } notRequired/> );
      poc.push( <AntdInput name={ 'Email 2' } label={ 'Email' } 
                           type={ 'email' } notRequired/> );
      
    }
    return poc;
  };
  
  const onSubmit = ( values ) => {
    const org = {
      ...values,
      daysOfTheWeek: values.daysOfTheWeek[''],
      startTime: values.startTime.format('LT'),
      endTime: values.endTime.format('LT')
    }
    
    console.log(org)
    registerOrganization( org, dispatch )
  };
  
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday',
  ];
  
  return ( 
  <StyledDiv className={ 'flex center' }>
    <CustomStyledCard maxWidth={ '900px' } margin={ '2rem 0 5rem 0' }>
      <h1>Let's Set up your organization!</h1>
      <StyledImg src={ createOrgImg } alt='undraw unexpected friends'/>
      <StyledWrappedAntdForm layout={ 'vertical' } onSubmit={ onSubmit }>
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
        <AntdInput name={ 'City' } notRequired/>
        <AntdInput name={ 'State' } notRequired/>
        <AntdInput name={ 'Phone' } notRequired/>
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
        <AntdTextArea name={ 'About Us' } notRequired/>
        <AntdInput name={ 'Website' } type={ 'url' } value='test' notRequired/>
      </StyledWrappedAntdForm>
    </CustomStyledCard>
  </StyledDiv> );
  
};

const StyledDiv = styled.div`
background: white;
`

const CustomStyledCard = styled(StyledCard)`
background: #D9D9D9;
text-align: center;
`

const StyledLine = styled.div`
border-bottom: 1px solid lightgrey;
margin-bottom: 1rem;
`;

const StyledImg = styled.img`
width: 25%;
margin: 0 auto;
`

const StyledWrappedAntdForm = styled(WrappedAntdForm)`

`

export default Form;