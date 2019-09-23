import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroImage from '../assets/hero_image4.png';
import { device } from '../styled/deviceBreakpoints';
import {
  HowItWorks,
  TopVolunteers,
  TopNonProfits,
} from '../components/LandingPage';

export const LandingPage = () => {
  return (
    <>
      <StyledHeroDiv image={heroImage}>
        <HeroContent>
          <h3>Meet new friends, give back to the community.</h3>
          <h3>Win-win.</h3>
          <button>
            <Link to="/dashboard">Get Started</Link>
          </button>
        </HeroContent>
      </StyledHeroDiv>
      <HowItWorks />
      <TopVolunteers />
      <TopNonProfits />
    </>
  );
};

export default LandingPage;

const StyledHeroDiv = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  position: relative;
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
    background-position: 100% 75%;
    filter: brightness(90%);
    @media ${device.tablet}{
        background-position: 50% 50%;
    }
  }
`;

const HeroContent = styled.div`
  text-align: left;
  position: relative;
  left: -20%;
  margin-left: 10px;
  color: white;
  margin: 10px;

  @media ${device.laptop}{
      left: -10%;
  }

  @media ${device.tablet}{
      width: 43%;
  }

  & h1,
  h3 {
    color: white;
  }

  button {
    background: ${({ theme }) => theme.accent};
    border-radius: 5px;
    padding: 10px 20px;
    border: 0;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    a {
      color: white;
    }
  }
`;
