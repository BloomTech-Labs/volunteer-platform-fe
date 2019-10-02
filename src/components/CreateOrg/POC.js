import React, { useState } from 'react';
import { Icon, Input, Form } from 'antd';
import { StyledLine } from '../../styled';
export const POC = ({ i, changePOC, setValues, values }) => {
  const changeHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="fullPOCDiv">
      {i > 1 && <StyledLine />}
      {i > 1 && (
        <span className="trash-icon">
          <Icon
            type="delete"
            onClick={() => changePOC('delete', i)}
            theme="twoTone"
            twoToneColor="#005a87"
          />
        </span>
      )}

      <div className="pocInfo">
        <Form.Item label={'Full Name'} required>
          <Input
            name={`fullName${i}`}
            label={'Full Name'}
            onChange={e => changeHandler(e)}
            value={values[`fullName${i}`]}
            key={`fullName${i}`}
            placeholder={'Jane Done'}
            required
          />
        </Form.Item>
        <Form.Item label={'Email'} required>
          <Input
            name={`email${i}`}
            onChange={e => changeHandler(e)}
            value={values[`email${i}`]}
            key={`email${i}`}
            placeholder={'jane.doe@gmail.com'}
            required
          />
        </Form.Item>

        <Form.Item label={'Phone'} required>
          <Input
            name={`phone${i}`}
            onChange={e => changeHandler(e)}
            value={values[`phone${i}`]}
            key={`phone${i}`}
            placeholder={'(202) 213-1234'}
            required
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default POC;
