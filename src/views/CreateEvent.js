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

import CreateEventPartOne from '../components/CreateEvent/CreateEventPartOne';
import CreateEventPartTwo from '../components/CreateEvent/CreateEventPartTwo';
import CreateEventPartThree from '../components/CreateEvent/CreateEventPartThree';
import CreateEventPartFour from '../components/CreateEvent/CreateEventPartFour';
import CreateEventReview from '../components/CreateEvent/CreateEventReview';

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
    recurringInfo: {
      repeatTimePeriod: '',
      occurrenceEnds: '',
      occurrenceEndDate: '',
      occurrenceEndsAfter: '',
    },
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
  const { recurringInfo, recurringEvent } = localState;

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
  const handleReviewSubmit = () => {
    console.log('firred');
    const event = {
      ...localState,
      orgId: localState.orgId,
      orgName: props.location.state.org.organizationName,
      orgImagePath: props.location.state.org.imagePath,
      orgPage: '',
      date: localState.date,
      startTime: localState.startTime,
      endTime: localState.endTime,
      startTimeStamp: localState.startTimeStamp,
      endTimeSTamp: localState.endTimeSTamp,
      volunteerRequirements: localState.volunteerRequirements,
      pointOfcontact: {
        firstName: localState.firstName,
        lastName: localState.lastName,
        email: localState.email,
      },
    };

    if (recurringEvent === 'Yes') {
      event.recurringInfo = recurringInfo;
      if (event.recurringInfo.occurrenceEnds === 'On') {
        event.recurringInfo.occurrenceEndsAfter = '';
      }
      if (event.recurringInfo.occurrenceEnds === 'After') {
        event.recurringInfo.occurrenceEndDate = '';
      }
      removeUndefinied(event);
      console.log('recurring', event);
      // createRecurringEvent(event, dispatch);
    } else {
      removeUndefinied(event);
      console.log('regular', event);
      createEvent(event, dispatch);
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

  //Handle Form Parts Submit
  const handleFormPartSubmit = values => {
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
        pageNumberState={pageNumberState}
        setPageNumberState={setPageNumberState}
        autoFillState={autoFillState}
        setAutoFillState={setAutoFillState}
      />
    ),
    3: (
      <CreateEventPartThree
        state={state}
        localState={localState}
        setLocalState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
      />
    ),
    4: (
      <CreateEventPartFour
        localState={localState}
        setLocalState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
      />
    ),
    5: (
      <CreateEventReview
        localState={localState}
        setLocalState={setLocalState}
        handleSubmit={handleFormPartSubmit}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        autoFillState={autoFillState}
        handleReviewSubmit={handleReviewSubmit}
        cancelForm={cancelForm}
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
