import React from 'react';
import styled from 'styled-components';
import { StyledCard, StyledAvatar, StyledUploadImage } from '../../styled';
import { Tooltip, Icon } from 'antd';

export const OrgPhoto = ({
  imageUrl,
  displayOrg,
  deleteOrganizationImage,
  onFileUpload,
}) => {
  return (
    <div className={'column'}>
      <StyledOrgPhoto
        backgroundcolor={'#E8E8E8'}
        margin={'0 0 70px 0'}
        borderRadius={'0px'}
      >
        {imageUrl ? (
          <StyledAvatarImage className={'column'}>
            <StyledAvatar shape="square" size={187} src={imageUrl} />
            <Tooltip title={'Delete Avatar'}>
              <StyledDelete
                onClick={() => deleteOrganizationImage(displayOrg)}
                type="close"
              />
            </Tooltip>
          </StyledAvatarImage>
        ) : (
          <StyledUploadImage
            fileUploadComplete={onFileUpload}
            width={'187px'}
            height={'187px'}
          />
        )}
      </StyledOrgPhoto>
    </div>
  );
};

const StyledOrgPhoto = styled(StyledCard)`
  padding: 0 80px;
`;

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
