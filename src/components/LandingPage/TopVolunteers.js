import React from 'react';
import { Icon, Card } from 'antd';
import styled from 'styled-components';
import volunteerPic1 from '../../assets/volunteerPic1.png';
import volunteerPic2 from '../../assets/volunteerPic2.png';
import volunteerPic3 from '../../assets/volunteerPic3.png';
import volunteerPic4 from '../../assets/volunteerPic4.png';

export const TopVolunteers = () => {
  const { Meta } = Card;
  
  return (
    <StyledDiv>
      <h2>Leading Volunteers<Icon type="fire" theme='twoTone' twoToneColor='#FA8C16' /></h2>
      <div className='volunteer-cards'>
        <StyledCard
          cover={<img src={volunteerPic1} alt='volunteer1'/>}
        >
          <Meta title='Samira L.' description='10.25 hours/mo.'></Meta>
        </StyledCard>
        <StyledCard
          cover={<img src={volunteerPic2} alt='volunteer2'/>}
        >
          <Meta title='Henry R.' description='10 hours/mo.'></Meta>
        </StyledCard>
        <StyledCard
          cover={<img src={volunteerPic3} alt='volunteer3'/>}
        >
          <Meta title='Marielle W.' description='9.5 hours/mo.'></Meta>
        </StyledCard>
        <StyledCard
          cover={<img src={volunteerPic4} alt='volunteer4'/>}
        >
          <Meta title='Shawn B.' description='9.5 hours/mo.'></Meta>
        </StyledCard>
        <h6><Icon type="reconciliation" />More Volunteers</h6>
      </div>
    </StyledDiv>
  )
}

export default TopVolunteers

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  h2 {
    font-size: 24px;
    color: ${({ theme }) => theme.primary8};
    margin: 60px 0 40px 0;
  }

  .volunteer-cards {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 40px;

    .ant-card-body {
      padding: 4px;
    }

    h6 {
      margin: 1rem;
      color: ${({ theme }) => theme.gray7};
      font-size: 0.9rem;
      width: 150px;
    }
  }
`

const StyledCard = styled(Card)`
  background: #FFF7E6;
  width: 210px;
  margin: 1rem 0.9rem;

  .ant-card-meta-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

    .ant-card-meta-title {
      margin: 0;
    }

    .ant-card-meta-description {
      color: ${({ theme }) => theme.accent6};
      font-size: 0.8rem;
      font-style: italic;
    }
  }
`
