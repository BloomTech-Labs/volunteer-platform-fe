import React, { useState } from 'react';
import { Select } from 'antd';
import {
  StyledButton,
  StyledSelect,
  WrappedAntForm,
  AntInputNumber,
  AntInput,
  AntSelect,
  AntTextArea,
  StyledCard,
} from '../../styled';
import styled from 'styled-components';
import createEventImg from '../../assets/undraw_blooming_jtv6.svg';
import { formLayouts } from '../../utility/formLayouts';
import { AntDatePicker } from '../../styled';

const { Option } = Select;

export const CreateEventPartFour = props => {
  const { handleSubmit, handlePageBack, pageNumber, autoFillState } = props;

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
            buttonText={'Next'}
            autofill={autoFillState[pageNumber]}
          >
            <div className={'styledGroup'}>
              <div className={'volunteerNumberWebsiteWrapper'}>
                <div className={''}>
                  <AntInput
                    name={'Website'}
                    layout={formLayouts.empty}
                    style={{ width: 240 }}
                  />
                </div>
                <div className={''}>
                  <label style={{ width: 250 }}>
                    How many volunteers do you need?
                  </label>
                </div>
                <div className={'hidden'} style={{ width: 106 }}>
                  <AntInputNumber
                    name={'Number of Volunteers'}
                    type="number"
                    min={0}
                    layout={formLayouts.empty}
                    style={{ width: 240 }}
                  />
                </div>
                <small>We recommend adding +5 to your need</small>
              </div>
            </div>

            <div className={'otherNotesWrapper'}>
              <AntTextArea
                name={'Other Notes'}
                placeholder={
                  'Any additional helpful tips for the event go here.'
                }
                layout={formLayouts.empty}
                style={{ height: 115 }}
                notRequired
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

export default CreateEventPartFour;
