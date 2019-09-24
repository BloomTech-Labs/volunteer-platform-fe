import React, { Component } from 'react'
import { InputNumber } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntdInputNumber extends Component {
    render() {
        let {children, ...rest} = this.props
        return (
            <StyledInputNumber {...rest}>
                {children}
            </StyledInputNumber>
        )
    }
}

const StyledInputNumber = styled(InputNumber)``;

export default AntdInputNumber;
