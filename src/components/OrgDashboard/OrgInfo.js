import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Select } from 'antd';
import { StyledCard } from '../../styled';
import { useStateValue } from '../../hooks/useStateValue';

export const OrgInfo = ({ displayOrg, changeHandler }) => {
  const [{ org }] = useStateValue();

  const setDaysOpen = arr => {
    if (!arr) return '';
    switch (arr.length) {
      case 0:
        return 'We are never open. Sorry.';
      case 1:
        return `We are open on ${arr[0]}s.`;
      case 2:
        return `We are open on ${arr[0]}s and ${arr[1]}s.`;
      default:
        return `${arr[0]} - ${arr[arr.length - 1]}`;
    }
  };

  return (
    <OrgInfoDiv backgroundColor={'#E8E8E8'}>
      <Select
        defaultValue="select"
        onChange={changeHandler}
        value={displayOrg ? displayOrg.orgId : ''}
      >
        {org.userOrganizations.map(item => (
          <Select.Option key={item.orgId} value={item.orgId}>
            {item.organizationName}
          </Select.Option>
        ))}
      </Select>
      <div className={'org-top'}>
        <div className={'org-top-col'}>
          <h5>Org Info</h5>
          <span>{setDaysOpen(displayOrg.daysOfTheWeek)}</span>
          <span>
            {`${moment.unix(displayOrg.startTime).format('LT')} - 
              ${moment.unix(displayOrg.endTime).format('LT')}`}
          </span>
          <h3>Hours of operations:</h3>
          {displayOrg && (
            <h5>
              {displayOrg.daysOfTheWeek.map(day => {
                return <span className={'day'}>{day}</span>;
              })}
            </h5>
          )}
          {displayOrg && <h5>Opens: {displayOrg.startTime}</h5>}
          {displayOrg && <h5>Closes: {displayOrg.endTime}</h5>}
        </div>
        <div className={'org-top-col'}></div>
      </div>
    </OrgInfoDiv>
  );
};

const OrgInfoDiv = styled(StyledCard)`
  .org-top {
    display: flex;
    justify-content: space-around;
  }

  .org-top-col {
    display: flex;
    flex-direction: column;
  }
`;
export default OrgInfo;
