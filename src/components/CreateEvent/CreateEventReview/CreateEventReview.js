import React, { useState } from 'react';
import { StyledButton, StyledCard } from '../../../styled';

import styled from 'styled-components';
import createEventImg from '../../../assets/undraw_blooming_jtv6.svg';
import CreateEventReviewList from './CreateEventReviewList';
import CreateEventReviewEditForm from './CreateEventReviewEditForm';

export const CreateEventReview = props => {
  const [edit, setEdit] = useState();

  const {
    localState,
    setLocalState,
    handleReviewSubmit,
    handlePageBack,
    state,
  } = props;

  return (
    <div>
      {edit ? (
        <CreateEventReviewEditForm
          localState={localState}
          setLocalState={setLocalState}
          handleReviewSubmit={handleReviewSubmit}
          handlePageBack={handlePageBack}
          setEdit={setEdit}
          edit={edit}
          state={state}
        />
      ) : (
        <CreateEventReviewList
          localState={localState}
          handleReviewSubmit={handleReviewSubmit}
          handlePageBack={handlePageBack}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
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

export default CreateEventReview;
