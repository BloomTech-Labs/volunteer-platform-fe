import React from 'react';
import styled from 'styled-components';
import { WorksCard as Card } from './WorksCard';
import { Icon } from 'antd';
import testImage from '../../assets/404.jpg';

export const HowItWorks = () => {
  return (
    <StyledDiv>
      <h2>How it Works</h2>
      <div className="how-it-works-cards">
        <Card
          title="Find a Volunteer Event"
          image={testImage}
          info="Search by key terms, interests, cause areas, location -- and more! Sign up, compete with friends, do more good in the world."
        />
        <Icon type="right" />
        <Card
          title="Sign Up for the Event"
          image={testImage}
          info="Once you find what you want to do, sign ups are made simple -- expectations are communicated on the sign up. All you need is an account and we will guide you the rest of the way!"
        />
        <Icon type="right" />
        <Card
          title="Show up, have fun."
          image={testImage}
          info="Something something something..."
        />
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 60px 80px 60px;

  h2 {
    font-size: 24px;
    color: ${({ theme }) => theme.primary};
  }

  .how-it-works-cards {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
export default HowItWorks;
