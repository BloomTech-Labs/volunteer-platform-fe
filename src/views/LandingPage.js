import React from 'react';
import styled from 'styled-components';
import heroImage from '../assets/hero.jpg'
export const LandingPage = () => {
  return (
    <div className="landingPageDiv">
      <StyledHeroDiv image={heroImage}>
        <div className="heroText">
            Test
          <input></input>
        </div>
      </StyledHeroDiv>
    </div>
  );
};

export default LandingPage;

const StyledHeroDiv = styled.div`
    height: 300px;
    background-position: center;
    background-repeat: cover;
    position: relative;

    div {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-505, -50%;
        color: white;
    }
`;
