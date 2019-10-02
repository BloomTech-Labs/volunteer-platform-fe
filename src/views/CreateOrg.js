import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { registerOrganization, updateOrganization } from '../actions';
import createOrgImg from '../assets/undraw_unexpected_friends.svg';
import moment from 'moment';
import {
  FirstPart,
  SecondPart,
  ThirdPart,
  LastPart,
  Review,
} from '../components/CreateOrg';
import { Steps } from 'antd';

const { Step } = Steps;
export const CreateOrg = props => {
  const [state, dispatch] = useStateValue();
  const [localState, setLocalState] = useState({ 1: {}, 2: {}, 3: {}, 4: {} });
  const [partCount, setPartCount] = useState(1);

  // Need to revisit how we want to edit the form
  //   const [orgToEdit, setOrgToEdit] = useState();
  //   useEffect(() => {
  //     if (props.location.state) {
  //       setOrgToEdit(props.location.state.org);
  //       if (props.location.state.org.firstName2) {
  //         setNumberOfPOC(2);
  //       }
  //     }
  //   }, [props.location.state]);

  const possibleHeaders = {
    1: "Let's Set Up Your Organization",
    2: "Let's Set Up Your Organization",
    3: 'Almost Finished Setting Up',
    4: 'Last Part!',
  };

  const possibleParts = {
    1: FirstPart,
    2: SecondPart,
    3: ThirdPart,
    4: LastPart,
    5: Review,
  };

  const steps = [0, 1, 2, 3];

  const RenderedPart = possibleParts[partCount];

  const clickNext = values => {
    if (values.startTime) values.startTime = moment(values.startTime).unix();
    if (values.endTime) values.endTime = moment(values.endTime).unix();
    if (partCount === 2) {
      let contactCount = 0;
      let POC = [];
      for (let key in values) {
        if (/fullName/.test(key)) contactCount++;
      }
      for (let i = 1; i <= contactCount; i++) {
        POC.push({
          email: values[`email${i}`],
          phone: values[`phone${i}`],
          fullName: values[`fullName${i}`],
        });
      }
      values.POC = POC;
    }
    if (partCount === 3) {
      let weekends = values.weekends || [];
      let weekdays = values.weekdays || [];
      values.daysOfTheWeek = [...weekdays, ...weekends];
    }
    setLocalState({ ...localState, [partCount]: values });
    setPartCount(partCount => partCount + 1);
  };

  const clickPrevious = () => {
    setPartCount(partCount => partCount - 1);
  };
  const cancelForm = e => {};

  const submitForm = values => {
    const org = {
      ...values,
      organizationOwnerUID: state.auth.googleAuthUser.uid,
    };
    for (let key in org) {
      if (org[key] === undefined) {
        delete org[key];
      }
    }
    // if (orgToEdit) {
    //   updateOrganization(orgToEdit.orgId, org, dispatch);
    // } else {
    //   registerOrganization(org, dispatch);
    // }
    // props.history.push('/org-dashboard');
    console.log(values);
  };

  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard margin="2rem 0 5rem 0" maxWidth="900px">
        <h1 className="create-org-header">{possibleHeaders[partCount]}</h1>
        <StyledImg src={createOrgImg} alt="undraw unexpected friends" />
        <Steps current={partCount - 1} progressDot size="small">
          {steps.map(step => (
            <Step key={step} />
          ))}
        </Steps>
        <StyledRenderDiv>
          <RenderedPart
            clickNext={clickNext}
            storedData={localState[partCount] || localState}
            cancelForm={cancelForm}
            clickPrevious={clickPrevious}
            submitForm={submitForm}
            // setEdit={setEdit}
          />
        </StyledRenderDiv>
      </CustomStyledCard>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background: white;
  .create-org-header {
    color: ${props => props.theme.primary8};
  }
`;

const CustomStyledCard = styled(StyledCard)`
  &&& {
    background: #d9d9d9;
    text-align: center;
    cursor: default;
    transition: none;

    .ant-steps {
      text-align: left;
      margin-bottom: 40px;

      .ant-steps-item-finish
        > .ant-steps-item-container
        > .ant-steps-item-tail {
        &::after {
          background: ${({ theme }) => theme.primary8};
        }
      }
      span.ant-steps-icon-dot {
        background: ${({ theme }) => theme.primary8};
      }
    }
  }
`;

const StyledRenderDiv = styled.div`
  background: ${({ theme }) => theme.gray4};
  width: 75%;
  margin: 0 auto;
  font-weight: bold;
  padding: 1.5rem 3rem;
  border-radius: ${({ theme }) => theme.borderRadiusDefault};

  label {
    color: ${({ theme }) => theme.primary8};

    &::before {
      color: ${({ theme }) => theme.primary8};
    }
  }

  .buttonStyles {
    display: flex;
    width: 60%;
    margin: 50px auto;
    justify-content: space-between;
  }
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateOrg;
