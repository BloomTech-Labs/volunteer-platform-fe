import React, { useState } from 'react';
import { Select, Input, Form } from 'antd';
import { StyledCancelButton, StyledButton } from '../../styled';
import styled from 'styled-components';

const { Option } = Select;
const { TextArea } = Input;

export const CreateEventPartThree = props => {
  const [error, setError] = useState('');
  const {
    state,
    localState,
    handlePageBack,
    handlePageForward,
    handleChange,
  } = props;

  const { volunteerRequirements, interest, eventDetails } = localState;

  const requirementTags = state.tags.requirements.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const isFormValid = () => {
    if (volunteerRequirements.length > 0 && interest.length > 0 && eventDetails)
      return true;
  };
  const checkedRequired = () => {
    if (isFormValid()) {
      setError('');
      handlePageForward();
    } else {
      setError('This field is required');
    }
  };
  return (
    <StyledDiv className={'flex center'}>
      <Form layout={'vertical'} onSubmit={() => checkedRequired()}>
        <div>
          <Form.Item label={'What are the requirements?'}>
            <div className={'errorFlex'}>
              <div>
                <Select
                  name={'volunteerRequirements'}
                  placeholder="Type here and a tag will appear"
                  mode="multiple"
                  value={volunteerRequirements}
                  style={{ maxWidth: '400px' }}
                  onChange={value =>
                    handleChange('volunteerRequirements', value)
                  }
                >
                  {requirementTags}
                </Select>
              </div>
              <div>
                {error && !volunteerRequirements.length > 0 && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </Form.Item>
        </div>
        <div className={''}>
          <Form.Item label={'interests'}>
            <div className={'errorFlex'}>
              <div>
                <Select
                  name={'interest'}
                  placeholder=""
                  mode="multiple"
                  value={interest}
                  onChange={value => handleChange('interest', value)}
                  style={{ maxWidth: '400px' }}
                >
                  {interestTags}
                </Select>
              </div>
              <div>
                {error && !interest.length > 0 && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </Form.Item>
        </div>

        <div className={''}>
          <Form.Item label={'Event Details'} required>
            <div className={'errorFlex'}>
              <div>
                <TextArea
                  name={'eventDetails'}
                  placeholder={
                    'What the volunteer would do at the event would go here.'
                  }
                  value={eventDetails}
                  onChange={e => handleChange(e.target.name, e.target.value)}
                  style={{ width: '400px', height: '200px' }}
                />
              </div>
              <div>
                {error && !eventDetails && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </Form.Item>
        </div>
      </Form>
      <div className="buttonStyles">
        <div>
          <StyledCancelButton
            onClick={() => handlePageBack()}
            key="back"
            type="secondary"
          >
            Back
          </StyledCancelButton>
        </div>
        <div>
          <StyledButton
            type="primary"
            key="next"
            onClick={() => checkedRequired()}
          >
            Next
          </StyledButton>
        </div>
      </div>
    </StyledDiv>
  );
};
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .errorFlex {
    display: flex;
    flex-direction: column;
  }
`;

export default CreateEventPartThree;
