import React from 'react';
import styled from 'styled-components';
import {Descriptions, Tag} from 'antd';

export const OrganizationInfo = (props) => {
  let causeAreas = props.org.causeAreas && props.org.causeAreas.map(cause => {
    return <Tag>{`${cause}`}</Tag>;
  });
  return (<StyledDiv>
      
      <Col>
        <h1>CauseAreas</h1>
        {causeAreas}
      </Col>
    
    </StyledDiv>
  
  );
};

const StyledDiv = styled.div`
display: flex;
width: 100%;

`;

const Row = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;

const Col = styled.div`

`;

export default OrganizationInfo;