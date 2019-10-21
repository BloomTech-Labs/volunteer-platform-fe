import React from 'react';
import styled from 'styled-components';
import { Tag, Row, Col } from 'antd';

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
    <StyledSecondRow type='flex' justify='space-between' align='stretch'>
      <Col className="photo" span={6}>
        {localState.imageUrl ? (
          <img src={localState.imageUrl} alt={localState.orgName} />
        ) : (
          <div className='placeholder-photo'></div>
        )}
      </Col>
      <Col className="tags" span={18}>
        <h5>Cause Area(s): </h5>
        <div className="subtag">{causes}</div>
        <h5>Interests: </h5>
        <div className="subtag">{interest}</div>
        <h5>Requirement(s): </h5>
        <div className="subtag last">{requirements}</div>
      </Col>
    </StyledSecondRow>
  );
};

const StyledSecondRow = styled(Row)`
  && {
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
    min-height: 150px;
  }

  h5 {
    font-weight: 600;
  }

  .photo {

    .placeholder-photo {
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
    }

    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .tags {
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    padding: 1rem 2rem;

    .subtag {
      flex-direction: row;
      justify-content: flex-start;

      .ant-tag {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .last {
      padding-bottom: 0.81em;
    }
  }
`;
export default SecondRow;
