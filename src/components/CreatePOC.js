import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { StyledInput } from '../styled';

const CreatePOC = ({ poc, changePOC }) => {
  const onChange = e => {
    changePOC(poc.id, e);
  };

  return (
    <StyledCreatePOC>
      <StyledInput values={poc} name={'First Name'} onChange={onChange} />
      <StyledInput values={poc} name={'Last Name'} onChange={onChange} />
      <StyledInput values={poc} name={'Email'} onChange={onChange} />
    </StyledCreatePOC>
  );
};

const StyledCreatePOC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// StyledCreatePOC.propTypes = {
//   changePOC: PropTypes.func.isRequired,
//   poc: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }),
// };

export default CreatePOC;
