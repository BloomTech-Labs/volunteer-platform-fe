import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Select} from 'antd';
import {StyledCard} from '../../styled';
import {useStateValue} from '../../hooks/useStateValue';

export const OrgInfo = ({displayOrg, changeHandler}) => {
  const [{org}] = useStateValue();
  
  const setDaysOpen = arr => {
    if (!arr){
      return '';
    }
    const dayConversion = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const rC = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
    };
    let daysAsNum = arr.map(day => dayConversion[ day ]);
    
    let daySegments = [];
    let segment = [];
    for (let i = 0; i < daysAsNum.length; i++){
      segment.push(daysAsNum[ i ]);
      if (i < daysAsNum.length - 1 && daysAsNum[ i ] + 1 ===
        daysAsNum[ i + 1 ]){
        continue;
      }else{
        daySegments.push(segment);
        segment = [];
      }
    }
    let result = [];
    for (let i = 0; i < daySegments.length; i++){
      switch (daySegments[ i ].length){
        case 1:
          result.push(`${rC[ daySegments[ i ][ 0 ] ]}`);
          break;
        case 2:
          result.push(`${rC[ daySegments[ i ][ 0 ] ]}`);
          result.push(`${rC[ daySegments[ i ][ 1 ] ]}`);
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          result.push(
            `${rC[ daySegments[ i ][ 0 ] ]} - ${
              rC[ daySegments[ i ][ daySegments[ i ].length - 1 ] ]
              }`,
          );
          break;
      }
    }
    return result.join(', ');
  };
  
  return (
    <OrgInfoDiv backgroundcolor={'#E8E8E8'}>
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
                return <span key={day} className={'day'}>{day}</span>;
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
