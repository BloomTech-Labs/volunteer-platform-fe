import React from 'react';
import styled from 'styled-components';
import { Tag, Col } from 'antd';
import {StyledCard} from '../../styled'

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
        <Col className="photo" span={6}>
          <img src={localState.imageUrl} alt={localState.orgName} />
        </Col>
      )}
      <Col className="tags" span={18}>
        <h5>Interests: </h5>
        <div className="subtag">{interest}</div>
        <h5>Causes: </h5>
        <div className="subtag">{causes}</div>
        <h5>Requirements: </h5>
        <div className="subtag last">{requirements}</div>
      </Col>
    </StyledSecondRow>
  );
};

const StyledSecondRow = styled(StyledCard)`
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5{
      font-weight: 600;
  }
  .photo {
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .tags {
    padding-left: 5%;
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
