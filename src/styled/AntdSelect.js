import React, { Component } from 'react'
import styled from 'styled-components';
import { Select } from 'antd';

export default class AntdSelect extends Component {
    render() {
        let {children, ...rest} = this.props;
        return (
            <StyledSelect {...rest}>
                {children}
            </StyledSelect>
        )
    }
}

const StyledSelect = styled(Select)``;
