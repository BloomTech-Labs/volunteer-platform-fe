import React from 'react';
import { Icon, Card } from 'antd';
import styled from 'styled-components';
import orgPic1 from '../../assets/orgPic1.png';
import orgPic2 from '../../assets/orgPic2.png';
import orgPic3 from '../../assets/orgPic3.png';
import orgPic4 from '../../assets/orgPic4.png';

export const TopNonProfits = () => {
  const { Meta } = Card;

  return (
    <StyledDiv>
      <h2>Our Featured Organizations<Icon type="thunderbolt" theme='twoTone' twoToneColor='#FA8C16'/></h2>
      <div className='nonprofits-cards'>
        <StyledCard
          cover={<img src={orgPic1} alt='nonprofit-org1'/>}
        >
          <Meta title='UrbanYouthFilm' description='4.5/5'></Meta>
        </StyledCard>
        <StyledCard
          cover={<img src={orgPic2} alt='nonprofit-org2'/>}
        >
          <Meta title='ASPCA-LA' description='4.5/5'></Meta>
        </StyledCard>
        <StyledCard
          cover={<img src={orgPic3} alt='nonprofit-org3'/>}
        >
          <Meta title='St.Painters' description='4/5'></Meta>
        </StyledCard>
        <StyledCard
          cover={<img src={orgPic4} alt='nonprofit-org4'/>}
        >
          <Meta title='Penfriends' description='4/5'></Meta>
        </StyledCard>
        <h6><Icon type="project" />More Organizations</h6>
      </div>
    </StyledDiv>
  )
}

export default TopNonProfits

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  h2 {
    font-size: 24px;
    color: ${({ theme }) => theme.primary8};
    margin: 60px 0 40px 0;
  }

  .nonprofits-cards {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;

    .ant-card-body {
      padding: 4px;
    }

    .ant-card-meta-detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;

      .ant-card-meta-title {
        margin: 0;
        font-size: 1.4rem;
      }
  
      .ant-card-meta-description {
        color: ${({ theme }) => theme.primary7};
        font-size: 0.8rem;
        font-style: italic;
      }
    }

    h6 {
      margin: 0;
      color: ${({ theme }) => theme.gray7};
      font-size: 0.9rem;
      width: 150px;
    }
  }
`

const StyledCard = styled(Card)`
  margin: 0 1rem;
  background: #FFF7E6;
`