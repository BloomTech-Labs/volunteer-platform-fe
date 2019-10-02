import React from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntTextArea, AntInput } from '../../styled';

export const LastPart = ({ clickNext, storedData, clickPrevious }) => {
  return (
    <DivForStyling>
      <WrappedAntForm
        layout={'vertical'}
        onSubmit={clickNext}
        cancelButton
        handleCancel={clickPrevious}
        autofill={storedData}
        submitButton
        submitButtonText={'Submit'}
        cancelButtonText={'Previous'}
      >
        <h4>Tell Us about Your Organization</h4>
        <div className="inputs">
          <AntTextArea
            name={'About Us'}
            autosize={{ minRows: 4, maxRows: 120 }}
            placeholder={
              'A short paragraph such as mission, vision, and values of your non profit would go here...'
            }
          />
          <AntInput
            name={'Website'}
            notRequired
            type={'url'}
            placeholder={'https://nonprofit.org'}
          />
        </div>
      </WrappedAntForm>
    </DivForStyling>
  );
};

const DivForStyling = styled.div`
  .inputs {
    width: 70%;
    margin: 0 auto;
  }
`;

export default LastPart;
