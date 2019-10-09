import React from 'react';
import styled from 'styled-components';

export const ThirdRow = () => {
  return (
    <StyledThirdRow>
      <div className="details">
        <h5>Details</h5>
      </div>
      <div className="map">
        <h5>Find us at</h5>
      </div>
    </StyledThirdRow>
  );
};

const StyledThirdRow = styled.div`
  width: 80%;
  margin: 0 auto 24px;
  min-height: 150px;
`;

export default ThirdRow;
