import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledCard } from '../styled';
import { useStateValue } from '../hooks/useStateValue';
import { registerOrganization, updateOrganization } from '../actions';
import createOrgImg from '../assets/undraw_unexpected_friends.svg';
import {
  FirstPart,
  SecondPart,
  ThirdPart,
  LastPart,
} from '../components/CreateOrg';
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
  const clickNext = values => {};

  const cancelForm = e => {};
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
    registerOrganization(org, dispatch)
    props.history.push('/org-dashboard');
  };
console.log(possibleParts[partCount])
  return (
    <StyledDiv className={'flex center'}>
      <CustomStyledCard style={{ maxWidth: '900px', margin: '2rem 0 5rem 0' }}>
        <StyledImg src={createOrgImg} alt="undraw unexpected friends" />
        <h1>{possibleHeaders[partCount]}</h1>
        <div>{possibleParts[partCount]}<FirstPart /></div>
      </CustomStyledCard>
    </StyledDiv>
  );
};

const StyledCreateOrgForm = styled.div`
  margin-top: 2rem;
  width: 100%;
  font-weight: bold;
  .inline {
    width: 50%;
  }

  .time {
    display: flex;
    justify-content: space-around;
  }

  .styledGroup {
    margin: 3rem;
    background-color: #e8e8e8;
    border-radius: 3px;
    padding: 2rem;
  }

  .DaysOfWeek {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .mg-tp-lg {
    margin-top: 4rem;
  }
  label {
    color: ${props => props.theme.primary8};
  }
`;

const StyledDiv = styled.div`
  background: white;
  h1 {
    color: ${props => props.theme.primary8};
  }

  h4 {
    color: ${props => props.theme.primary8};
  }
`;

const CustomStyledCard = styled(StyledCard)`
  &&& {
    background: #d9d9d9;
    text-align: center;
    cursor: default;
    transition: none;

    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }
`;

const StyledLine = styled.div`
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
`;

const StyledImg = styled.img`
  width: 211px;
  margin: 2rem auto;
`;

export default CreateOrg;
