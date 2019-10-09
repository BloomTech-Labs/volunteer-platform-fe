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
        <h5 className='first'>Interests: </h5>
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

  .first{
      margin-top: 0;
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
    padding-top: 0.4em;
    padding-bottom: 0.4em;

    .subtag {
      flex-direction: row;
      justify-content: flex-start;

      .ant-tag{
          background: ${({theme}) => theme.primary8};
          color: white;
      }
    }
  }
`;
export default SecondRow;
