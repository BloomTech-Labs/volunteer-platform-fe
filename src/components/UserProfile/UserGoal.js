import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Select, DatePicker, Input, Icon, Button } from 'antd';
import { WrappedAntForm, AntInput, AntSelect,  } from '../../styled/index';

import moment from 'moment';

export const UserGoal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [goalsToEdit, setGoalsToEdit] = useState({});
  const [displayGoals, setDisplayGoals] = useState({
    hours: 0,
    frequency: '',
    duration: {
      start: '',
      end: ''
    }
  });

  const { Option } = Select;
  const { MonthPicker } = DatePicker;

  const openModal = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (props.user.goals) {
      setDisplayGoals(props.user.goals);
    }
  }, [props.user])  

  const handleSubmit = (values) => {
    console.log(values);
    let goals = {
      hours: values.Hours,
      frequency: values.Frequency,
      duration: {
        start: moment(values.start).format('MMM-YYYY'),
        end: moment(values.end).format('MMM-YYYY')
      }
    }

    let updatedUser = {
      ...props.user,
      goals: goals
    }

    props.updateUser(updatedUser);
    setIsModalOpen(false);
  }

  const cancelSetGoal = () => {
    setIsModalOpen(false);
  }

  return (
    <StyledDiv>
      <Modal 
        title='Set Your Goal'
        visible={isModalOpen}
        closable={false}
        footer={null}
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
          <AntInput 
            name={' Hours '}
            placeholder='Enter number of hours'/>
          <AntSelect 
            name={' Frequency'}
            placeholder='Select frequency'>
            <Option key='per week' value='per week'>hours per week</Option>
            <Option key='per month' value='per month'>hours per month</Option>
          </AntSelect>
          <MonthPicker 
            name={'Start'}
            placeholder={'Start month'}
            format={'MMM-YYYY'}
          />
          <MonthPicker 
            name={'End'}
            placeholder={'Start month'}
            format={'MMM-YYYY'}
          />
        </WrappedAntForm>
      </Modal>
      <div className='left'>
        <Button type='link' icon='plus-circle' onClick={openModal}>Set Goals</Button>
        <div>
          <h5>Current Goal</h5>
          <p>{displayGoals.hours} hours {displayGoals.frequency}</p>
        </div>
        <div>
          <h5>Duration</h5>
          <p>{displayGoals.duration.start} to {displayGoals.duration.end}</p>
        </div>
      </div>
      <div className='right'>
        <div>
          <h5>Community</h5>
          <p>2/5 friends accepted your challenge for October</p>
        </div>
        <div>
          <h5>Challenge a friend to be your goals</h5>
          <div className='link-row'>
            <Input 
              style={{ width: '350px' }}
              prefix={<Icon type="link" style={{ color: '#8C8C8C' }} />}
              value={`www.volunteir.com/${props.user.firstName}challenge`}/>
            <Button icon="copy">Copy</Button>
          </div>
        </div>
      </div>
    </StyledDiv>
  )
}

export default UserGoal;

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border: 1px solid ${({theme}) => theme.gray4};
  background: white;
  border-radius: 3px;
  padding: 1rem 0;

  .left {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    button {
      color: rgba(0, 0, 0, 0.6);
      padding: 0;
    }

    button:hover {
      color: ${({theme}) => theme.primary7};
    }
  }

  .right {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .link-row {
      display: flex;
    }
  }
`