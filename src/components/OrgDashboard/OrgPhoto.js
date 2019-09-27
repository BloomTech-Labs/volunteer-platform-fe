import React from 'react';
import styled from 'styled-components';
import {StyledCard, StyledAvatar, StyledUploadImage} from '../../styled';
import {Tooltip, Icon, Popconfirm, message} from 'antd';

export const OrgPhoto = ({
  imageUrl,
  displayOrg,
  deleteOrganizationImage,
  onFileUpload,
}) => {
  return (
    <div className={'column'}>
      <StyledCard backgroundcolor={'#E8E8E8'}>
        {imageUrl ? (
          <StyledAvatarImage className={'column'}>
            <StyledAvatar shape="square" size={256} src={imageUrl}/>
            <Tooltip title={'Delete Avatar'}>
              <Popconfirm onConfirm={() => {
                message.success('Photo deleted.');
                deleteOrganizationImage(displayOrg);
              }}
                          title={'Delete this photo?'} okText={'Yes'}
                          cancelText={'No'}
                          placement={'rightTop'}
              >
                <StyledDelete
                  type="close"
                />
              </Popconfirm>
            </Tooltip>
          </StyledAvatarImage>
        ) : (
          <StyledUploadImage fileUploadComplete={onFileUpload}/>
        )}
      </StyledCard>
    </div>
  );
};

const StyledDelete = styled(Icon)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: transparent;
`;

const StyledAvatarImage = styled.div`
  position: relative;
  :hover > i {
    color: #ff4d4f;
  }
`;
export default OrgPhoto;
