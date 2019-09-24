import React, { Component } from 'react'
import { Checkbox } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntdCheckbox extends Component {
    render() {
        let {children, ...rest} = this.props
        return (
            <StyledCheckbox {...rest}>
                {children}
            </StyledCheckbox>
        )
    }
}
const StyledCheckbox = styled(Checkbox)``;

export default AntdCheckbox;
