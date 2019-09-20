import React from 'react';
import { Descriptions, Tag } from 'antd';

const OrganizationInfo = (props) => {
    let causeAreas = props.org.causeAreas && props.org.causeAreas.map(cause => {
        return <Tag>{`${cause}`}</Tag>
    })
  return (
    <Descriptions title={props.org.organizationName}>
      <Descriptions.Item label='Cause Areas'>{causeAreas}</Descriptions.Item>
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