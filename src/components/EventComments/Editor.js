import React, { useState } from 'react';
import { WrappedAntForm, AntTextArea } from '../../styled';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Editor = ({ onSubmit, submitting }) => {
  return (
    <SyledEditor>
      <WrappedAntForm
        onSubmit={onSubmit}
        submitButtonText={'Send'}
        buttonType={'submit'}
        submitButton={true}
        buttonLoading={submitting}
        autofill={submitting && { comment: '' }}
      >
        <AntTextArea name={'Comment'} />
      </WrappedAntForm>
    </SyledEditor>
  );
};

const SyledEditor = styled.div`
  max-width: 800px;
  margin-left: 15%;
`;

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Editor;
