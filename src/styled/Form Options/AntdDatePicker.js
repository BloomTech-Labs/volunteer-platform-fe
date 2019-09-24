import React, { Component } from 'react'
import { DatePicker } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export class AntdDatePicker extends Component {
    render() {
        let {children, ...rest} = this.props
        return (
            <StyledDatePicker {...rest}>
                {children}
            </StyledDatePicker>
        )
    }
}

const StyledDatePicker = styled(DatePicker)``;

export default AntdDatePicker;
