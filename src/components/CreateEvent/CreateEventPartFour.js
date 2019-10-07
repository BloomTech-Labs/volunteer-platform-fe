import React, { useState } from 'react';
import { StyledCancelButton, StyledButton } from '../../styled';
import styled from 'styled-components';
import { Input, InputNumber, Form } from 'antd';

const { TextArea } = Input;

export const CreateEventPartFour = props => {
  const [error, setError] = useState('');
  const { handlePageBack, handlePageForward, localState, handleChange } = props;

  const { website, numberOfVolunteers, otherNotes } = localState;

  const isFormValid = () => {
    if (website && numberOfVolunteers && otherNotes) {
      return true;
    }
  };

  const checkedRequired = () => {
    if (isFormValid()) {
      setError('');
      handlePageForward();
    } else {
      setError('This field is required.');
    }
  };

  return (
    <StyledDiv>
      <Form layout={'vertical'} onSubmit={() => checkedRequired()}>
        <div>
          <Form.Item label={'Webiste'}>
            <Input
              name={'website'}
              value={website}
              placeholder="Enter Website"
              style={{ width: '400px' }}
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
            {error && !website && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>

        <div>
          <Form.Item label="How many volunteers do you need?">
            <div className={'errorFlex'}>
              <div className="inputNumber">
                <InputNumber
                  name={'numberOfVolunteers'}
                  value={numberOfVolunteers}
                  onChange={value => handleChange('numberOfVolunteers', value)}
                />
              </div>
              <small>We recommend adding +5 to your need</small>
              <div>
                {error && !numberOfVolunteers && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </Form.Item>
        </div>

        <Form.Item>
          <Form.Item label={'Other Notes'}>
            <div className={'errorFlex'}>
              <div>
                <TextArea
                  name={'otherNotes'}
                  placeholder={
                    'Any additional helpful tips for the event go here.'
                  }
                  value={otherNotes}
                  onChange={e => handleChange(e.target.name, e.target.value)}
                  style={{ width: '400px', height: '200px' }}
                />
              </div>
              <div>
                {error && !otherNotes && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </Form.Item>
        </Form.Item>
      </Form>
      <div className="buttonStyles">
        <StyledCancelButton
          onClick={() => handlePageBack()}
          type="secondary"
          key="back"
        >
          Back
        </StyledCancelButton>
        <StyledButton
          type="primary"
          key="next"
          onClick={() => checkedRequired()}
        >
          Next
        </StyledButton>
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

  .inputNumber {
    margin-bottom: 10px;
  }
`;

export default CreateEventPartFour;
