import React, { useEffect } from 'react';
import { useStateValue } from '../hooks/useStateValue';
import { StyledButton } from '../styled';
import { createNewMessageThread, getOrganizationByOrgId } from '../actions';
import styled from 'styled-components';
import {
  OrgButtons,
  OrgPhoto,
  OrgInfo,
  EventPanel,
} from '../components/OrgDashboard';
import { Calendar, Select } from 'antd';
import moment from 'moment';

export const OrganizationProfile = ({ match, history }) => {
  const [{ org, auth }, dispatch] = useStateValue();

  useEffect(() => {
    getOrganizationByOrgId(match.params.id, dispatch);
  }, [match.params.id]);

  const createMessageThread = () => {
    const from = {
      type: 'users',
      uid: auth.googleAuthUser.uid,
    };

    const to = {
      type: 'organizations',
      uid: org.organization.orgId,
    };

    createNewMessageThread(to, from);
    history.push('/messages');
  };

  return (
    <StyledOrgProfile>
      <h4 className={'org-title'}>Dashboard of</h4>

      <StyledButton onClick={createMessageThread}>Message</StyledButton>
      <div className="inline"></div>
    </StyledOrgProfile>
  );
};

const StyledOrgProfile = styled.div``;
