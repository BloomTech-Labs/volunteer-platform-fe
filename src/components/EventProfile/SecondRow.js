import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

export const SecondRow = ({ localState }) => {
  const causes = localState.typesOfCauses.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const interest = localState.interest.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });

  const requirements = localState.volunteerRequirements.map(item => {
    return <Tag>{(item = [item])}</Tag>;
  });
  return (
    <StyledSecondRow>
      {localState.imageUrl && (
        <div className="photo">
          <img src={localState.imageUrl} alt={localState.orgName} />
        </div>
      )}
      <div className="tags">
        <h5>Interests: </h5>
        <div className="subtag">{interest}</div>
        <h5>Causes: </h5>
        <div className="subtag">{causes}</div>
        <h5>Requirements: </h5>
        <div className="subtag last">{requirements}</div>
      </div>
    </StyledSecondRow>
  );
};

const StyledSecondRow = styled.div`
  width: 80%;
  margin: 0 auto 24px;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5{
      font-weight: 600;
  }
  .photo {
    width: 30%;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .tags {
    width: 67%;
    padding-left: 5%;
    border: 2px solid ${({ theme }) => theme.gray6};
    border-radius: 4px;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .subtag {
      flex-direction: row;
      justify-content: flex-start;

      .ant-tag {
        background: ${({ theme }) => theme.primary8};
        color: white;
      }
    }
    .last {
      padding-bottom: 0.81em;
    }
  }
`;
export default SecondRow;
