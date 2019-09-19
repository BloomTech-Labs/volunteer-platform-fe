import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';

const SelectStyled = styled(Select)`
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

export const StyledSelect = ({ name, values, onChange, children, ...rest }) => {
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
      <SelectStyled
        {...rest}
        name={camelCase}
        title={camelCase}
        values={values ? values[camelCase] : ''}
        onChange={onChange}
      >
        {children && children}
      </SelectStyled>
    </Form.Item>
  );
};

StyledSelect.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
};
