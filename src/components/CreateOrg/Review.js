import React from 'react';
import styled from 'styled-components';
import { Icon, Tag } from 'antd';
import { setDaysOpen } from '../../utility/setDaysOpen';
import { StyledButton, StyledCancelButton, confirmModal } from '../../styled';

export const Review = ({
  storedData,
  cancelForm,
  submitForm,
  setEdit,
  localState,
}) => {
  const onSubmit = e => {
    e.preventDefault();
    let values = {
      POC: storedData.POC || [],
      aboutUs: storedData.aboutUs || '',
      causeAreas: storedData.causeAreas || [],
      city: storedData.city || '',
      streetAddress: storedData.streetAddress || '',
      state: storedData.state || '',
      weekdayOptions: storedData.weekdayOptions || '',
      daysOfTheWeek: storedData.daysOfTheWeek || [],
      startTime: storedData.startTime.unix() || '',
      endTime: storedData.endTime.unix() || '',
      organizationName: storedData.organizationName || '',
      website: storedData.website || '',
    };

    const confirmSubmit = confirmModal({
      title: 'Creating Your Organization',
      content: 'Please ensure all the information is correct.',
      onOk: () => submitForm(values),
    });
    confirmSubmit();
  };
  console.log(storedData);
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
              onClick={() => setEdit({ ...storedData })}
            />
            <span>Edit</span>
          </div>
        </div>
        <InfoDiv>
          <h4>Name</h4>
          <p>{storedData.nameOfOrganization}</p>
          <h4>Location</h4>
          <p className="no-margin">{storedData.streetAddress}</p>
          <p>
            {storedData.city}, {storedData.state}
          </p>
          <h4>Cause(s)</h4>
          <div className="cause-tags">
            {storedData.causeAreas.map(cause => (
              <Tag key={cause}>{cause}</Tag>
            ))}
          </div>
          {storedData.POC.length > 0 && (
            <>
              <h4>Point of Contact(s)</h4>
              {storedData.POC.map((poc, i) => {
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
          {(storedData.daysOfTheWeek.length > 0 ||
            storedData.startTime ||
            storedData.endTime) && (
            <>
              <h4>Hours of Operation</h4>
              <div className="hours-operation">
                {storedData.daysOfTheWeek && (
                  <p>{setDaysOpen(storedData.daysOfTheWeek)}</p>
                )}
                {storedData.startTime && (
                  <p>{`${storedData.startTime.format(
                    'LT'
                  )} - ${storedData.startTime.format('LT')}`}</p>
                )}
              </div>
            </>
          )}

          {storedData.aboutUs && (
            <>
              <h4>About Your Organization</h4>
              <p>{storedData.aboutUs}</p>
            </>
          )}
          {storedData.website && (
            <>
              <h4>Website</h4>
              <p>{storedData.website}</p>
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
    padding-right: 20%;
    width: 35%;
    display: flex;
    justify-content: space-between;

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
      cursor: pointer;
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
