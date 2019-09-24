import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  WrappedAntdForm,
  AntdInput,
  AntdSelect,
  AntdTextArea,
  AntdTimePicker,
  StyledCard,
  StyledButton,
} from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { Icon, Select } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { registerOrganization, updateOrganization } from '../actions';
import createOrgImg from '../assets/undraw_unexpected_friends.svg';

export const CreateOrg = props => {
  const [numberOfPOC, setNumberOfPOC] = useState(1);
  const [state, dispatch] = useStateValue();
  const [orgToEdit, setOrgToEdit] = useState({});
  const Option = Select.Option;

  useEffect(() => {
    if (props.location.state) {
      setOrgToEdit(props.location.state.org);
      if (props.location.state.org.firstName2) {
        setNumberOfPOC(2);
      }
    }
  }, []);

  const getPOCInputs = () => {
    const poc = [
      <AntdInput name={'First Name'} key={'firstName'} />,
      <AntdInput name={'Last name'} key={'lastName'} />,
      <AntdInput name={'Email'} type={'email'} key={'email'} />,
    ];
    if (numberOfPOC > 1) {
      poc.push(<StyledLine key={Math.random()} />);
      poc.push(
        <AntdInput
          name={'First Name 2'}
          label={'First Name'}
          notrequired={'false'}
          key={'firstName2'}
        />
      );
      poc.push(
        <AntdInput
          name={'Last Name 2'}
          label={'First Name'}
          notrequired={'false'}
          key={'lastName2'}
        />
      );
      poc.push(
        <AntdInput
          name={'Email 2'}
          label={'Email'}
          type={'email'}
          notrequired={'false'}
          key={'email2'}
        />
      );
    }
    return poc;
  };

  const onSubmit = values => {
    let POC = [];
    debugger;
    POC.push({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    });
    if (values.email2) {
      POC.push({
        email: values.email2,
        firstName: values.firstName2,
        lastName: values.lastName2,
      });
    }
    const org = {
      ...values,
      POC,
      organizationOwnerUID: state.auth.googleAuthUser.uid,
      startTime: values.startTime.format('HH:MM A'),
      endTime: values.endTime.format('HH:MM A'),
    };
    for (let key in org) {
      if (org[key] === undefined) delete org[key];
    }
    if (orgToEdit.orgId) {
      updateOrganization(orgToEdit.orgId, org, dispatch);
    } else {
      registerOrganization(org, dispatch);
    }

    props.history.push('/org-dashboard');
  };

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard style={{ maxWidth: '1067px', margin: '2rem 0 5rem 0' }}>
        <h1>Let's Set up your organization!</h1>
        <StyledImg src={createOrgImg} alt="undraw unexpected friends" />
        <StyledWrappedAntdForm
          layout={'vertical'}
          onSubmit={onSubmit}
          autofill={orgToEdit}
          useButton={true}
        >
          <AntdInput
            name={'Organization Name'}
            label={'Name of Organization'}
          />
          <AntdSelect
            name={'Cause Areas'}
            label={
              <>
                Types of causes <Icon type="question-circle-o" />
              </>
            }
            mode={'multiple'}
            style={{ width: '100%' }}
            placeholder={'Please select all that apply.'}
            tooltipTitle={
              'Select all cause areas that your' + ' organization helps.'
            }
          >
            {state.tags.causeAreas.map(cause => {
              return <Option key={cause}>{cause}</Option>;
            })}
          </AntdSelect>
          <AntdInput name={'City'} notrequired={'false'} />
          <AntdInput name={'State'} notrequired={'false'} />
          <AntdInput name={'Phone'} notrequired={'false'} />
          <h2>Who is the point of contact?</h2>
          {getPOCInputs()}
          {numberOfPOC === 1 ? (
            <StyledButton onClick={() => setNumberOfPOC(2)}>
              Add another point of contact.
            </StyledButton>
          ) : (
            <StyledButton onClick={() => setNumberOfPOC(1)}>
              Remove Point of Contact
            </StyledButton>
          )}
          <h2>What are your hours of operation?</h2>
          <CheckboxGroup
            name={'Days of the week'}
            options={days}
            style={{ width: '100%' }}
          />
          <AntdTimePicker name={'Start Time'} use12Hours format={'h:mm a'} />
          <AntdTimePicker name={'End Time'} use12Hours format={'h:mm a'} />
          <AntdTextArea name={'About Us'} notrequired={'false'} />
          <AntdInput name={'Website'} type={'url'} notrequired={'false'} />
        </StyledWrappedAntdForm>
      </CustomStyledCard>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: white;
`;

const BasicStyledDiv = styled.div`
  background: #e8e8e8;
  display: flex;
  width: 80%;
  margin: 2rem auto;
  padding: 2rem;
`;

const CustomStyledCard = styled(StyledCard)`
  background: #d9d9d9;
  text-align: center;
`;

const StyledLine = styled.div`
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

const StyledWrappedAntdForm = styled(WrappedAntdForm)``;

export default CreateOrg;
