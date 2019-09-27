import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Card} from 'antd';

export const StyledCard = ({...rest}) => {
  return (<StyledAntCard {...rest} />);
};

const StyledAntCard = styled(Card)`
  && {
    display: flex;
    width: 100%;
    margin: ${props => (props.margin ? props.margin : 0)};
    max-width: ${props => (props.maxWidth ? props.maxWidth : '800px')};
    border-radius: ${({theme}) => theme.borderRadiusDefault};
    background-color: ${props =>
  props.backgroundcolor ? props.backgroundcolor : props.theme.gray2};
    letter-spacing: 0.2px;
    margin-bottom: 20px
    .ant-card-body {
      width: 100%;
    }
    .head {
      padding-bottom: 10px;
    }
    .date {
      display: flex;
      justify-content: space-evenly;
      text-align: justify;
    }
  }
`;

StyledCard.propTypes = {
  margin: PropTypes.string,
  maxWidth: PropTypes.string,
  borderRadiusDefault: PropTypes.string,
  backgroundcolor: PropTypes.string,
};
