import React from 'react';
import { StyledCancelButton, StyledButton } from '../../styled';
import styled from 'styled-components';
import { Input, InputNumber, Form } from 'antd';

const { TextArea } = Input;

export const CreateEventPartFour = props => {
  const { handlePageBack, handlePageForward, localState, handleChange } = props;

  return (
    <StyledDiv className={'flex center'}>
      <Form layout={'vertical'} onSubmit={() => handlePageForward()}>
        <div className={''}>
          <Form.Item label={'Webiste'} required>
            <Input
              name={'website'}
              value={localState.website}
              placeholder="Enter Website"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </Form.Item>
        </div>

        <div className={''}>
          <Form.Item label="How many volunteers do you need?" required>
            <div className="inputNumber">
              <InputNumber
                name={'numberOfVolunteers'}
                value={localState.numberOfVolunteers}
                onChange={value => handleChange('numberOfVolunteers', value)}
              />
            </div>
            <small>We recommend adding +5 to your need</small>
          </Form.Item>
        </div>

        <div className={''}>
          <Form.Item label={'Other Notes'} required>
            <TextArea
              name={'otherNotes'}
              placeholder={'Any additional helpful tips for the event go here.'}
              value={localState.otherNotes}
              onChange={e => handleChange(e.target.name, e.target.value)}
              style={{ width: '300px', height: '200px' }}
            />
          </Form.Item>
        </div>
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
          onClick={() => handlePageForward()}
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

  .inputNumber {
    margin-bottom: 10px;
  }
`;

export default CreateEventPartFour;
