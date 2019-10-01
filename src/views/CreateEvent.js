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

import moment from 'moment';
import createEventImg from '../assets/undraw_blooming_jtv6.svg';
import { formLayouts } from '../utility/formLayouts';
import CreateEventPartOne from '../components/CreateEvent/CreateEventPartOne';
import CreateEventPartTwo from '../components/CreateEvent/CreateEventPartTwo';
import CreateEventPartThree from '../components/CreateEvent/CreateEventPartThree';
import CreateEventPartFour from '../components/CreateEvent/CreateEventPartFour';
const { Option } = Select;

export const CreateEvent = props => {
  const initialEvent = {
    nameOfEvent: '',
    typeOfCause: [],
    date: '',
    numberOfVolunteers: '',
    phoneNumber: '',
    pointOfcontact: '',
    description: '',
    volunteerRequirements: [],
    website: '',
    recurringInfo: {},
  };
  const [localState, setLocalState] = useState(initialEvent);
  let [pageNumberState, setPageNumberState] = useState({
    pageNumber: 1,
  });

  const [state, dispatch] = useStateValue();

  //Destructuring
  const { recurringInfo, recurringEvent, volunteerRequirements } = localState;

  useEffect(() => {
    if (props.location.state.org) {
      setLocalState({
        ...localState,
        orgId: props.location.state.org.orgId,
      });
    }
  }, [props.location.state.org]);

  //Date Format

  const removeUndefinied = event => {
    Object.keys(event).forEach(key => {
      if (event[key] === undefined) {
        delete event[key];
      }
      return event;
    });
  };

  //Handle Submit for Form
  const handleReviewSubmit = values => {
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
      // createRecurringEvent(event, dispatch);
    } else {
      removeUndefinied(event);
      // createEvent(event, dispatch);
    }

    props.history.push('/org-dashboard');
  };
  console.log('localState', localState);

  ///Cancel Form

  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  //Handle Form Parts Submit
  const handleFormPartSubmit = values => {
    console.log('parts', values);
    setLocalState({
      ...localState,
      ...values,
      values,
    });
    setPageNumberState({
      pageNumber: pageNumberState.pageNumber + 1,
    });
  };

  //Go Back a Page Number
  const handlePageBack = () => {
    setPageNumberState({
      pageNumber: pageNumberState.pageNumber - 1,
    });
  };

  return (
    <div>
      <CreateEventPartOne
        state={state}
        localState={localState}
        setState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        cancelForm={cancelForm}
      />
      <CreateEventPartTwo
        state={state}
        localState={localState}
        setLocalState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
      />
      <CreateEventPartThree
        state={state}
        localState={localState}
        setState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
      />
      <CreateEventPartFour
        state={state}
        localState={localState}
        setState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
      />
    </div>
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
    text-align: center;
  }
  .nameCauseWrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .addressWrapper {
    width: 100%;

    input {
      width: 625px;
    }
  }
  .recurringWrapper {
    display: flex;
    margin-left: 40px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .volunteerNumberWebsiteWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
