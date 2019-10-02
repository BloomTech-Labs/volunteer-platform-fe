import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { registerOrganization, updateOrganization } from '../actions';
import createOrgImg from '../assets/undraw_unexpected_friends.svg';
import { ProgressBar } from '../components';
import {
  FirstPart,
  SecondPart,
  ThirdPart,
  LastPart,
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
  };

  const steps = [0, 1, 2, 3];

  const RenderedPart = possibleParts[partCount];

  const clickNext = values => {
    setLocalState({ ...localState, [partCount]: values });
    setPartCount(partCount => partCount + 1);
  };

  const cancelForm = e => {};

  const clickPrevious = () => {
    setPartCount(partCount => partCount - 1);
  };

  const onSubmit = values => {
    let POC = [];
    POC.push({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    });
    if (values.email2) {
      POC.push({
        email: values.email2,
        firstName: values.firstName2,
        lastName: values.lastName2,
      });
    }
    const org = {
      ...values,
      POC,
      organizationOwnerUID: state.auth.googleAuthUser.uid,
      startTime: values.startTime.unix(),
      endTime: values.endTime.unix(),
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
    registerOrganization(org, dispatch);
    props.history.push('/org-dashboard');
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
            storedData={localState[partCount]}
            cancelForm={cancelForm}
            clickPrevious={clickPrevious}
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
