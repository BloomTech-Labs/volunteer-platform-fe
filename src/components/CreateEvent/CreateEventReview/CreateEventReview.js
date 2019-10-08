import React, { useState } from 'react';
import CreateEventReviewList from './CreateEventReviewList';
import CreateEventReviewEditForm from './CreateEventReviewEditForm';

export const CreateEventReview = props => {
  const [edit, setEdit] = useState();

  const {
    localState,
    setLocalState,
    handleReviewSubmit,
    handlePageBack,
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

export default CreateEventReview;
