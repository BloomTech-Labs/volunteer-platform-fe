import React, {Component} from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';

export class AntdRadio extends Component {
    render() {
        let {children, ...rest} = this.props
        return (
            <StyledRadio {...rest}>
                {children}
            </StyledRadio>
        )
    }
}

const StyledRadio = styled(Radio)``;

export default AntdRadio;