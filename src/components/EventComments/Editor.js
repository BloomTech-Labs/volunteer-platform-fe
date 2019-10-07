import React, {useState} from 'react';
import {WrappedAntForm, AntTextArea} from '../../styled';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Editor = ({onSubmit, submitting}) => {
  
  return (
    <SyledEditor>
      <WrappedAntForm onSubmit={onSubmit} submitButtonText={'Send'}
                      buttonType={'submit'}
                      submitButton={true} buttonLoading={submitting}
      >
        <AntTextArea name={'Comment'}/>
      </WrappedAntForm>
    
    </SyledEditor>);
};

const SyledEditor = styled.div`
margin-left: 15rem;
padding-left: 5rem;
`;

Editor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default Editor;