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
  const autoFillParts = {
    1: {},
    2: {},
    3: {},
    4: {},
  };
  const [localState, setLocalState] = useState(initialEvent);
  const [autoFillState, setAutoFillState] = useState(autoFillParts);
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
    setPageNumberState({
      pageNumber: 1,
    });

    props.history.push('/org-dashboard');
  };
  console.log('localState', localState);

  ///Cancel Form

  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  console.log(autoFillState);

  //Handle Form Parts Submit
  const handleFormPartSubmit = values => {
    console.log('parts', values);
    if (pageNumberState.pageNumber) {
      setAutoFillState({
        ...autoFillState,
        [pageNumberState.pageNumber]: values,
      });
    }
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

  const renderParts = {
    1: (
      <CreateEventPartOne
        state={state}
        localState={localState}
        setLocalState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        cancelForm={cancelForm}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
      />
    ),
    2: (
      <CreateEventPartTwo
        localState={localState}
        setLocalState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
      />
    ),
    3: (
      <CreateEventPartThree
        state={state}
        localState={localState}
        setState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
      />
    ),
    4: (
      <CreateEventPartFour
        localState={localState}
        setState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
      />
    ),
  };

  return (
    <div>
      {pageNumberState.pageNumber && renderParts[pageNumberState.pageNumber]}
    </div>
  );
};

export default CreateEvent;
