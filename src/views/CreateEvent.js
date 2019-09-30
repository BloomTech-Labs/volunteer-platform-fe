import React, { useState, useEffect } from 'react';
import { Select, Row, Col } from 'antd';
import styled from 'styled-components';
import {
  AntInput,
  AntSelect,
  AntTextArea,
  AntTimePicker,
  AntInputNumber,
  AntDatePicker,
  WrappedAntForm,
  StyledCard,
} from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent, createRecurringEvent } from '../actions';
import RecurringEvent from '../components/RecurringEvent';
import moment from 'moment';
import createEventImg from '../assets/undraw_blooming_jtv6.svg';
import { formLayouts } from '../utility/formLayouts';

const { Option } = Select;

export const CreateEvent = props => {
  const initialEvent = {
    nameOfEvent: '',
    typeOfCause: [],
    date: '',
    dynmaicDay: '',
    dynamicYear: '',
    numberOfVolunteers: '',
    phoneNumber: '',
    pointOfcontact: '',
    description: '',
    volunteerRequirements: [],
    website: '',
    recurringInfo: {},
  };
  const [localState, setState] = useState(initialEvent);

  const [state, dispatch] = useStateValue();

  //Destructuring
  const { recurringInfo, recurringEvent, volunteerRequirements } = localState;

  useEffect(() => {
    if (props.location.state.org) {
      setState({
        ...localState,
        orgId: props.location.state.org.orgId,
      });
    }
  }, [props.location.state.org]);

  //Date Format
  const dateFormat = 'MM/DD/YYYY';

  const removeUndefinied = event => {
    Object.keys(event).forEach(key => {
      if (event[key] === undefined) {
        delete event[key];
      }
      return event;
    });
  };

  //Handle Submit for Form
  const handleSubmit = values => {
    console.log('values', values);
    const event = {
      ...values,
      orgId: localState.orgId,
      orgName: props.location.state.org.organizationName,
      orgImagePath: props.location.state.org.imagePath,
      orgPage: '',
      date: values.date.unix(),
      startTime: values.startTime.format('LT'),
      endTime: values.endTime.format('LT'),
      startTimeStamp: moment(
        values.date.format('LL') + ' ' + values.startTime.format('LT')
      ).unix(),
      endTimeSTamp: moment(
        values.date.format('LL') + ' ' + values.endTime.format('LT')
      ).unix(),
      volunteerRequirements: volunteerRequirements,
      pointOfcontact: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
    };

    if (recurringEvent === 'Yes') {
      event.recurringInfo = recurringInfo;
      if (event.recurringInfo.occurrenceEnds === 'On') {
        event.recurringInfo.occurrenceEndDate = event.recurringInfo.occurrenceEndDate.unix();
        event.recurringInfo.occurrenceEndsAfter = '';
      }
      if (event.recurringInfo.occurrenceEnds === 'After') {
        event.recurringInfo.occurrenceEndDate = '';
      }
      removeUndefinied(event);
      createRecurringEvent(event, dispatch);
    } else {
      removeUndefinied(event);
      createEvent(event, dispatch);
    }

    props.history.push('/org-dashboard');
  };

  const handleDynmaicDate = date => {
    const dynamicDay = date._d.toString().split(' ')[0];
    const dynamicYear = date._d
      .toString()
      .split(' ')
      .slice(1, 3)
      .join(' ');
    const dynamicNumber = date._d
      .toString()
      .split(' ')
      .slice(2, 3)
      .join(' ');
    let dayAsNum = date._d.toString().split(' ')[2];

    let count = 1;
    while (dayAsNum > 7) {
      dayAsNum -= 7;
      count++;
    }
    let nth = { 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth' };

    setState({
      ...localState,
      dynamicDay: dynamicDay,
      dynamicYear: dynamicYear,
      dynamicNumber: dynamicNumber,
      dynamicNth: nth[count],
    });
  };

  //Options for tags
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  let requirementTags = [];

  if (state.tags.requirements) {
    requirementTags = state.tags.requirements.map(tag => {
      return <Option key={tag}>{tag}</Option>;
    });
  }

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  ///Cancel Form

  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard
        className={'flex center'}
        style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}
      >
        <h1>Let's Create An Event</h1>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <StyledCreateEvent>
          <WrappedAntForm
            cancelButton={true}
            cancelButtonText={'Cancel'}
            handleCancel={cancelForm}
            onSubmit={handleSubmit}
            layout={'vertical'}
            buttonType={'primary'}
            buttonText={'Submit'}
          >
            <div className={'nameCauseWrapper'}>
              <div className={'inlineDouble'}>
                <AntInput
                  name={'Name of Event'}
                  type="text"
                  layout={formLayouts.empty}
                />
              </div>
              <div className={'inlineDouble'}>
                <AntSelect
                  name={'Types of Causes'}
                  placeholder="Types of Causes"
                  mode="multiple"
                  layout={formLayouts.empty}
                >
                  {causeAreaTags}
                </AntSelect>
              </div>
            </div>
            <div className={'addressWrapper'}>
              <AntInput name={'Street Address'} layout={formLayouts.empty} />
            </div>

            <div className={'locationWrapper'}>
              <div className={'inlineTriple'}>
                <AntInput
                  name={'City'}
                  layout={formLayouts.empty}
                  placeholder="City"
                ></AntInput>
              </div>
              <div className={'inlineTriple'}>
                <AntInput
                  name={'State'}
                  layout={formLayouts.empty}
                  placeholder="State"
                ></AntInput>
              </div>
              <div className={'inlineTriple'}>
                <AntInput
                  name={'Phone Number'}
                  pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                  placeholder={'000-000-0000'}
                  layout={formLayouts.empty}
                />
              </div>
            </div>

            <label>When is the event?</label>
            <div className={'styledGroup'}>
              <label>Date*</label>
              <div className={'dateWrapper hidden'}>
                <AntDatePicker
                  name={'Date'}
                  format={dateFormat}
                  onChange={handleDynmaicDate}
                  disabledDate={current =>
                    current && current < moment().endOf('day')
                  }
                  layout={formLayouts.empty}
                />
              </div>
              <div className={''}>
                <RecurringEvent
                  name={'Is This a Recurring Event ?'}
                  localState={localState}
                  setState={setState}
                  layout={formLayouts.empty}
                  notRequired
                />
              </div>

              <label>What time ?</label>
              <div className={'timeWrapper'}>
                <div className={'hidden'}>
                  <AntTimePicker
                    name={'Start Time'}
                    use12Hours
                    format={'h:mm a'}
                    defaultOpenValue={moment('00:00:00', 'HH:mm')}
                    layout={formLayouts.empty}
                  />
                </div>
                <p className="to">to</p>
                <div className={'hidden'}>
                  <AntTimePicker
                    name={'End Time'}
                    use12Hours
                    format={'h:mm a'}
                    defaultOpenValue={moment('00:00:00', 'HH:mm')}
                    layout={formLayouts.empty}
                  />
                </div>
              </div>
            </div>

            <label>Who is the point of Contact?</label>

            <div className={'pocWrapper'}>
              <div className={'inline'}>
                <AntInput
                  name={'First Name'}
                  type="text"
                  layout={formLayouts.empty}
                />
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Last Name'}
                  type="text"
                  layout={formLayouts.empty}
                />
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Email'}
                  type="email"
                  layout={formLayouts.empty}
                />
              </div>
            </div>
            <label>What are the requirements?</label>
            <div className={'styledGroup'}>
              <label>List Requirements here</label>
              <div className={'requirementsInterestWrapper'}>
                <div className={'hidden requirementsWrapper'}>
                  <AntSelect
                    name={'Volunteer Requirements'}
                    placeholder="Type here and a tag will appear"
                    mode="multiple"
                    layout={formLayouts.empty}
                  >
                    {requirementTags}
                  </AntSelect>
                </div>
                <div className={''}>
                  <AntSelect
                    name={'Interest'}
                    placeholder="All"
                    mode="multiple"
                    layout={formLayouts.empty}
                  >
                    {interestTags}
                  </AntSelect>
                </div>
              </div>
            </div>
            <div className={'eventDetailsWrapper'}>
              <AntTextArea
                name={'Event Details'}
                type="text"
                style={{ width: 700, height: 115 }}
                layout={formLayouts.empty}
              />
            </div>

            <div className={'styledGroup'}>
              <div className={'volunteerNumberWebsiteWrapper'}>
                <div className={''}>
                  <AntInput name={'Website'} layout={formLayouts.empty} />
                </div>
                <div className={'flex column'}>
                  <label style={{ width: 250 }}>
                    How many volunteers do you need?
                  </label>
                </div>
                <div className={'inline hidden'} style={{ width: 106 }}>
                  <AntInputNumber
                    name={'Number of Volunteers'}
                    type="number"
                    min={0}
                    style={{ width: 260 }}
                    layout={formLayouts.empty}
                  />
                </div>
                <small>We recommend adding +5 to your need</small>
              </div>
            </div>

            <div className={'otherNotesWrapper'}>
              <AntTextArea
                name={'Other Notes'}
                style={{ width: 423, height: 115 }}
                placeholder={
                  'Any additional helpful tips for the event go here.'
                }
                layout={formLayouts.empty}
                notRequired
              />
            </div>
          </WrappedAntForm>
        </StyledCreateEvent>
      </CustomStyledCard>
    </StyledDiv>
  );
};

