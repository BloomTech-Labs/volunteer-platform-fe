import React, { useState, useEffect } from 'react';
import {
  AntInput,
  AntSelect,
  AntTextArea,
  StyledCard,
  StyledForm,
  AntInputNumber,
  AntDatePicker,
  AntTimePicker,
} from '../../../styled';
import { Icon } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import createEventImg from '../../../assets/undraw_blooming_jtv6.svg';
import RecurringEvent from '../RecurringEvent';

export const CreateEventReviewEditForm = props => {
  const {
    localState,
    setLocalState,
    handleReviewSubmit,
    handlePageBack,
  } = props;

  const [edit, setEdit] = useState();
  const [toEdit, setToEdit] = useState();

  console.log('editstate', localState);

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard
        className={'flex center'}
        style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}
      >
        <h1>Edit Event</h1>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <StyledCreateEvent>
          <StyledButtons>
            <div className="icon">
              <Icon type="save" />
            </div>
            <div className="icon">
              <Icon type="edit" />
            </div>
          </StyledButtons>
          <StyledForm>
            <h4>Event Name</h4>
            <AntInput name={'Name of Event'} value={localState.nameOfEvent} />
            <h4>Location</h4>
            <AntInput name={'Stree Address'} value={localState.streetAddress} />
            <AntInput name={'City'} value={localState.city} />
            <AntInput name={'State'} value={localState.state} />
            <h4>Tyeps of Causes</h4>
            <AntInput
              name={'Types of Causes'}
              mode="multiple"
              value={localState.typesOfCauses}
            />
            <h4>Volunteer Requirments</h4>
            <AntInput
              name={'Volunteer Requirements'}
              mode="multiple"
              value={localState.volunteerRequirements}
            />
            <h4>Interests</h4>
            <AntInput
              name={'Interest'}
              mode="multiple"
              value={localState.interest}
            />
            <h4>Volunteers Needed</h4>
            <p>{localState.numberOfVolunteers}</p>
            <AntInputNumber
              name={'Number of Volunteers'}
              min={0}
              value={localState.numberOfVolunteers}
            />
            <h4>Phone Number</h4>
            <AntInput name={'Phone Number'} value={localState.phoneNumber} />
            <h4>Point of Contact</h4>
            <AntInput name="First Name" value={localState.firstName} />
            <AntInput name="Last Name" value={localState.lastName} />
            <AntInput name="Email" value={localState.email} />
            <h4>When is the event?</h4>
            <AntDatePicker name={'Date'} value={moment(localState.date)} />
            {localState.recurringEvent === 'Yes' && (
              <RecurringEvent
                localState={localState}
                setLocalState={setLocalState}
                dynamicDates={localState.dynamicDates}
              />
            )}
            <h4>What time?</h4>
            <AntTimePicker
              name={'Start Time'}
              use12Hours
              format={'h:mm a'}
              defaultOpenValue={moment('00:00:00', 'HH:mm')}
              value={moment(localState.startTime)}
            />
            <AntTimePicker
              name={'End Time'}
              use12Hours
              format={'h:mm a'}
              defaultOpenValue={moment('00:00:00', 'HH:mm')}
              value={moment(localState.endTime)}
            />
            <h4>Event Details</h4>
            <AntTextArea
              name={'Event Details'}
              placeholder={
                'What the volunteer would do at the event would go here.'
              }
              style={{ height: 115 }}
              value={localState.eventDetails}
            />
            <h4>Website</h4>
            <AntInput name={'Website'} value={localState.website} />
            {localState.otherNotes && <h4>Other Notes</h4>}
            {localState.otherNotes && (
              <AntTextArea
                name={'Other Notes'}
                placeholder={
                  'Any additional helpful tips for the event go here.'
                }
                style={{ height: 115 }}
                value={localState.otherNotes}
                notRequired
              />
            )}
          </StyledForm>
        </StyledCreateEvent>
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
const StyledCreateEvent = styled.div`
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
