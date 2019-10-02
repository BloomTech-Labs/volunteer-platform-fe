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
        onOk: () => submitForm(values)
    })
    confirmSubmit()
  };

  return (
    <ReviewDiv>
      <Icon
        type="save"
        theme="twoTone"
        twoToneColor="#005a87"
        onClick={onSubmit}
      />
      <Icon
        type="edit"
        theme="twoTone"
        twoToneColor="#005a87"
        onClick={setEdit}
      />
      <h4>Name</h4>
      <p>{storedData[1].nameOfOrganization}</p>
      <h4>Location</h4>
      <p>{storedData[1].streetAddress}</p>
      <p>
        {storedData[1].city},{storedData[1].state}
      </p>
      <h4>Cause(s)</h4>
      {storedData[1].typeOfCauses.map(cause => (
        <Tag key={cause}>{cause}</Tag>
      ))}
      <h4>Point of Contact</h4>
      {storedData[2].POC.map((poc, i) => {
        return (
          <div className="review-poc">
            <span>{i + 1}.</span>
            <div className="review-poc-info">
              {poc.fullName}
              <Icon type="mail" theme="twoTone" twoToneColor="#005a87" />
              {poc.email}
              <Icon type="phone" theme="twoTone" twoToneColor="#005a87" />
              {poc.phone}
            </div>
          </div>
        );
      })}
      <h4>Hours of Operation</h4>
      {setDaysOpen(storedData[3].daysOfTheWeek)}
      {storedData[3].startTime.format('LT')} -{' '}
      {storedData[3].endTime.format('LT')}
      <h4>About Your Organization</h4>
      <p>{storedData[4].aboutUs}</p>
      <h4>Website</h4>
      <p>{storedData[4].website}</p>
      <div className="buttonStyles">
        <StyledCancelButton onClick={cancelForm} type="primary">
          Cancel
        </StyledCancelButton>
        <StyledButton onClick={onSubmit} type="primary">
          Confirm
        </StyledButton>
      </div>
    </ReviewDiv>
  );
};

const ReviewDiv = styled.div`
  border: 3px solid ${({ theme }) => theme.gray2};
`;
export default Review;
