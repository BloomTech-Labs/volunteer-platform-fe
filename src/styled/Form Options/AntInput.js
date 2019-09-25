import React, {Component} from 'react';
import {Input} from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntInput extends Component{
  
  render(){
    let {children, notRequired, ...rest} = this.props;
    return (<StyledInput {...rest} >
      {children}
    </StyledInput>);
  }
}

AntInput.propTypes = {
  notRequired: PropTypes.bool,
  tooltipTitle: PropTypes.string,
};

const StyledInput = styled(Input)``;


