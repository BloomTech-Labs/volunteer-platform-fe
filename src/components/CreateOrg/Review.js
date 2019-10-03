import React from 'react';
import styled from 'styled-components';
import { Icon, Tag } from 'antd';
import { setDaysOpen } from '../../utility/setDaysOpen';
import moment from 'moment';
import { StyledButton, StyledCancelButton, confirmModal } from '../../styled';
export const Review = ({ storedData, cancelForm, submitForm, setEdit }) => {
  const onSubmit = e => {
    e.preventDefault();
    let values = {
      POC: storedData[2].POC || [],
      aboutUs: storedData[4].aboutUs || '',
      causeAreas: storedData[1].typeOfCauses || [],
      city: storedData[1].city || '',
      streetAddress: storedData[1].streetAddress || '',
      state: storedData[1].state || '',
      daysOfTheWeek: storedData[3].daysOfTheWeek || [],
      startTime: storedData[3].startTime.unix() || '',
      endTime: storedData[3].endTime.unix() || '',
      organizationName: storedData[1].nameOfOrganization || '',
      website: storedData[4].website || '',
    };

    const confirmSubmit = confirmModal({
      title: 'Creating Your Organization',
      content: 'Please ensure all the information is correct.',
      onOk: () => submitForm(values),
    });
    confirmSubmit();
  };

  return (
    <>
      <ReviewDiv>
        <div className="form-icons">
          <div className="col">
            <Icon
              type="save"
              theme="twoTone"
              twoToneColor="#005a87"
              onClick={onSubmit}
            />
            <span>Save</span>
          </div>
          <div className="col">
            <Icon
              type="edit"
              theme="twoTone"
              twoToneColor="#005a87"
              onClick={setEdit}
            />
            <span>Edit</span>
          </div>
        </div>
        <InfoDiv>
          <h4>Name</h4>
          <p>{storedData[1].nameOfOrganization}</p>
          <h4>Location</h4>
          <p className="no-margin">{storedData[1].streetAddress}</p>
          <p>
            {storedData[1].city},{storedData[1].state}
          </p>
          <h4>Cause(s)</h4>
          <div className="cause-tags">
            {storedData[1].typeOfCauses.map(cause => (
              <Tag key={cause}>{cause}</Tag>
            ))}
          </div>
          {storedData[2].POC.length > 0 && (
            <>
              <h4>Point of Contact</h4>
              {storedData[2].POC.map((poc, i) => {
                return (
                  <div className="review-poc">
                    <span>{i + 1}.</span>
                    <div className="review-poc-info">
                      <div className="poc-item">
                        <p className="no-margin no-padding">{poc.fullName}</p>
                      </div>
                      <div className="poc-item">
                        <Icon
                          type="mail"
                          theme="twoTone"
                          twoToneColor="#005a87"
                        />
                        <p className="no-margin">{poc.email}</p>
                      </div>
                      <div className="poc-item">
                        <Icon
                          type="phone"
                          theme="twoTone"
                          twoToneColor="#005a87"
                        />
                        <p>{poc.phone}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {(storedData[3].daysOfTheWeek.length > 0 ||
            storedData[3].startTime ||
            storedData[3].endTime) && (
            <>
              <h4>Hours of Operation</h4>
              <div className="hours-operation">
              {storedData[3].daysOfTheWeek && (
                <p>{setDaysOpen(storedData[3].daysOfTheWeek)}</p>
              )}
              {storedData[3].startTime && (
                <p>{`${storedData[3].startTime.format(
                  'LT'
                )} - ${storedData[3].startTime.format('LT')}`}</p>
              )}
              </div>
            </>
          )}

          {storedData[4].aboutUs && (
            <>
              <h4>About Your Organization</h4>
              <p>{storedData[4].aboutUs}</p>
            </>
          )}
          {storedData[4].website && (
            <>
              <h4>Website</h4>
              <p>{storedData[4].website}</p>
            </>
          )}
        </InfoDiv>
      </ReviewDiv>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
        </StyledCancelButton>
        <StyledButton onClick={onSubmit} type="primary">
          Confirm
        </StyledButton>
      </div>
    </>
  );
};

const ReviewDiv = styled.div`
  border: 3px solid ${({ theme }) => theme.gray2};
  display: flex;
  flex-direction: column;

  .form-icons {
    align-self: flex-end;
    padding-right: 10%;
    width: 20%;
    display: flex;
    justify-content: space-evenly;

    .col {
      display: flex;
      flex-direction: column;

      span {
        padding-top: 10px;
      }
    }
    i {
      font-size: 25px;
      padding-top: 10px;
    }
  }
`;

const InfoDiv = styled.div`
  padding: 0px 20% 40px;
  text-align: left;
  h4 {
    margin: 0;
    font-size: 17px;
  }

  p {
    margin: 0;
    margin-bottom: 20px;
    padding-left: 14px;
    font-weight: 200;
  }

  .no-margin {
    margin: 0;
  }

  .no-padding {
    padding-left: 0px;
  }
  .cause-tags {
    display: flex;
    flex-wrap: wrap;
    width: 80%;

    justify-content: space-around;
    margin-bottom: 10px;
    align-content: space-around;

    span {
      margin-bottom: 10px;
    }
  }

  .review-poc {
    display: flex;
    justify-content: flex-start;
    padding-left: 14px;

    .review-poc-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 14px;

      .poc-item {
        display: flex;
        justify-content: space-around;
      }
    }
  }

  .hours-operation {
    display: flex;
    justify-content: space-around;
  }
`;
export default Review;
