import React, { useState } from 'react';
import { StyledCancelButton, StyledButton } from '../../../styled';
import { useStateValue } from '../../../hooks/useStateValue';
import {
  Icon,
  Select,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Form,
} from 'antd';
import styled from 'styled-components';

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
      typesOfCauses.length > 0 &&
      volunteerRequirements.length > 0 &&
      interest.length > 0 &&
      numberOfVolunteers > 0 &&
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
      <div>
        <StyledButtons>
          <div className="icon">
            <Icon type="save" onClick={() => checkRequired()} />
          </div>
          <div className="icon">
            <Icon type="edit" theme="twoTone" twoToneColor="#52c41a" />
          </div>
        </StyledButtons>
      </div>

      <h4>Event Name</h4>
      <div>
        <Input
          name={'nameOfEvent'}
          value={nameOfEvent}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !nameOfEvent && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>

      <h4>Location</h4>
      <div>
        <Input
          name={'streetAddress'}
          value={streetAddress}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !streetAddress && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>
      <div>
        <Input
          name={'city'}
          value={city}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !city && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>
      <div>
        <Input
          name={'state'}
          value={localState.state}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !localState.state && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>

      <h4>Tyeps of Causes</h4>
      <div>
        <div className={'errorFlex'}>
          <div>
            <Select
              name={'Types of Causes'}
              mode="multiple"
              value={typesOfCauses}
              onChange={value => handleValue('typesOfCauses', value)}
            >
              {causeAreaTags}
            </Select>
          </div>
          <div>
            {error && !typesOfCauses.length > 0 && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>

      <h4>Volunteer Requirments</h4>
      <div className={'errorFlex'}>
        <div>
          <Select
            name={'Volunteer Requirements'}
            mode="multiple"
            value={volunteerRequirements}
            onChange={value => handleValue('volunteerRequirements', value)}
            style={{ width: '325px' }}
          >
            {requirementTags}
          </Select>
        </div>
        <div>
          {error && !volunteerRequirements.length > 0 && (
            <span className="error-message error-span left-aligned">
              {error}
            </span>
          )}
        </div>
      </div>

      <h4>Interests</h4>
      <div className={'errorFlex'}>
        <div>
          <Select
            name={'Interest'}
            mode="multiple"
            value={interest}
            onChange={value => handleValue('interest', value)}
          >
            {interestTags}
          </Select>
        </div>
        <div>
          {error && !interest.length > 0 && (
            <span className="error-message error-span left-aligned">
              {error}
            </span>
          )}
        </div>
      </div>

      <h4>Volunteers Needed</h4>
      <div className={'errorFlex'}>
        <div>
          <InputNumber
            name={'Number of Volunteers'}
            min={0}
            value={numberOfVolunteers}
            onChange={value => handleValue('numberOfVolunteers', value)}
          />
        </div>
        <div>
          {error && !numberOfVolunteers > 0 && (
            <span className="error-message error-span left-aligned">
              {error}
            </span>
          )}
        </div>
      </div>

      <h4>Phone Number</h4>
      <div>
        <Input
          name={'phoneNumber'}
          value={phoneNumber}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !phoneNumber && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>

      <h4>Point of Contact</h4>
      <div>
        <Input
          name={'firstName'}
          value={firstName}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !firstName && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>
      <div>
        <Input
          name={'lastName'}
          value={lastName}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !lastName && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>
      <div>
        <Input
          name={'email'}
          value={email}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !email && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>

      <h4>When is the event?</h4>
      <div>
        <DatePicker
          name={'Date'}
          format={'MM/DD/YYYY'}
          value={date}
          onChange={value => handleValue('date', value)}
        />
      </div>

      <RecurringEvent
        localState={localState}
        setLocalState={setLocalState}
        dynamicDates={dynamicDates}
      />
      <h4>What time?</h4>
      <div className={'timeWrapper'}>
        <div>
          <TimePicker
            name={'Start Time'}
            use12Hours
            format={'h:mm a'}
            value={startTime}
            onChange={value => handleValue('startTime', value)}
          />
        </div>
        <div>to</div>
        <div>
          <TimePicker
            name={'End Time'}
            use12Hours
            format={'h:mm a'}
            value={endTime}
            onChange={value => handleValue('endTime', value)}
          />
        </div>
      </div>
      <h4>Event Details</h4>
      <div>
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
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>

      <h4>Website</h4>
      <div>
        <Input
          name={'website'}
          value={website}
          onChange={e => handleValue(e.target.name, e.target.value)}
        />
        {error && !website && (
          <span className="error-message error-span left-aligned">{error}</span>
        )}
      </div>

      <h4>Other Notes</h4>
      <div>
        <TextArea
          name={'otherNotes'}
          placeholder={'Any additional helpful tips for the event go here.'}
          value={otherNotes}
          onChange={e => handleValue(e.target.name, e.target.value)}
          style={{ height: 115 }}
          notRequired
        />
      </div>

      <div className="buttonStyles">
        <StyledCancelButton
          key="cancel"
          type="secondary"
          onClick={() => handleForm()}
        >
          Cancel
        </StyledCancelButton>
        <StyledButton
          onClick={() => checkRequired()}
          key="save"
          type="primary"
          width="fit-content"
        >
          Save and Review
        </StyledButton>
      </div>
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
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .errorFlex {
    display: flex;
    flex-direction: column;
  }
  .timeWrapper {
    display: flex;
  }
  .error-message.error-span.left-aligned {
    color: red;
    font-size: 12px;
  }
`;

export default CreateEventReviewEditForm;
