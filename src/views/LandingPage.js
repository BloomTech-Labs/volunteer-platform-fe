import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import heroImage from '../assets/hero_image4.png';
import {device} from '../styled/deviceBreakpoints';
import {
  HowItWorks, TopVolunteers, TopNonProfits,
} from '../components/LandingPage';

export const LandingPage = () => {
  return (<>
    <StyledHeroDiv image={heroImage}>
      <HeroContent>
        <p>Meet new friends, give back to the community.</p>
        <p>Win-win.</p>
        <button>
          <Link to="/dashboard">Get Started</Link>
        </button>
      </HeroContent>
    </StyledHeroDiv>
    <ContentDiv>
      <HowItWorks/>
      <TopVolunteers/>
      <TopNonProfits/>
    </ContentDiv>
  </>);
};

export default LandingPage;

const StyledHeroDiv = styled.div`
  height: 50vh;
  width: 100vw;
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
    @media ${device.tablet} {
      background-position: 50% 50%;
    }
  }
`;

const HeroContent = styled.div`
  width: 100%;
  text-align: left;
  margin: 0 0 0 6rem;
  color: white;
  z-index: 10;
  padding: 0px 10px;

  @media ${device.laptop} {
  }

  @media ${device.tablet} {
  }

  & h1,
  p {
    color: white;
    margin: 0;
    font-size: 24px;
  }

  button {
    background: ${({theme}) => theme.accent};
    border-radius: 5px;
    padding: 10px 20px;
    border: 0;
    cursor: pointer;
    font-family: 'Arvo', serif;
    width: 165px;
    font-size: 20px;
    margin-top: 30px;

    &:hover {
      text-decoration: underline;
      background: ${({theme}) => theme.accent7};
    }

    a {
      color: white;
    }
  }
`;

const ContentDiv = styled.div`
  max-width: 1305px;
  margin: 0 auto;
`;
