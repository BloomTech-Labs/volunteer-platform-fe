import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import {
  AntInput,
  AntSelect,
  AntTextArea,
  AntTimePicker,
  AntInputNumber,
  AntDatePicker,
  WrappedAntForm,
  StyledButton,
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
      console.log('recurring', event);
      createRecurringEvent(event, dispatch);
    } else {
      removeUndefinied(event);
      console.log('regular', event);
      // createEvent(event, dispatch);
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
        <StyledCreateEvent style={{ marginRight: '1rem' }}>
          <WrappedAntForm
            cancelButton={true}
            cancelButtonText={'Cancel'}
            handleCancel={cancelForm}
            layout={'vertical'}
            onSubmit={handleSubmit}
            buttonType={'primary'}
            buttonText={'Submit'}
            className={'flex center'}
          >
            <div className={'flex'}>
              <div className={'inline'}>
                <AntInput
                  name={'Name of Event'}
                  type="text"
                  layout={formLayouts.formItemLayout}
                />
              </div>
              <div className={'inline invisible'}>
                <AntSelect
                  name={'Types of Causes'}
                  placeholder="Types of Causes"
                  mode="multiple"
                  layout={formLayouts.formItemLayout}
                >
                  {causeAreaTags}
                </AntSelect>
              </div>
            </div>
            <AntInput
              name={'Street Address'}
              layout={formLayouts.formItemLayout}
            />
            <div className={'flex'}>
              <div className={'inline'}>
                <AntInput
                  name={'City'}
                  layout={formLayouts.formItemLayout}
                  placeholder="City"
                ></AntInput>
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'State'}
                  layout={formLayouts.formItemLayout}
                  placeholder="State"
                ></AntInput>
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Phone Number'}
                  pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                  placeholder={'000-000-0000'}
                  layout={formLayouts.formItemLayout}
                />
              </div>
            </div>

            <label>When is the event?</label>
            <div className={'styledGroup'}>
              <div className={'flex'}>
                <div className={'inline'}>
                  <AntDatePicker
                    name={'Date'}
                    format={dateFormat}
                    onChange={handleDynmaicDate}
                    disabledDate={current =>
                      current && current < moment().endOf('day')
                    }
                    layout={formLayouts.formItemLayout}
                  />
                </div>
                <div className={'inline'}>
                  <RecurringEvent
                    name={'Is This a Recurring Event ?'}
                    localState={localState}
                    setState={setState}
                    layout={formLayouts.formItemLayout}
                    notRequired
                  />
                </div>
              </div>

              <label>What time ?</label>
              <div className={'flex center'}>
                <div className={'inline hidden'}>
                  <AntTimePicker
                    name={'Start Time'}
                    use12Hours
                    format={'h:mm a'}
                    defaultOpenValue={moment('00:00:00', 'HH:mm')}
                    layout={formLayouts.formItemLayout}
                  />
                </div>
                <div className={'flex'}>
                  <p>to</p>
                </div>
                <div className={'inline hidden'}>
                  <AntTimePicker
                    name={'End Time'}
                    use12Hours
                    format={'h:mm a'}
                    defaultOpenValue={moment('00:00:00', 'HH:mm')}
                    // layout={formLayouts.formItemLayout}
                  />
                </div>
              </div>
            </div>

            <label>Who is the point of Contact?</label>

            <div className={'flex'}>
              <div className={'inline'}>
                <AntInput
                  name={'First Name'}
                  type="text"
                  layout={formLayouts.formItemLayout}
                />
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Last Name'}
                  type="text"
                  layout={formLayouts.formItemLayout}
                />
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Email'}
                  type="email"
                  layout={formLayouts.formItemLayout}
                />
              </div>
            </div>

            {/* <AntTextArea name={'Description'} type="text" /> */}

            <label>What are the requirements?</label>
            <div className={'styledGroup'}>
              <label>List Requirements here</label>
              <div className={'inline hidden'}>
                <AntSelect
                  name={'Volunteer Requirements'}
                  placeholder="Type here and a tag will appear"
                  mode="multiple"
                  layout={formLayouts.formItemLayout}
                >
                  {requirementTags}
                </AntSelect>
              </div>
              <div className={'inline'}>
                <AntSelect
                  name={'Interest'}
                  placeholder="All"
                  mode="multiple"
                  layout={formLayouts.formItemLayout}
                >
                  {interestTags}
                </AntSelect>
              </div>
            </div>

            <div className={'flex'}>
              <div className={'inline'}>
                <AntInput
                  name={'Website'}
                  layout={formLayouts.formItemLayout}
                />
              </div>
              <div className={'flex'}>
                <div className={'flex column'}>
                  <label style={{ width: 215 }}>
                    How many volunteers do you need?
                  </label>
                  <small>We recommend adding +5 to your need</small>
                </div>
                <div className={'inline hidden'} style={{ width: 106 }}>
                  <AntInputNumber
                    name={'Number of Volunteers'}
                    type="number"
                    min={0}
                  />
                </div>
              </div>
            </div>
            <AntTextArea name={'Event Details'} type="text" />
            <div className={'inline'}>
              <AntTextArea
                name={'Other Notes'}
                style={{ width: 423, height: 115 }}
                placeholder={
                  'Any additional helpful tips for the event go here.'
                }
                layout={formLayouts.formItemLayout}
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
  margin: 2rem;
  width: 100%;
  font-weight: bold;
  text-align: left;

  .inline {
    width: 50%;
  }
  label {
    margin-left: 25px;
  }
  .buttonStyles {
    display: flex;
    justify-content: space-around;
  }

  .styledGroup {
    margin: 3rem;
    background-color: #e8e8e8;
    border-radius: 3px;
    padding: 3rem;
  }

  .hidden {
    label {
      display: none;
    }
  }
  .invisible {
    label {
      visibility: hidden;
    }
  }

  .mg-tp-lg {
    margin-top: 4rem;
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
