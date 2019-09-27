import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export const StyledCard = ({ ...rest }) => {
  return <StyledAntCard {...rest} />;
};

const StyledAntCard = styled(Card)`
  && {
    display: flex;
    width: 100%;
    margin: ${props => (props.margin ? props.margin : 0)};
    max-width: ${props => (props.maxWidth ? props.maxWidth : '800px')};
    border-radius: ${props =>
      props.borderRadius || props.theme.borderRadiusDefault};
    background-color: ${props =>
      props.backgroundcolor ? props.backgroundcolor : props.theme.gray2};
    letter-spacing: 0.2px;
    .ant-card-body {
      width: 100%;
    }
  }
`;

StyledCard.propTypes = {
  margin: PropTypes.string,
  maxWidth: PropTypes.string,
  borderRadiusDefault: PropTypes.string,
  backgroundcolor: PropTypes.string,
};
