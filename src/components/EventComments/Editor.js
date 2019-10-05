import React, {useState} from 'react';
import {WrappedAntForm, AntTextArea} from '../../styled';
import styled from 'styled-components';

const Editor = ({onSubmit}) => {
  
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = (values) => {
    setSubmitting(true);
    onSubmit(values);
  };
  
  return (
    <SyledEditor>
      <WrappedAntForm onSubmit={handleSubmit} submitButtonText={'Send'}
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

export default Editor;