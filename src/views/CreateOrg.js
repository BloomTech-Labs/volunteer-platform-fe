import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WrappedAntdForm } from '../styled/AntdForm';
import AntdInput from '../styled/AntdInput';
import AntdSelect from '../styled/AntdSelect';
import AntdTimePicker from '../styled/AntdTimePicker';
import { StyledCard, StyledButton } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { Icon, Select } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import AntdTextArea from '../styled/AntdTextArea';
import { registerOrganization, updateOrganization } from '../actions';
import createOrgImg from '../assets/undraw_unexpected_friends.svg';

export const CreateOrg = props => {
  const [ numberOfPOC, setNumberOfPOC ] = useState( 1 );
  const [ state, dispatch ] = useStateValue();
  const [ orgToEdit, setOrgToEdit ] = useState( {} );
  const Option = Select.Option;
  
  useEffect( () => {
    if( props.location.state ){
      setOrgToEdit( props.location.state.org );
      if( props.location.state.org.firstName2 ){
        setNumberOfPOC( 2 );
      }
    }
  }, [] );
  
  console.log( orgToEdit );
  
  const getPOCInputs = () => {
    const poc = [
      <div className={ 'flex' }>
        <div className={ 'inline' }><AntdInput name={ 'First Name' }
                                               layout={ formItemLayoutInline }
                                               key={ 'firstName' }/></div>
        
        <div className={ 'inline' }><AntdInput name={ 'Last name' }
                                               layout={ formItemLayoutInline }
                                               key={ 'lastName' }/></div>
        <div className={ 'inline' }><AntdInput name={ 'Email' } type={ 'email' }
                                               layout={ formItemLayoutInline }
                                               key={ 'email' }/></div>
      </div>,
    ];
    if( numberOfPOC > 1 ){
      poc.push( <div className={ 'flex' }><StyledLine key={ Math.random() }/>
        <div className={ 'inline' }>
          <AntdInput
            name={ 'First Name 2' }
            label={ 'First Name' }
            notrequired={ 'false' }
            key={ 'firstName2' }
            layout={ formItemLayoutInline }
          /></div>
        <div className={ 'inline' }>
          <AntdInput
            name={ 'Last Name 2' }
            label={ 'First Name' }
            notrequired={ 'false' }
            key={ 'lastName2' }
            layout={ formItemLayoutInline }
          /></div>
        <div className={ 'inline' }>
          <AntdInput
            name={ 'Email 2' }
            label={ 'Email' }
            type={ 'email' }
            notrequired={ 'false' }
            key={ 'email2' }
            layout={ formItemLayoutInline }
          /></div>
      </div> );
    }
    return poc;
  };
  
  const onSubmit = values => {
    let POC = [];
    debugger;
    POC.push( {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    } );
    if( values.email2 ){
      POC.push( {
        email: values.email2,
        firstName: values.firstName2,
        lastName: values.lastName2,
      } );
    }
    const org = {
      ...values,
      POC,
      organizationOwnerUID: state.auth.googleAuthUser.uid,
      startTime: values.startTime.format( 'HH:MM A' ),
      endTime: values.endTime.format( 'HH:MM A' ),
    };
    for( let key in org ){
      if( org[ key ] === undefined ){
        delete org[ key ];
      }
    }
    if( orgToEdit.orgId ){
      updateOrganization( orgToEdit.orgId, org, dispatch );
    }else{
      registerOrganization( org, dispatch );
    }
    
    props.history.push( '/org-dashboard' );
    
  };
  
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday',
  ];
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 }, sm: { span: 10 },
    }, wrapperCol: {
      xs: { span: 24 }, sm: { span: 14 },
    },
  };
  
  const formItemLayoutInline = {
    labelCol: {
      xs: { span: 24 }, sm: { span: 7 },
    }, wrapperCol: {
      xs: { span: 24 }, sm: { span: 24 },
    },
  };
  
  const formItemLayoutFullLength = {
    labelCol: {
      xs: { span: 24 }, sm: { span: 5 },
    }, wrapperCol: {
      xs: { span: 24 }, sm: { span: 19 },
    },
  };
  
  return ( <StyledDiv className={ 'flex center' }>
    <CustomStyledCard
      style={ { maxWidth: '900px', margin: '2rem 0 5rem 0' } }>
      <h1>Let's Set up your organization!</h1>
      <StyledImg src={ createOrgImg } alt="undraw unexpected friends"/>
      <StyledCreateOrgForm>
        <StyledWrappedAntdForm
          layout={ 'vertical' }
          onSubmit={ onSubmit }
          editInfo={ orgToEdit }
        >
          <div className={ 'styledGroup' }>
            <div className={ 'flex' }>
              <div className={ 'inline' }>
                <AntdInput
                  name={ 'Organization Name' }
                  label={ 'Name of Organization' }
                  layout={ formItemLayout }
                />
              </div>
              <div className={ 'inline' }>
                <AntdSelect
                  labelCol={ { span: 3, offset: 0 } }
                  layout={ formItemLayout }
                  name={ 'Cause Areas' }
                  label={ <>
                    Types of causes <Icon type="question-circle-o"/>
                  </> }
                  mode={ 'multiple' }
                  style={ { width: '100%' } }
                  placeholder={ 'Please select all that apply.' }
                  tooltipTitle={ 'Select all cause areas that your' +
                  ' organization helps.' }
                >
                  { state.tags.causeAreas.map( cause => {
                    return <Option key={ cause }>{ cause }</Option>;
                  } ) }
                
                </AntdSelect>
              </div>
            </div>
            
            <div className={ 'flex' }>
              <div className={ 'inline' }>
                <AntdInput name={ 'City' } notrequired={ 'false' }
                           layout={ formItemLayout }
                />
              </div>
              <div className={ 'inline' }>
                <AntdInput name={ 'State' } notrequired={ 'false' }
                           layout={ formItemLayout }
                />
              </div>
            </div>
            <div className={ 'flex' }>
              <div className={ 'inline' }>
                <AntdInput name={ 'Phone' } notrequired={ 'false' }
                           layout={ formItemLayout }/>
              </div>
            </div>
          </div>
          
          <div className={ 'mg-tp-lg' }>
            <h4>Who is the point of contact?</h4>
          </div>
          
          { getPOCInputs() }
          { numberOfPOC === 1 ? ( <><Icon type="plus-circle"
                                          style={ { fontSize: '1.6rem' } }
                                          onClick={ () => setNumberOfPOC( 2 ) }/><span>
              Add another point of contact.</span></> ) :
            ( <><Icon type="minus-circle"
                      style={ { fontSize: '1.6rem' } }
                      onClick={ () => setNumberOfPOC( 1 ) }/><span>
             Remove extra point of contact.</span></> ) }
          <div className={ 'mg-tp-lg' }>
            <h4>What are your hours of operation?</h4>
          </div>
          
          <div className={ 'styledGroup' }>
            <CheckboxGroup
              name={ 'Days of the week' }
              options={ days }
              style={ { width: '100%' } }
            />
            <div className={ 'flex' }>
              
              <div className={ 'inline' }>
                <AntdTimePicker name={ 'Start Time' } label={ 'What Time?' }
                                use12Hours
                                format={ 'h:mm a' }/>
              </div>
              <div className={ 'inline' }>
                <AntdTimePicker name={ 'End Time' } use12Hours label={ 'To' }
                                format={ 'h:mm a' }/>
              </div>
            </div>
            
            
            <AntdTextArea name={ 'About Us' } notrequired={ 'false' }
                          layout={ formItemLayoutFullLength }
                          autosize={ { minRows: 4, maxRows: 120 } }/>
            <AntdInput name={ 'Website' } type={ 'url' }
                       notrequired={ 'false' }/>
          </div>
        </StyledWrappedAntdForm>
      </StyledCreateOrgForm>
    </CustomStyledCard>
  </StyledDiv> );
};

const StyledCreateOrgForm = styled.div`
margin-top: 2rem;
width: 100%;
.inline{
  width: 50%;
}

.styledGroup {
  background-color: #E8E8E8;
  border-radius: 30px;
  padding: 1rem;
}

i{
  margin-right: 1rem;
}

.mg-tp-lg {
  margin-top: 4rem;
}
`;

const StyledDiv = styled.div`
  background: white;
`;

const CustomStyledCard = styled( StyledCard )`
  background: #d9d9d9;
  text-align: center;
`;

const StyledLine = styled.div`
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
`;

const StyledImg = styled.img`
  width: 25%;
  margin: 0 auto;
`;

const StyledWrappedAntdForm = styled( WrappedAntdForm )``;

export default CreateOrg;
