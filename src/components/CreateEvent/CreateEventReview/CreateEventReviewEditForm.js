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

  const handleValue = (name, value) => {
    setLocalState({
      ...localState,
      [name]: value,
    });
  };

  const handleCancel = () => {
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
              <Icon type="save" onClick={() => setEdit(false)} />
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
                value={localState.nameOfEvent}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <h4>Location</h4>
              <Input
                name={'streetAddress'}
                value={localState.streetAddress}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <Input
                name={'city'}
                value={localState.city}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <Input
                name={'state'}
                value={localState.state}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <h4>Tyeps of Causes</h4>
              <Select
                name={'Types of Causes'}
                mode="multiple"
                value={localState.typesOfCauses}
                onChange={value => handleValue('typesOfCauses', value)}
              >
                {causeAreaTags}
              </Select>
              <h4>Volunteer Requirments</h4>
              <Select
                name={'Volunteer Requirements'}
                mode="multiple"
                value={localState.volunteerRequirements}
                onChange={value => handleValue('volunteerRequirements', value)}
              >
                {requirementTags}
              </Select>
              <h4>Interests</h4>
              <Select
                name={'Interest'}
                mode="multiple"
                value={localState.interest}
                onChange={value => handleValue('interest', value)}
              >
                {interestTags}
              </Select>
              <h4>Volunteers Needed</h4>
              <InputNumber
                name={'Number of Volunteers'}
                min={0}
                value={localState.numberOfVolunteers}
                onChange={value => handleValue('numberOfVolunteers', value)}
              />
              <h4>Phone Number</h4>
              <Input
                name={'phoneNumber'}
                value={localState.phoneNumber}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <h4>Point of Contact</h4>
              <Input
                name={'firstName'}
                value={localState.firstName}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <Input
                name={'lastName'}
                value={localState.lastName}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <Input
                name={'email'}
                value={localState.email}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              <h4>When is the event?</h4>
              <DatePicker
                name={'Date'}
                format={'MM/DD/YYYY'}
                value={localState.date}
                onChange={value => handleValue('date', value)}
              />
              <RecurringEvent
                localState={localState}
                setLocalState={setLocalState}
                dynamicDates={localState.dynamicDates}
              />
              <h4>What time?</h4>
              <TimePicker
                name={'Start Time'}
                use12Hours
                format={'h:mm a'}
                value={localState.startTime}
                onChange={value => handleValue('startTime', value)}
              />
              <TimePicker
                name={'End Time'}
                use12Hours
                format={'h:mm a'}
                value={localState.endTime}
                onChange={value => handleValue('endTime', value)}
              />
              <h4>Event Details</h4>
              <TextArea
                name={'eventDetails'}
                placeholder={
                  'What the volunteer would do at the event would go here.'
                }
                value={localState.eventDetails}
                onChange={e => handleValue(e.target.name, e.target.value)}
                style={{ height: 115 }}
              />
              <h4>Website</h4>
              <Input
                name={'website'}
                value={localState.website}
                onChange={e => handleValue(e.target.name, e.target.value)}
              />
              {localState.otherNotes && <h4>Other Notes</h4>}
              {localState.otherNotes && (
                <TextArea
                  name={'otherNotes'}
                  placeholder={
                    'Any additional helpful tips for the event go here.'
                  }
                  value={localState.otherNotes}
                  onChange={e => handleValue(e.target.name, e.target.value)}
                  style={{ height: 115 }}
                  notRequired
                />
              )}
              <div className="buttonStyles">
                <StyledButton type="primary" onClick={handleCancel}>
                  Cancel
                </StyledButton>
                <StyledButton
                  onClick={() => setEdit(false)}
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