const StyledCreateEvent = styled.div`
  width: 100%;
  font-weight: bold;
  text-align: left;
  padding: 8rem;
  .inline {
    width: 50%;
  }
  .inlineTriple {
    width: 35%;
  }
  .buttonStyles {
    display: flex;
    justify-content: space-around;
  }

  .styledGroup {
    background-color: #e8e8e8;
    border-radius: 3px;
    padding: 2rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nameCauseWrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;

    input {
      width: 400px;
    }
  }
  .addressWrapper {
    width: 100%;

    input {
      width: 625px;
    }
  }
  .locationWrapper {
    display: flex;
    flex-direction: space-between;

    input {
      width: 200px;
    }
  }
  .dateWrapper {
    text-align: center;
    input {
      width: 175px;
    }
  }
  .timeWrapper {
    display: flex;
  }
  .to {
    margin: 15px;
  }
  .pocWrapper {
    display: flex;
    flex-wrap: wrap;

    input {
      width: 175px;
    }
  }
  .requirementsInterestWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .volunteerNumberWebsiteWrapper {
    width: 100%;
  }
  .eventDetailsWrapper {
    width: 200%;
  }
  .otherNotesWrapper {
    width: 200%;
  }
  .hidden {
    label {
      display: none;
    }
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

export default CreateEvent;
