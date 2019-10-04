import React, { useState } from 'react';
import { StyledCard, StyledForm, StyledButton } from '../../../styled';
import { useStateValue } from '../../../hooks/useStateValue';
import { Icon, Select, Input, InputNumber, DatePicker, TimePicker } from 'antd';
import styled from 'styled-components';
import createEventImg from '../../../assets/undraw_blooming_jtv6.svg';
import RecurringEvent from '../RecurringEvent';

const { TextArea } = Input;
const { Option } = Select;

export const CreateEventReviewEditForm = props => {
  const [state, dispatch] = useStateValue();
  const { localState, setLocalState, setEdit } = props;
  const {
    nameOfEvent,
    streetAddress,
    city,
    typesOfCauses,
    volunteerRequirements,
    interest,
    numberOfVolunteers,
    phoneNumber,
    firstName,
    lastName,
    email,
    date,
    startTime,
    endTime,
    eventDetails,
    website,
    otherNotes,
    dynamicDates,
  } = localState;

  const [error, setError] = useState('');

  console.log('local', localState);
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  const requirementTags = state.tags.requirements.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const isFormValid = () => {
    if (
      nameOfEvent &&
      streetAddress &&
      city &&
      localState.state &&
      typesOfCauses.length > 1 &&
      volunteerRequirements.length > 1 &&
      interest.length > 1 &&
      numberOfVolunteers > 1 &&
      phoneNumber &&
      firstName &&
      lastName &&
      email &&
      eventDetails &&
      website
    ) {
      return true;
    }
  };

  const checkRequired = () => {
    if (isFormValid()) {
      console.log('uesss');
      setError('');
      handleForm();
    } else {
      setError('This field is required.');
    }
  };

  const handleValue = (name, value) => {
    setLocalState({
      ...localState,
      [name]: value,
    });
  };

  const handleForm = () => {
    setEdit(false);
  };

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard
        className={'flex center'}
        style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}
      >
        <h1>Edit Event</h1>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <StyledEditEvent>
          <StyledButtons>
            <div className="icon">
              <Icon type="save" onClick={() => checkRequired()} />
            </div>
            <div className="icon">
              <Icon type="edit" theme="twoTone" twoToneColor="#52c41a" />
            </div>
          </StyledButtons>
          <StyledForm>
            <div className={'editFormWrapper'}>
              <h4>Event Name</h4>
              <Input
                name={'nameOfEvent'}
                value={nameOfEvent}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !nameOfEvent && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Location</h4>
              <Input
                name={'streetAddress'}
                value={streetAddress}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !streetAddress && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <Input
                name={'city'}
                value={city}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />{' '}
              {error && !city && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <Input
                name={'state'}
                value={localState.state}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !localState.state && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Tyeps of Causes</h4>
              <Select
                name={'Types of Causes'}
                mode="multiple"
                value={typesOfCauses}
                onChange={value => handleValue('typesOfCauses', value)}
              >
                {causeAreaTags}
              </Select>
              {error && typesOfCauses.length < 1 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Volunteer Requirments</h4>
              <Select
                name={'Volunteer Requirements'}
                mode="multiple"
                value={volunteerRequirements}
                onChange={value => handleValue('volunteerRequirements', value)}
              >
                {requirementTags}
              </Select>
              {error && volunteerRequirements.length < 1 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Interests</h4>
              <Select
                name={'Interest'}
                mode="multiple"
                value={interest}
                onChange={value => handleValue('interest', value)}
              >
                {interestTags}
              </Select>
              {error && interest.length < 1 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Volunteers Needed</h4>
              <InputNumber
                name={'Number of Volunteers'}
                min={0}
                value={numberOfVolunteers}
                onChange={value => handleValue('numberOfVolunteers', value)}
              />
              {error && numberOfVolunteers < 1 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Phone Number</h4>
              <Input
                name={'phoneNumber'}
                value={phoneNumber}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !phoneNumber && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Point of Contact</h4>
              <Input
                name={'firstName'}
                value={firstName}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !firstName && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <Input
                name={'lastName'}
                value={lastName}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !lastName && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <Input
                name={'email'}
                value={email}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !email && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>When is the event?</h4>
              <DatePicker
                name={'Date'}
                format={'MM/DD/YYYY'}
                value={date}
                onChange={value => handleValue('date', value)}
              />
              <RecurringEvent
                localState={localState}
                setLocalState={setLocalState}
                dynamicDates={dynamicDates}
              />
              <h4>What time?</h4>
              <TimePicker
                name={'Start Time'}
                use12Hours
                format={'h:mm a'}
                value={startTime}
                onChange={value => handleValue('startTime', value)}
              />
              <TimePicker
                name={'End Time'}
                use12Hours
                format={'h:mm a'}
                value={endTime}
                onChange={value => handleValue('endTime', value)}
              />
              <h4>Event Details</h4>
              <TextArea
                name={'eventDetails'}
                placeholder={
                  'What the volunteer would do at the event would go here.'
                }
                value={eventDetails}
                onChange={e => handleValue(e.target.name, e.target.value)}
                style={{ height: 115 }}
              />
              {error && !eventDetails && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Website</h4>
              <Input
                name={'website'}
                value={website}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {error && !website && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
              <h4>Other Notes</h4>
              <TextArea
                name={'otherNotes'}
                placeholder={
                  'Any additional helpful tips for the event go here.'
                }
                value={otherNotes}
                onChange={e => handleValue(e.target.name, e.target.value)}
                style={{ height: 115 }}
                notRequired
              />
              <div className="buttonStyles">
                <StyledButton type="primary" onClick={() => handleForm()}>
                  Cancel
                </StyledButton>
                <StyledButton
                  onClick={() => checkRequired()}
                  type="primary"
                  width="fit-content"
                >
                  Save and Review
                </StyledButton>
              </div>
            </div>
          </StyledForm>
        </StyledEditEvent>
      </CustomStyledCard>
    </StyledDiv>
  );
};

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;
const StyledEditEvent = styled.div`
  width: 100%;
  font-weight: bold;
  text-align: left;
  padding: 8rem;
  border: 1px solid grey;
  .inline {
    width: 50%;
  }
  .buttonStyles {
    display: flex;
    justify-content: space-around;
  }
  .editFormWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .error-message.error-span.left-aligned {
    color: red;
    font-size: 12px;
  }

  label {
    color: ${props => props.theme.primary8};
  }
  small {
    color: #bfbfbf;
  }
`;

const StyledDiv = styled.div`
  background: #003d61;

  h1 {
    color: ${props => props.theme.primary8};
  }

  h4 {
    color: ${props => props.theme.primary8};
  }
  padding: 2rem;
`;

const CustomStyledCard = styled(StyledCard)`
  &&& {
    background: #fafafa;

    margin: 3rem;
    text-align: center;
    cursor: default;
    transition: none;
    max-width: 1088px;
    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateEventReviewEditForm;
