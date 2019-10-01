import React from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntTextArea, AntInput } from '../../styled';

export const LastPart = ({ handleSubmit, storedData, clickPrevious }) => {
  return (
    <WrappedAntForm
      layout={'vertical'}
      onSubmit={handleSubmit}
      handleCancel={clickPrevious}
      autofill={storedData}
      buttonText={'Next'}
      cancelButtonText={'Previous'}
    >
      <h4>Tell Us about Your Organization</h4>
      <AntTextArea
        name={'About Us'}
        notRequired={'false'}
        autosize={{ minRows: 4, maxRows: 120 }}
        placeholder={
          'A short paragraph such as mission, vision, and values of your non profit would go here...'
        }
      />
      <AntInput
        name={'Website'}
        type={'url'}
        notRequired={'false'}
        placeholder={'https://nonprofit.org'}
      />
    </WrappedAntForm>
  );
};

export default LastPart;
