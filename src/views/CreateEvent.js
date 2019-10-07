import React, { useState, useEffect } from 'react';
import { useStateValue } from '../hooks/useStateValue';
import { createEvent, createRecurringEvent } from '../actions';
import moment from 'moment';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import createEventImg from '../assets/undraw_blooming_jtv6.svg';
import {
  CreateEventPartOne,
  CreateEventPartTwo,
  CreateEventPartThree,
  CreateEventPartFour,
  SuccessModal,
} from '../components/CreateEvent';
import CreateEventReview from '../components/CreateEvent/CreateEventReview/CreateEventReview';

export const CreateEvent = props => {
  const initialEvent = {
    nameOfEvent: '',
    typesOfCauses: [],
    date: moment('00:00:00', 'HH:mm'),
    startTime: moment('00:00:00', 'HH:mm'),
    endTime: moment('00:00:00', 'HH:mm'),
    numberOfVolunteers: '',
    phoneNumber: '',
    pointOfcontact: '',
    volunteerRequirements: [],
    interest: [],
    website: '',
    dynamicDates: {
      dynamicDay: '',
      dynamicYear: '',
      dynamicNumber: '',
      dynamicNth: '',
    },
    recurringInfo: {
      repeatTimePeriod: '',
      occurrenceEnds: '',
      occurrenceEndDate: '',
      occurrenceEndsAfter: '',
    },
  };
  const formTitles = {
    1: 'Create An Event',
    2: 'Create An Event',
    3: 'Almost Finished Creating Your Event!!',
    4: 'Almost Finished Creating Your Event!!',
    5: "Here's What We Got",
  };
  const [localState, setLocalState] = useState(initialEvent);

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

  //Handle Submit for Form
  const handleReviewSubmit = () => {
    const event = {
      orgId: localState.orgId,
      orgName: props.location.state.org.organizationName,
      orgImagePath: props.location.state.org.imagePath || '',
      orgPage: '',
      nameOfEvent: localState.nameOfEvent,
      streetAddress: localState.streetAddress,
      city: localState.city,
      state: localState.state,
      email: localState.email,
      phoneNumber: localState.phoneNumber,
      date: localState.date.unix(),
      startTime: localState.startTime.format('LT'),
      endTime: localState.endTime.format('LT'),
      startTimeStamp: moment(
        localState.date.format('LL') + ' ' + localState.startTime.format('LT')
      ).unix(),
      endTimeSTamp: moment(
        localState.date.format('LL') + ' ' + localState.endTime.format('LT')
      ).unix(),
      numberOfVolunteers: localState.numberOfVolunteers,
      typesOfCauses: localState.typesOfCauses,
      interest: localState.interest,
      volunteerRequirements: localState.volunteerRequirements,
      pointOfcontact: {
        firstName: localState.firstName,
        lastName: localState.lastName,
        email: localState.email,
      },
      eventDetails: localState.eventDetails,
      website: localState.website,
      otherNotes: localState.otherNotes,
    };

    if (recurringInfo.recurringEvent === 'Yes') {
      event.recurringInfo = recurringInfo;
      if (event.recurringInfo.occurrenceEnds === 'On') {
        event.recurringInfo.occurrenceEndDate = event.recurringInfo.occurrenceEndDate.unix();
        event.recurringInfo.occurrenceEndsAfter = '';
      }
      if (event.recurringInfo.occurrenceEnds === 'After') {
        event.recurringInfo.occurrenceEndDate = '';
      }
      console.log('reg', event);
      createRecurringEvent(event, dispatch);
    } else {
      console.log('rec', event);
      createEvent(event, dispatch);
    }
    setPageNumberState({
      pageNumber: 1,
    });

    props.history.push('/org-dashboard');
  };

  const handleChange = (name, value) => {
    setLocalState({
      ...localState,
      [name]: value,
    });
  };
  ///Cancel Form
  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  //Handle Form Parts Submit
  const handlePageForward = () => {
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
        handlePageForward={handlePageForward}
        cancelForm={cancelForm}
        pageNumber={pageNumberState.pageNumber}
        handleChange={handleChange}
      />
    ),
    2: (
      <CreateEventPartTwo
        localState={localState}
        setLocalState={setLocalState}
        handlePageBack={handlePageBack}
        setPageNumberState={setPageNumberState}
        handlePageForward={handlePageForward}
        handleChange={handleChange}
      />
    ),
    3: (
      <CreateEventPartThree
        state={state}
        localState={localState}
        setLocalState={setLocalState}
        handlePageBack={handlePageBack}
        handleChange={handleChange}
        handlePageForward={handlePageForward}
      />
    ),
    4: (
      <CreateEventPartFour
        localState={localState}
        setLocalState={setLocalState}
        handlePageBack={handlePageBack}
        handleChange={handleChange}
        handlePageForward={handlePageForward}
      />
    ),
    5: (
      <CreateEventReview
        localState={localState}
        setLocalState={setLocalState}
        handlePageBack={handlePageBack}
        pageNumber={pageNumberState.pageNumber}
        handleReviewSubmit={handleReviewSubmit}
        cancelForm={cancelForm}
        handleChange={handleChange}
      />
    ),
    // 6: <SuccessModal />,
  };
  console.log('localstate', localState);
  return (
    <div>
      <StyledDiv className={'flex center'}>
        <CustomStyledCard margin="2rem 0 5rem 0" maxWidth="900px">
          <h1>{formTitles[pageNumberState.pageNumber]}</h1>
          <StyledImg src={createEventImg} alt="undraw unexpected friends" />
          <StyledRenderDiv>
            {pageNumberState.pageNumber &&
              renderParts[pageNumberState.pageNumber]}
          </StyledRenderDiv>
        </CustomStyledCard>
      </StyledDiv>
    </div>
  );
};

const StyledDiv = styled.div`
  background: white;
  .create-org-header {
    color: ${props => props.theme.primary8};
  }
`;

const CustomStyledCard = styled(StyledCard)`
  &&& {
    background: #d9d9d9;
    text-align: center;
    cursor: default;
    transition: none;

    .ant-steps {
      text-align: left;
      margin-bottom: 40px;

      .ant-steps-item-finish
        > .ant-steps-item-container
        > .ant-steps-item-tail {
        &::after {
          background: ${({ theme }) => theme.primary8};
        }
      }
      span.ant-steps-icon-dot {
        background: ${({ theme }) => theme.primary8};
      }
    }
  }
`;

const StyledRenderDiv = styled.div`
  background: ${({ theme }) => theme.gray4};
  width: 75%;
  margin: 0 auto;
  font-weight: bold;
  padding: 1.5rem 3rem;
  border-radius: ${({ theme }) => theme.borderRadiusDefault};

  label {
    color: ${({ theme }) => theme.primary8};

    &::before {
      color: ${({ theme }) => theme.primary8};
    }
  }

  .buttonStyles {
    display: flex;
    margin: 50px auto 0;
    padding-top: 40px;
    padding-right: 70px;
    padding-left: 70px;
    justify-content: space-between;
    border-top: 2px solid ${({ theme }) => theme.primary8};
  }
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateEvent;
