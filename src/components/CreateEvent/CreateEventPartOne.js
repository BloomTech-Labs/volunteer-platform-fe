import React from 'react';
import { Select, Form, Input } from 'antd';
import { StyledButton, StyledCancelButton } from '../../styled';
import styled from 'styled-components';

const { Option } = Select;

export const CreateEventPartOne = props => {
  const {
    state,
    handlePageForward,
    localState,
    handleChange,
    cancelForm,
  } = props;

  //Mapping through tags for antd select
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  return (
    <StyledDiv className={'flex center'}>
      <Form layout={'vertical'} onSubmit={() => handlePageForward()}>
        <Form.Item label={'Name of Event'} required>
          <Input
            name={'nameOfEvent'}
            value={localState.nameOfEvent}
            placeholder="Name of Event"
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
        </Form.Item>

        <div className={''}>
          <Form.Item label={'Types Of Causes'} required>
            <Select
              name={'typesOfCauses'}
              value={localState.typesOfCauses}
              placeholder="Types of Causes"
              mode="multiple"
              onChange={value => handleChange('typesOfCauses', value)}
            >
              {causeAreaTags}
            </Select>
          </Form.Item>
        </div>
        <div className={''}>
          <Form.Item label={'Street Address'} required>
            <Input
              name={'streetAddress'}
              value={localState.streetAddress}
              placeholder="Street Address"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
          </Form.Item>
        </div>
        <div className={''}>
          <div className={''}>
            <Form.Item label="City" required>
              <Input
                name={'city'}
                value={localState.city}
                placeholder="City"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={''}>
            <Form.Item label={'State'}>
              <Input
                name={'state'}
                value={localState.state}
                placeholder="State"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={'inlineTriple'}>
            <Form.Item label={'Phone Number'}>
              <Input
                name={'phoneNumber'}
                value={localState.phoneNumber}
                pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                placeholder={'000-000-0000'}
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </Form.Item>
          </div>
        </div>
        <div className="buttonStyles">
          <div>
            <StyledCancelButton
              onClick={() => cancelForm()}
              key="cancel"
              type="secondary"
            >
              Cancel
            </StyledCancelButton>
          </div>
          <div>
            <StyledButton
              type="primary"
              kye="primary"
              onClick={() => handlePageForward()}
            >
              Next
            </StyledButton>
          </div>
        </div>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CreateEventPartOne;
