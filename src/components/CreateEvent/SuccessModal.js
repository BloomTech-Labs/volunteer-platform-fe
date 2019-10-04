import React from 'react';
import styled from 'styled-components';
import { Modal, Icon } from 'antd';
import { StyledButton } from '../../styled';

export const SuccessModal = () => {
  return (
    <Modal visible footer={null} style={{ width: 900, height: 900 }}>
      <StyledModal>
        <div className={'icon'}>
          <Icon type="check" color="#52c41a" />
        </div>
        <div className={'text'}>
          <h2>Success</h2>
        </div>
        <div className={'buttons'}>
          <StyledButton key="" onClick=""></StyledButton>
          <StyledButton key="" onClick=""></StyledButton>
        </div>
      </StyledModal>
    </Modal>
  );
};

const StyledModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    width: 40px;
    height: 40px;
    font-size: 4rem;
  }
`;
