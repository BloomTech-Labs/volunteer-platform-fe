import React from 'react';
import styled from 'styled-components';

export const ThirdRow = ({localState}) => {
  return (
    <StyledThirdRow>
      <div className="details">
        <h4>Details</h4>
        <p className='details-info'>{localState.eventDetails}</p>
      </div>
      <div className="map">
        <h4>Find us at</h4>
      </div>
    </StyledThirdRow>
  );
};

const StyledThirdRow = styled.div`
  width: 80%;
  margin: 0 auto 24px;
  min-height: 150px;
  display: flex;
  justify-content: space-between;

  .details, .map {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }

  .details{
    width: 65%;
    .details-info{
        background: white;
        border-radius: 4px;
        min-height: 200px;
    }
  }

  .map{
      width: 30%;
  }
`;

export default ThirdRow;
