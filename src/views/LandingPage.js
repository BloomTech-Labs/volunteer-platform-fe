import React from 'react';
import styled from 'styled-components';
import heroImage from '../assets/hero.jpg';

export const LandingPage = () => {
  return (
    <StyledHeroDiv image={heroImage}>
      <HeroContent>
        <h3>Meet new friends, give back to the community.</h3>
        <h3>Win-win.</h3>
        <button>Get Started</button>
      </HeroContent>
    </StyledHeroDiv>
  );
};

export default LandingPage;

const StyledHeroDiv = styled.div`
  height: 50vh;
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 15%;
    filter: brightness(60%);
  }
`;

const HeroContent = styled.div`
  text-align: left;
  position: relative;
  left: -30%;
  color: white;
  margin: 10px;

  h1{
    color: white;
  }

  h3{
    color: white;
  }

  button {
    background-color: ${({theme}) => theme.accent};
  }
`;

