import React, { useState } from 'react';
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

  const {
    nameOfEvent,
    typesOfCauses,
    streetAddress,
    city,
    phoneNumber,
  } = localState;
  const [error, setError] = useState('');
  //Mapping through tags for antd select
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  const isFormValid = () => {
    if (
      nameOfEvent &&
      typesOfCauses.length > 0 &&
      streetAddress &&
      city &&
      localState.state &&
      phoneNumber
    )
      return true;
  };

  const checkRequired = () => {
    if (isFormValid()) {
      setError('');
      handlePageForward();
    } else {
      setError('This field is required');
    }
  };

  return (
    <StyledDiv className={'flex center'}>
      <Form layout={'vertical'} onSubmit={() => checkRequired()}>
        <Form.Item label={'Name of Event'} required>
          <Input
            name={'nameOfEvent'}
            value={nameOfEvent}
            placeholder="Name of Event"
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
          {error && !nameOfEvent && (
            <span className="error-message error-span left-aligned">
              {error}
            </span>
          )}
        </Form.Item>

        <div>
          <Form.Item label={'Types Of Causes'} required>
            <Select
              name={'typesOfCauses'}
              value={typesOfCauses}
              placeholder="Types of Causes"
              mode="multiple"
              style={{ maxWidth: '400px' }}
              onChange={value => handleChange('typesOfCauses', value)}
            >
              {causeAreaTags}
            </Select>
            {error && !typesOfCauses.length > 0 && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>
        <div className={''}>
          <Form.Item label={'Street Address'} required>
            <Input
              name={'streetAddress'}
              value={streetAddress}
              placeholder="Street Address"
              onChange={e => handleChange(e.target.name, e.target.value)}
            />
            {error && !streetAddress && (
              <span className="error-message error-span left-aligned">
                {error}
              </span>
            )}
          </Form.Item>
        </div>
        <div className={''}>
          <div className={''}>
            <Form.Item label="City" required>
              <Input
                name={'city'}
                value={city}
                placeholder="City"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {error && !city && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
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
              {error && !localState.state && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </Form.Item>
          </div>
          <div className={'inlineTriple'}>
            <Form.Item label={'Phone Number'}>
              <Input
                name={'phoneNumber'}
                value={phoneNumber}
                pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                placeholder={'000-000-0000'}
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
              {error && !phoneNumber && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
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
              onClick={() => checkRequired()}
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
