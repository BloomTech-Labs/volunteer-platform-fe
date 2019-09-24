import React, { Component } from 'react';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';

export default class AntdTextArea extends Component {
  render() {
    let { ...rest } = this.props;
    return <StyledTextArea></StyledTextArea>;
  }
}

const StyledTextArea = styled(TextArea)``;
