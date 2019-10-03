import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon, Select, Form, Input, Tooltip } from 'antd';
import { causeAreas } from '../../reducers/initialState';
import { StyledButton, StyledCancelButton } from '../../styled';

const Option = Select.Option;

export const FirstPart = ({ clickNext, storedData, cancelForm }) => {
  const [localState, setLocalState] = useState({ ...storedData });

  const handleChange = (name, value) => {
    setLocalState({ ...localState, [name]: value });
  };

  return (
    <DivForStyling>
      <Form layout={'vertical'} onSubmit={() => clickNext(localState)}>
        <Form.Item label={'Name of Organization'} required>
          <Input
            value={localState['nameOfOrganization']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'nameOfOrganization'}
            placeholder={'Community Helper'}
          />
        </Form.Item>
        <Form.Item label="Street Address" required>
          <Input
            value={localState['streetAddress']}
            onChange={e => handleChange(e.target.name, e.target.value)}
            name={'streetAddress'}
            placeholder={'123 Bruce Willis Dr.'}
          />
        </Form.Item>
        <div className="inline">
          <Form.Item label={'City'} required>
            <Input
              value={localState['city']}
              onChange={e => handleChange(e.target.name, e.target.value)}
              name={'city'}
              placeholder={'Los Angeles'}
            />
          </Form.Item>
          <Form.Item label="State" required>
            <Input
              value={localState['state']}
              onChange={e => handleChange(e.target.name, e.target.value)}
              name={'state'}
              placeholder={'California'}
            />
          </Form.Item>
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
              name={'typeOfCauses'}
              value={localState['typeOfCauses']}
              onChange={value => handleChange('typeOfCauses', value)}
              showArrow
              mode={'multiple'}
              placeholder={'Please select all that apply.'}
            >
              {causeAreas.map(cause => (
                <Option key={cause}>{cause}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
        </StyledCancelButton>
        <StyledButton onClick={() => clickNext(localState)} type="primary">
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

    .ant-row.ant-form-item {
      width: 45%;
    }
  }

  .ant-select-causes {
    .ant-col.ant-form-item-control-wrapper {
      width: 50%;
    }
  }
`;
export default FirstPart;
