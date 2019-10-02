import React, { useState } from 'react';
import {
  WrappedAntForm,
  AntInput,
  AntTimePicker,
  StyledCard,
} from '../../styled';
import RecurringEvent from './RecurringEvent';
import moment from 'moment';
import styled from 'styled-components';
import createEventImg from '../../assets/undraw_blooming_jtv6.svg';
import { formLayouts } from '../../utility/formLayouts';
import { AntDatePicker } from '../../styled';

export const CreateEventPartTwo = props => {
  const {
    localState,
    setLocalState,
    handlePageBack,
    autoFillState,
    setAutoFillState,
    pageNumberState,
    setPageNumberState,
  } = props;

  const { pageNumber } = pageNumberState;
  const [dynamicState, setDynmaicState] = useState({
    dynamicDay: '',
    dynamicYear: '',
    dynamicNumber: '',
  });
  const dateFormat = 'MM/DD/YYYY';

  //Mapping through tags for antd select

  const handleDynmaicDate = date => {
    const dynamicDay = date._d.toString().split(' ')[0];
    const dynamicYear = date._d
      .toString()
      .split(' ')
      .slice(1, 3)
      .join(' ');
    const dynamicNumber = date._d
      .toString()
      .split(' ')
      .slice(2, 3)
      .join(' ');
    let dayAsNum = date._d.toString().split(' ')[2];

    let count = 1;
    while (dayAsNum > 7) {
      dayAsNum -= 7;
      count++;
    }
    let nth = { 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth' };

    setDynmaicState({
      ...dynamicState,
      dynamicDay,
      dynamicYear,
      dynamicNumber,
      dynamicNth: nth[count],
    });
  };
  //Handle Submit push values to parent state

  const hanldePartTwoSubmit = values => {
    setLocalState({
      ...localState,
      ...values,
      values,
      date: values.date.unix(),
      startTime: values.startTime.format('LT'),
      endTime: values.endTime.format('LT'),
    });
    setAutoFillState({
      ...autoFillState,
      [pageNumber]: values,
    });
    setPageNumberState({
      pageNumber: pageNumberState.pageNumber + 1,
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
            cancelButtonText={'Back'}
            handleCancel={handlePageBack}
            onSubmit={hanldePartTwoSubmit}
            layout={'vertical'}
            buttonType={'primary'}
            buttonText={'Next'}
            autofill={autoFillState[pageNumber]}
          >
            <label>Who is your point of contact?</label>
            <div className={'pocWrapper'}>
              <div className={'inline'}>
                <AntInput
                  name={'First Name'}
                  type="text"
                  layout={formLayouts.empty}
                  style={{ width: 240 }}
                />
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Last Name'}
                  type="text"
                  layout={formLayouts.empty}
                  style={{ width: 240 }}
                />
              </div>
              <div className={'inline'}>
                <AntInput
                  name={'Email'}
                  type="email"
                  layout={formLayouts.empty}
                  style={{ width: 240 }}
                />
              </div>
            </div>
            <div className={'dateWrapper hidden'}>
              <AntDatePicker
                name={'Date'}
                format={dateFormat}
                onChange={handleDynmaicDate}
                disabledDate={current =>
                  current && current < moment().endOf('day')
                }
                layout={formLayouts.empty}
              />
            </div>
            <div className={'recurringWrapper'}>
              <RecurringEvent
                name={'Is This a Recurring Event ?'}
                localState={localState}
                setLocalState={setLocalState}
                dynamicState={dynamicState}
                layout={formLayouts.empty}
                notRequired
              />
            </div>
            <label>What time ?</label>
            <div className={'timeWrapper'}>
              <div className={'hidden'}>
                <AntTimePicker
                  name={'Start Time'}
                  use12Hours
                  format={'h:mm a'}
                  defaultOpenValue={moment('00:00:00', 'HH:mm')}
                  layout={formLayouts.empty}
                />
              </div>
              <p className="to">to</p>
              <div className={'hidden'}>
                <AntTimePicker
                  name={'End Time'}
                  use12Hours
                  format={'h:mm a'}
                  defaultOpenValue={moment('00:00:00', 'HH:mm')}
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

export default CreateEventPartTwo;
