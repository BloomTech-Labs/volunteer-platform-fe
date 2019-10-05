import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon, Select, Form, Input, Tooltip } from 'antd';
import { causeAreas } from '../../reducers/initialState';
import { StyledButton, StyledCancelButton } from '../../styled';

const Option = Select.Option;

export const FirstPart = ({ clickNext, storedData, cancelForm }) => {
  const [localState, setLocalState] = useState({ ...storedData });
  const [errorMessage, setErrorMessage] = useState({
    organizationName: false,
    streetAddress: false,
    city: false,
    state: false,
    causeAreas: false,
  });

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };

  const checkRequired = () => {
    let errors = {};
    let errorCount = 0;
    for (let key in errorMessage) {
      if (!(key in localState)) {
        errorCount++;
        errors = {
          ...errors,
          [key]: 'This field is required.',
        };
      }
    }
    setErrorMessage({ ...errorMessage, ...errors });
    if (!errorCount) clickNext(localState);
  };

  return (
    <DivForStyling>
      <Form layout={'vertical'} onSubmit={() => clickNext(localState)}>
        <Form.Item label={'Name of Organization'} required>
          <Input
            value={localState['organizationName']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'organizationName'}
            placeholder={'Community Helper'}
          />
        </Form.Item>
        {errorMessage['organizationName'] && (
          <span className="error-message error-span left-aligned">
            {errorMessage['organizationName']}
          </span>
        )}
        <Form.Item label="Street Address" required>
          <Input
            value={localState['streetAddress']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'streetAddress'}
            placeholder={'123 Bruce Willis Dr.'}
          />
        </Form.Item>
        {errorMessage['streetAddress'] && (
          <span className="error-message error-span left-aligned">
            {errorMessage['streetAddress']}
          </span>
        )}
        <div className="inline">
          <div className="col">
            <Form.Item label={'City'} required>
              <Input
                value={localState['city']}
                onChange={e => handleChange(e.target.name, e.target.value)}
                name={'city'}
                placeholder={'Los Angeles'}
              />
            </Form.Item>
            {errorMessage['city'] && (
              <span className="error-message error-span left-aligned">
                {errorMessage['city']}
              </span>
            )}
          </div>
          <div className="col">
            <Form.Item label="State" required>
              <Input
                value={localState['state']}
                onChange={e => handleChange(e.target.name, e.target.value)}
                name={'state'}
                placeholder={'California'}
              />
            </Form.Item>
            {errorMessage['state'] && (
              <span className="error-message error-span left-aligned">
                {errorMessage['state']}
              </span>
            )}
          </div>
        </div>
        <h4>What type of cause is your organization serving?</h4>
        <div className="ant-select-causes">
          <Form.Item
            label={
              <Tooltip
                title={'Select all cause areas that your organization helps.'}
              >
                Types of causes <Icon type="question-circle-o" />
              </Tooltip>
            }
            required
          >
            <Select
              name={'causeAreas'}
              value={localState['causeAreas']}
              onChange={value => handleChange('causeAreas', value)}
              showArrow
              mode={'multiple'}
              placeholder={'Please select all that apply.'}
            >
              {causeAreas.map(cause => (
                <Option key={cause}>{cause}</Option>
              ))}
            </Select>
          </Form.Item>
          {errorMessage['causeAreas'] && (
            <span className="error-message error-span left-aligned">
              {errorMessage['causeAreas']}
            </span>
          )}
        </div>
      </Form>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
          <div className="buttonStyles">
            <StyledCancelButton onClick={cancelForm} type="primary">
              Cancel
            </StyledCancelButton>
            <StyledButton onClick={checkRequired} type="primary">
              Next
            </StyledButton>
          </div>
        </StyledCancelButton>
        <StyledButton onClick={checkRequired} type="primary">
          Next
        </StyledButton>
      </div>
    </DivForStyling>
  );
};

const DivForStyling = styled.div`
  .inline {
    display: flex;
    justify-content: space-between;

    .col {
      width: 45%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .ant-row {
    margin-bottom: 0px;
    margin-top: 8px;
  }
  .ant-select-causes {
    .ant-col.ant-form-item-control-wrapper {
      width: 50%;
    }
  }

  .error-message.error-span.left-aligned {
    color: red;
    font-size: 12px;
  }
`;
export default FirstPart;
