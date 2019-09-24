import React from 'react';
import styled from 'styled-components';
import { Descriptions, Tag } from 'antd';

export const OrganizationInfo = ( props ) => {
  let causeAreas = props.org.causeAreas && props.org.causeAreas.map( cause => {
    return <Tag>{ `${ cause }` }</Tag>;
  } );
  return ( <StyledDiv>
      <Descriptions title={ props.org.organizationName }>
        <Descriptions.Item
          label='Cause Areas'>{ causeAreas }</Descriptions.Item>
        <Descriptions.Item
          label='Mission Statement'>{ props.org.missionStatement }</Descriptions.Item>
        <Descriptions.Item
          label='About us'>{ props.org.aboutUs }</Descriptions.Item>
        <Descriptions.Item
          label={ 'Start Time' }>{ props.org.startTime }</Descriptions.Item>
        <Descriptions.Item
          label={ 'End Time' }>{ props.org.endTime }</Descriptions.Item>
        <Descriptions.Item label='City'>{ props.org.city }</Descriptions.Item>
        <Descriptions.Item label='State'>{ props.org.state }</Descriptions.Item>
        <Descriptions.Item label='Email'>{ props.org.email }</Descriptions.Item>
        <Descriptions.Item label='Phone'>{ props.org.phone }</Descriptions.Item>
        {/* <Descriptions.Item label='Social Media'>{props.org.socialMedia}</Descriptions.Item> */ }
        <Descriptions.Item
          label='website'>{ props.org.website }</Descriptions.Item>
      </Descriptions>
    </StyledDiv>
  
  );
};

const StyledDiv = styled.div`
margin-right: 12rem;
`;

export default OrganizationInfo;