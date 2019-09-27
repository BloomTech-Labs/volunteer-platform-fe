import React, {useEffect} from 'react';
import {Icon, Card} from 'antd';
import styled from 'styled-components';
import orgPic1 from '../../assets/orgPic1.png';
import orgPic2 from '../../assets/orgPic2.png';
import orgPic3 from '../../assets/orgPic3.png';
import orgPic4 from '../../assets/orgPic4.png';
import {useStateValue} from '../../hooks/useStateValue';
import {getTopOrganizations} from '../../actions/organization';

export const TopNonProfits = () => {
  const {Meta} = Card;
  const [state, dispatch] = useStateValue();
  
  useEffect(() => {
    getTopOrganizations(dispatch);
  }, []);
  
  const hardCodedPics = {
      0: orgPic1,
      1: orgPic2,
      2: orgPic3,
      3: orgPic4
  }
  return (
    <StyledDiv>
      <h2>Our Featured Organizations<Icon type="thunderbolt" theme='twoTone'
                                          twoToneColor='#FA8C16'/></h2>
      <div className='nonprofits-cards'>
        
        {state.org.topOrganizations &&
        state.org.topOrganizations.map((org, i) => {
          if (i < 4){
            return (
              <StyledCard key={org.orgId}
                          cover={<img src={org.imageUrl || hardCodedPics[i]} alt='nonprofit-org1'/>}
              >
                <Meta title={org.organizationName} description='4.5/5'></Meta>
              </StyledCard>
            );
          }
        })}
        
        <h6><Icon type="project"/>More Organizations</h6>
      </div>
    </StyledDiv>
  );
};

export default TopNonProfits;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  h2 {
    font-size: 24px;
    color: ${({theme}) => theme.primary8};
    margin: 60px 0 40px 0;
  }

  .nonprofits-cards {
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
      color: ${({theme}) => theme.gray7};
      font-size: 0.9rem;
      width: 150px;
    }
  }
`;

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
      color: ${({theme}) => theme.primary7};
      font-size: 0.8rem;
      font-style: italic;
    }
  }
`;