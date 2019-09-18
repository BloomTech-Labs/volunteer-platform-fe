import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TimePicker, Form } from 'antd';

const TimePickerStyled = styled(TimePicker)`
  && {
  }
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const StyledTimePicker = ({
  name,
  values,
  onChange,
  children,
  ...rest
}) => {
  let camelCase = '';
  if (name) {
    camelCase = name.split(' ');
    for (let i = 0; i < camelCase.length; i++) {
      camelCase[i] = camelCase[i].toLowerCase();
      if (i > 0) {
        camelCase[i] =
          camelCase[i].charAt(0).toUpperCase() + camelCase[i].slice(1);
      }
    }
    camelCase = camelCase.join('');
  }

  return (
    <Form.Item {...formItemLayout} label={name}>
      <TimePickerStyled
        {...rest}
        name={camelCase}
        title={camelCase}
        onChange={onChange}
      >
        {children && children}
      </TimePickerStyled>
    </Form.Item>
  );
};

TimePickerStyled.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
