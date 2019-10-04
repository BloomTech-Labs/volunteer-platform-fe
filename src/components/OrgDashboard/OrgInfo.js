import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Icon } from 'antd';
import { StyledCard } from '../../styled';
import { setDaysOpen } from '../../utility/setDaysOpen';

export const OrgInfo = ({ displayOrg }) => {
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
                  {contact.fullName
                    ? `${contact.fullName}`
                    : `${contact.firstName} ${contact.lastName}`}
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
                {contact.phone && (
                  <>
                    <div className="poc-info">
                      <Icon
                        type="phone"
                        theme="twoTone"
                        twoToneColor={'#005a87'}
                        className="icon"
                      />
                      {contact.phone}
                    </div>
                  </>
                )}
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
      justify-content: space-between;
      align-items: center;

      .poc-name {
        min-width: 30%;
        margin-bottom: 5px;
      }

      .poc-info {
        display: flex;
        align-items: center;
        min-width: 30%;
      }
    }
  }
`;
export default OrgInfo;
