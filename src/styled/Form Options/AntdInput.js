import React, { Component } from 'react'
import { Input } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types'

export class AntdInput extends Component {

    render() {
        let {children, ...rest} = this.props
        return (
            <StyledInput {...rest} >
                {children}
            </StyledInput>
        )
    }
}

const StyledInput = styled(Input)``;


