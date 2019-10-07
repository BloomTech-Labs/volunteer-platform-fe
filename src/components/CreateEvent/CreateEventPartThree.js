import React from 'react';
import { Select, Input, Form } from 'antd';
import { StyledCancelButton, StyledButton } from '../../styled';
import styled from 'styled-components';
import { formLayouts } from '../../utility/formLayouts';

const { Option } = Select;
const { TextArea } = Input;

export const CreateEventPartThree = props => {
  const {
    state,
    localState,
    setLocalState,
    handlePageBack,
    handlePageForward,
    handleChange,
  } = props;

  const requirementTags = state.tags.requirements.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  return (
    <StyledDiv className={'flex center'}>
      <h1>Let's Create An Event</h1>

      <label>What are the requirements?</label>
      {/* <label>List Requirements here</label> */}
      <Form layout={'vertical'} onSubmit={() => handlePageForward()}>
        <div className={''}>
          <Form.Item label={'Volunteer Requirments'} required>
            <Select
              name={'volunteerRequirements'}
              placeholder="Type here and a tag will appear"
              mode="multiple"
              value={localState.volunteerRequirements}
              onChange={value => handleChange('volunteerRequirements', value)}
              style={{ width: '300px' }}
            >
              {requirementTags}
            </Select>
          </Form.Item>
        </div>
        <div className={''}>
          <Form.Item label={'interests'}>
            <Select
              name={'interest'}
              placeholder=""
              mode="multiple"
              value={localState.interest}
              onChange={value => handleChange('interest', value)}
              style={{ width: '300px' }}
            >
              {interestTags}
            </Select>
          </Form.Item>
        </div>

        <div className={''}>
          <Form.Item label={'Event Details'} required>
            <TextArea
              name={'eventDetails'}
              placeholder={
                'What the volunteer would do at the event would go here.'
              }
              value={localState.eventDetails}
              onChange={e => handleChange(e.target.name, e.target.value)}
              style={{ width: '300px', height: '200px' }}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="buttonStyles">
        <StyledCancelButton onClick={() => handlePageBack} type="primary">
          Back
        </StyledCancelButton>
        <StyledButton type="primary">Next</StyledButton>
      </div>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CreateEventPartThree;
