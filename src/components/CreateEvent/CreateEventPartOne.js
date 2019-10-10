import React, { useState } from 'react';
import { Select, Form, Input, Tooltip, Icon } from 'antd';
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
    if (!isFormValid()) {
      setError('');
      handlePageForward();
    } else {
      setError('This field is required');
    }
  };

  return (
    <StyledDiv className={'styledDiv'}>
      <Form layout={'vertical'} onSubmit={() => checkRequired()}>
        <div className={'error-flex'}>
          <Form.Item label={'Name of Event'} required>
            <div className={'input'}>
              <Input
                name={'nameOfEvent'}
                value={nameOfEvent}
                placeholder="Name of Event"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !nameOfEvent && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <div className={'error-flex'}>
          <Form.Item label={'Street Address'} required>
            <div className={'input'}>
              <Input
                name={'streetAddress'}
                value={streetAddress}
                placeholder="Street Address"
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !streetAddress && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <div className={'city-states-input'}>
          <div className={'inline error-flex'}>
            <Form.Item label="City" required>
              <div className={'input'}>
                <Input
                  name={'city'}
                  value={city}
                  placeholder="City"
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div>
                {error && !city && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </Form.Item>
          </div>
          <div className={'inline error-flex'}>
            <Form.Item label={'State'} required>
              <div className={'input'}>
                <Input
                  name={'state'}
                  value={localState.state}
                  placeholder="State"
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
              </div>
              <div>
                {error && !localState.state && (
                  <span className="error-message error-span left-aligned">
                    {error}
                  </span>
                )}
              </div>
            </Form.Item>
          </div>
        </div>
        <div className={'error-flex'}>
          <Form.Item label={'Phone Number'} required>
            <div className={'input'}>
              <Input
                name={'phoneNumber'}
                value={phoneNumber}
                pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                placeholder={'000-000-0000'}
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div>
              {error && !phoneNumber && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>
        <h4>What type of cause areas does the event help with?</h4>
        <div className={'error-flex'}>
          <Form.Item
            label={
              <Tooltip title={'Select all cause areas that your event helps.'}>
                Types of Causes <Icon type="question-circle-o" />
              </Tooltip>
            }
            required
          >
            <div className={'input'}>
              <Select
                name={'typesOfCauses'}
                value={typesOfCauses}
                placeholder="Types of Causes"
                mode="multiple"
                onChange={value => handleChange('typesOfCauses', value)}
              >
                {causeAreaTags}
              </Select>
            </div>
            <div>
              {error && !typesOfCauses.length > 0 && (
                <span className="error-message error-span left-aligned">
                  {error}
                </span>
              )}
            </div>
          </Form.Item>
        </div>

        <div className="buttonStyles">
          <div>
            <StyledCancelButton
              onClick={cancelForm}
              key="cancel"
              type="secondary"
            >
              Cancel
            </StyledCancelButton>
          </div>
          <div>
            <StyledButton type="primary" kye="primary" onClick={checkRequired}>
              Next
            </StyledButton>
          </div>
        </div>
      </Form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div``;

export default CreateEventPartOne;
