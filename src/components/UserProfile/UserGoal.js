import React, { useState } from 'react';
import { Modal, Select } from 'antd';
import { WrappedAntForm, AntInput, AntSelect } from '../../styled/index';

export const UserGoal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { Option } = Select;

  const openModal = () => {
    setIsModalOpen(true);
  }

  const handleSubmit = (values) => {

  }

  const cancelSetGoal = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
      <h5>Your Current Goals</h5>
      <button onClick={openModal}>Add Goals</button>
      <Modal 
        title='Set Your Goal'
        visible={isModalOpen}
        closable={false}
      >
        <WrappedAntForm
          layout={'vertical'}
          onSubmit={handleSubmit}
          buttonType="primary"
          submitButton
          submitButtonText="Save"
          cancelButton={true}
          cancelButtonText={'Cancel'}
          handleCancel={cancelSetGoal}
        >
          <AntInput name={' Hours '}/>
          <AntSelect 
            name={' Frequency'}>
            <Option key='per week' value='per week'>hours per week</Option>
            <Option key='per month' value='per month'>hours per month</Option>
          </AntSelect>
        </WrappedAntForm>
      </Modal>
      <div>
        4 hours/month
      </div>
      <div>
        Competing with:
        
      </div>
      <div>
        <h5>Challenge a Friend to Beat your Goal</h5>
        <label></label>
        <input/>
        <button></button>
      </div>
    </div>
  )
}

export default UserGoal;