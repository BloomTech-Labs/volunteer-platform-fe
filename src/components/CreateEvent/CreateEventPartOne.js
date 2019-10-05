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
    setLocalState,
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

  const handleChange = (name, value) => {
    setLocalState({
      ...localState,
      [name]: value,
    });
  };

  return (
    <StyledDiv className={'flex center'}>
      <h1>Let's Create An Event</h1>

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
          <div className={'inlineTriple'}>
            <Form.Item label="City" required>
              <Input
                name={'City'}
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
      </Form>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
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

export default CreateEventPartOne;
