import React, { useState } from 'react';
import { Select } from 'antd';
import {
  WrappedAntForm,
  AntSelect,
  AntTextArea,
  StyledCard,
} from '../../styled';
import styled from 'styled-components';
import createEventImg from '../../assets/undraw_blooming_jtv6.svg';
import { formLayouts } from '../../utility/formLayouts';

const { Option } = Select;

export const CreateEventPartThree = props => {
  const {
    state,
    handleSubmit,
    handlePageBack,
    autoFillState,
    pageNumber,
  } = props;

  const requirementTags = state.tags.requirements.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });

  const interestTags = state.tags.interests.map(tag => {
    return <Option key={tag}>{tag}</Option>;
  });
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
            cancelButtonText={'Back'}
            handleCancel={handlePageBack}
            onSubmit={handleSubmit}
            layout={'vertical'}
            buttonType={'primary'}
            submitButton
            submitButtonText={'Next'}
            autofill={autoFillState[pageNumber]}
          >
            <label>What are the requirements?</label>
            <div className={'styledGroup'}>
              <label>List Requirements here</label>
              <div className={'requirementsInterestWrapper'}>
                <div className={'hidden requirementsWrapper'}>
                  <AntSelect
                    name={'Volunteer Requirements'}
                    placeholder="Type here and a tag will appear"
                    mode="multiple"
                    layout={formLayouts.empty}
                    style={{ width: 240 }}
                  >
                    {requirementTags}
                  </AntSelect>
                </div>
                <div className={''}>
                  <AntSelect
                    name={'Interest'}
                    placeholder="All"
                    mode="multiple"
                    layout={formLayouts.empty}
                    style={{ width: 240 }}
                  >
                    {interestTags}
                  </AntSelect>
                </div>
              </div>
            </div>
            <div className={'eventDetailsWrapper'}>
              <AntTextArea
                name={'Event Details'}
                placeholder={
                  'What the volunteer would do at the event would go here.'
                }
                layout={formLayouts.empty}
                style={{ height: 115 }}
              />
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
  .styledGroup {
    background-color: #e8e8e8;
    border-radius: 3px;
    padding: 2rem;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  label {
    color: ${({ theme }) => theme.primary8};

    &::before {
      color: ${({ theme }) => theme.primary8};
    }
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

export default CreateEventPartThree;
