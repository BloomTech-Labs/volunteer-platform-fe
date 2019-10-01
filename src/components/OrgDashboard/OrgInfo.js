import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from 'antd';
import { StyledCard } from '../../styled';

export const OrgInfo = ({ displayOrg }) => {
  const setDaysOpen = arr => {
    if (!arr) {
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
    let daysAsNum = arr.map(day => dayConversion[day]);

    let daySegments = [];
    let segment = [];
    for (let i = 0; i < daysAsNum.length; i++) {
      segment.push(daysAsNum[i]);
      if (i < daysAsNum.length - 1 && daysAsNum[i] + 1 === daysAsNum[i + 1]) {
        continue;
      } else {
        daySegments.push(segment);
        segment = [];
      }
    }
    let result = [];
    for (let i = 0; i < daySegments.length; i++) {
      switch (daySegments[i].length) {
        case 1:
          result.push(`${rC[daySegments[i][0]]}`);
          break;
        case 2:
          result.push(`${rC[daySegments[i][0]]}`);
          result.push(`${rC[daySegments[i][1]]}`);
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          result.push(
            `${rC[daySegments[i][0]]} - ${
              rC[daySegments[i][daySegments[i].length - 1]]
            }`
          );
          break;
      }
    }
    return result.join(', ');
  };
  console.log(displayOrg);
  return (
    <OrgInfoDiv
      backgroundcolor={'#E8E8E8'}
      borderRadius={'0px'}
      margin={'0 0 40px 0'}
    >
      <h5 style={{ marginBottom: '5px' }}>Org Info</h5>
      <div className="upper-info">
        <div className="hours-of-op">
          <span>{setDaysOpen(displayOrg.daysOfTheWeek)} </span>
          <span>
            {`${moment.unix(displayOrg.startTime).format('LT')} - 
              ${moment.unix(displayOrg.endTime).format('LT')}`}
          </span>
        </div>
        <div className="location">
          <Icon
            type="environment"
            theme={'twoTone'}
            twoToneColor={'#005a87'}
            className={'icon'}
          />
          <span>{`${displayOrg.city} ${displayOrg.state}`}</span>
        </div>
      </div>
      <h5 style={{ margin: '20px 0 5px' }}>
        Contact{displayOrg.POC && displayOrg.POC.length > 1 ? 's' : ''}
      </h5>
      <div className="lower-info">
        {displayOrg.POC &&
          displayOrg.POC.map(contact => {
            return (
              <div className="poc">
                <div className="poc-name">
                  {contact.firstName} {contact.lastName}
                </div>
                <div className="poc-info">
                  <Icon
                    type="mail"
                    theme="twoTone"
                    twoToneColor={'#005a87'}
                    className="icon"
                  />
                  {contact.email}
                </div>
              </div>
            );
          })}
      </div>
    </OrgInfoDiv>
  );
};

const OrgInfoDiv = styled(StyledCard)`
  .upper-info {
    display: flex;
    align-items: center;
  }

  .hours-of-op {
    display: flex;
    flex-direction: column;
    min-width: 50%;
  }

  .location {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 45%;
  }

  .icon {
    font-size: 30px;
    padding-right: 10px;
  }

  .lower-info {
    display: flex;
    flex-direction: column;

    .poc {
      display: flex;
      align-items: center;
      .poc-name {
        min-width: 50%;
        padding-right: 20%;
        margin-bottom: 5px;
      }

      .poc-info {
        display: flex;
        align-items: center;
      }
    }
  }
`;
export default OrgInfo;
