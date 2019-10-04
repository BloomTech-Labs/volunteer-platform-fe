import React from 'react';
import {
  AntInput,
  AntSelect,
  AntTextArea,
  StyledCard,
  StyledForm,
  AntInputNumber,
  AntDatePicker,
  AntTimePicker,
  WrappedAntForm,
} from '../../../styled';
import { Icon, Select } from 'antd';
import styled from 'styled-components';
import createEventImg from '../../../assets/undraw_blooming_jtv6.svg';
import RecurringEvent from '../RecurringEvent';

const { Option } = Select;

export const CreateEventReviewEditForm = props => {
  const { localState, setLocalState, setEdit, state } = props;

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

  const handleSubmit = values => {
    console.log('values', values);
    setLocalState({
      ...localState,
      ...values,
      values,
    });
    setEdit(false);
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
        <StyledCreateEvent>
          <StyledButtons>
            <div className="icon">
              <Icon type="save" />
            </div>
            <div className="icon">
              <Icon type="edit" theme="twoTone" twoToneColor="#52c41a" />
            </div>
          </StyledButtons>
          <StyledForm>
            <WrappedAntForm
              cancelButton={true}
              cancelButtonText={'Cancel'}
              handleCancel={handleCancel}
              onSubmit={handleSubmit}
              layout={'vertical'}
              buttonType={'primary'}
              submitButton
              submitButtonText={'Save and Review'}
              autofill={localState}
            >
              <h4>Event Name</h4>
              <AntInput name={'Name of Event'} />
              <h4>Location</h4>
              <AntInput name={'Street Address'} />
              <AntInput name={'City'} />
              <AntInput name={'State'} />
              <h4>Tyeps of Causes</h4>
              <AntSelect name={'Types of Causes'} mode="multiple">
                {causeAreaTags}
              </AntSelect>
              <h4>Volunteer Requirments</h4>
              <AntSelect name={'Volunteer Requirements'} mode="multiple">
                {requirementTags}
              </AntSelect>
              <h4>Interests</h4>
              <AntSelect name={'Interest'} mode="multiple">
                {interestTags}
              </AntSelect>
              <h4>Volunteers Needed</h4>
              <p>{localState.numberOfVolunteers}</p>
              <AntInputNumber name={'Number of Volunteers'} min={0} />
              <h4>Phone Number</h4>
              <AntInput name={'Phone Number'} />
              <h4>Point of Contact</h4>
              <AntInput name="First Name" />
              <AntInput name="Last Name" />
              <AntInput name="Email" />
              <h4>When is the event?</h4>
              <AntDatePicker name={'Date'} format={'MM/DD/YYYY'} />
              <RecurringEvent
                name={'Is this a recurring event ?'}
                localState={localState}
                setLocalState={setLocalState}
                dynamicDates={localState.dynamicDates}
                notRequired
              />
              <h4>What time?</h4>
              <AntTimePicker name={'Start Time'} use12Hours format={'h:mm a'} />
              <AntTimePicker name={'End Time'} use12Hours format={'h:mm a'} />
              <h4>Event Details</h4>
              <AntTextArea
                name={'Event Details'}
                placeholder={
                  'What the volunteer would do at the event would go here.'
                }
                style={{ height: 115 }}
              />
              <h4>Website</h4>
              <AntInput name={'Website'} />
              {localState.otherNotes && <h4>Other Notes</h4>}
              {localState.otherNotes && (
                <AntTextArea
                  name={'Other Notes'}
                  placeholder={
                    'Any additional helpful tips for the event go here.'
                  }
                  style={{ height: 115 }}
                  notRequired
                />
              )}
            </WrappedAntForm>
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
