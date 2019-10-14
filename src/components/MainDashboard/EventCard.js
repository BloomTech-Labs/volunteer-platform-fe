import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledCard, StyledButton } from '../../styled';
import { useStateValue } from '../../hooks/useStateValue';
import moment from 'moment';
import { Tag } from 'antd';

export const EventCard = ({ event }) => {
  const causes = event.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const interest = event.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const requirements = event.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  console.log(event)
  return (
      <StyledEventCard margin={'0 0 20px 0'}>
        
      </StyledEventCard>
  );
};

const StyledEventCard = styled(StyledCard)`
  margin-bottom: 20px;
  .ant-card-body {
    width: 100%;
  }
  .head {
    padding-bottom: 10px;
  }
  .date {
    display: flex;
    justify-content: space-evenly;
    text-align: justify;
  }
`;
export default EventCard;
