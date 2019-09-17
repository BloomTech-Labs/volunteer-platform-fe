import React from 'react';
import { Descriptions } from 'antd';

const OrganizationInfo = (props) => {
  return (
    <Descriptions title={props.org.organizationName}>
      <Descriptions.Item label='Type'>{props.org.organizationType}</Descriptions.Item>
      <Descriptions.Item label='Mission Statement'>{props.org.missionStatement}</Descriptions.Item>
      <Descriptions.Item label='About us'>{props.org.aboutUs}</Descriptions.Item>
      <Descriptions.Item label='City'>{props.org.city}</Descriptions.Item>
      <Descriptions.Item label='State'>{props.org.state}</Descriptions.Item>
      <Descriptions.Item label='Email'>{props.org.email}</Descriptions.Item>
      <Descriptions.Item label='Phone'>{props.org.phone}</Descriptions.Item>
      {/* <Descriptions.Item label='Social Media'>{props.org.socialMedia}</Descriptions.Item> */}
      <Descriptions.Item label='website'>{props.org.website}</Descriptions.Item>
    </Descriptions>
  )
}

export default OrganizationInfo;