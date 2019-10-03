import React from 'react';
import { Modal, Icon } from 'antd';

export const SuccessModal = () => {
  return (
    <Modal>
      <Icon type="check" heme="twoTone" twoToneColor="#52c41a" />
      <h2>Success</h2>
    </Modal>
  );
};
