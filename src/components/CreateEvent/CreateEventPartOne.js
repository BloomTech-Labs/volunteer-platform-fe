import React, { useState } from 'react';
import { Select } from 'antd';
import {
  StyledButton,
  StyledSelect,
  WrappedAntForm,
  AntInputNumber,
  AntInput,
  AntSelect,
  StyledCard,
} from '../../styled';
import styled from 'styled-components';
import createEventImg from '../../assets/undraw_blooming_jtv6.svg';
import { formLayouts } from '../../utility/formLayouts';
import { AntDatePicker } from '../../styled';

const { Option } = Select;

export const CreateEventPartOne = props => {
  const { state, localState, setLocalState } = props;

  //Mapping through tags for antd select
  const causeAreaTags = state.tags.causeAreas.map(tag => {
    return (
      <Option key={tag} value={tag}>
        {tag}
      </Option>
    );
  });

  const cancelForm = () => {
    props.history.push('/org-dashboard');
  };

  //Handle Submit push values to parent state

  const handleSubmit = values => {
    console.log('part1', values);
    setLocalState({
      ...localState,
      values,
    });
  };
  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard
        className={'flex center'}
        style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}
      >
        <h1>Let's Create An Event</h1>
        <StyledImg src={createEventImg} alt="undraw unexpected friends" />
        <StyledCreateEvent>
          <WrappedAntForm
            cancelButton={true}
            cancelButtonText={'Cancel'}
            handleCancel={cancelForm}
            onSubmit={handleSubmit}
            layout={'vertical'}
            buttonType={'primary'}
            buttonText={'Next'}
          >
            <div className={'nameCauseWrapper'}>
              <div className={''}>
                <AntInput
                  name={'Name of Event'}
                  type="text"
                  layout={formLayouts.empty}
                  style={{ width: 240 }}
                />
              </div>
              <div className={''}>
                <AntSelect
                  name={'Types of Causes'}
                  placeholder="Types of Causes"
                  mode="multiple"
                  layout={formLayouts.empty}
                  style={{ width: 240 }}
                >
                  {causeAreaTags}
                </AntSelect>
              </div>
            </div>
            <div className={'addressWrapper'}>
              <AntInput name={'Street Address'} layout={formLayouts.empty} />
            </div>
            <div className={'locationWrapper'}>
              <div className={'inlineTriple'}>
                <AntInput
                  name={'City'}
                  layout={formLayouts.empty}
                  placeholder="City"
                ></AntInput>
              </div>
              <div className={'inlineTriple'}>
                <AntInput
                  name={'State'}
                  layout={formLayouts.empty}
                  placeholder="State"
                ></AntInput>
              </div>
              <div className={'inlineTriple'}>
                <AntInput
                  name={'Phone Number'}
                  pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                  placeholder={'000-000-0000'}
                  layout={formLayouts.empty}
                />
              </div>
            </div>
          </WrappedAntForm>
        </StyledCreateEvent>
      </CustomStyledCard>
    </StyledDiv>
  );
};
const StyledCreateEvent = styled.div`
  width: 100%;
  font-weight: bold;
  text-align: left;
  padding: 8rem;
  .inline {
    width: 50%;
  }
  .inlineTriple {
    width: 35%;
  }
  .buttonStyles {
    display: flex;
    justify-content: space-around;
  }

  .nameCauseWrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .addressWrapper {
    width: 100%;

    input {
      width: 625px;
    }
  }

  .locationWrapper {
    display: flex;
    flex-direction: space-between;

    input {
      width: 200px;
    }
  }

  label {
    color: ${props => props.theme.primary8};
  }
  small {
    color: #bfbfbf;
  }
`;

const StyledDiv = styled.div`
  background: #003d61;

  h1 {
    color: ${props => props.theme.primary8};
  }

  h4 {
    color: ${props => props.theme.primary8};
  }
  padding: 2rem;
`;

const CustomStyledCard = styled(StyledCard)`
  &&& {
    background: #fafafa;
    margin: 3rem;
    text-align: center;
    cursor: default;
    transition: none;
    max-width: 1088px;
    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateEventPartOne;
