import React, { Component } from 'react';
import styled from 'styled-components';
import { TimePicker } from 'antd';

export class AntdTimePicker extends Component {
  render() {
    let { ...rest } = this.props;
    return <StyledTimePicker {...rest}></StyledTimePicker>;
  }
}

const StyledTimePicker = styled(TimePicker)``;
