import React, { useState, useEffect } from 'react';
import { Modal, Select, DatePicker, Progress } from 'antd';
import { WrappedAntForm, AntInput, AntSelect,  } from '../../styled/index';
import { volunteerProgress } from '../../utility/volunteerProgress';
import moment from 'moment';

export const UserGoal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [goalsToEdit, setGoalsToEdit] = useState({});
  const [progress, setProgress] = useState(0);
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
    if (props.user.validatedHours && props.user.goals) {
      let accHours = volunteerProgress(props.user.goals, props.user.validatedHours);
      setProgress(accHours);
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
    <div>
      <h5>Your Current Goals</h5>
      <button onClick={openModal}>Add Goals</button>
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
      <div>{displayGoals.hours} hours {displayGoals.frequency}</div>
      <div>Duration: {displayGoals.duration.start} to {displayGoals.duration.end}</div>
      <div>
        Competing with:
      </div>
      <div>
        <Progress type='circle' percent={progress} />
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