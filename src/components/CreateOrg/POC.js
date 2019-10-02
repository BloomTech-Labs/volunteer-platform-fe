import React, { useState } from 'react';
import { Icon, Input, Form } from 'antd';
import { StyledLine, deleteModal } from '../../styled';
export const POC = ({ i, changePOC, setValues, values }) => {
  const changeHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const deletePOC = e => {
    e.preventDefault();
    const deletePOCModal = deleteModal({
      title: 'Are you sure you want to remove this point of contact?',
      content: 'This cannot be undone',
      onOk: () => changePOC('delete', i),
    });

    deletePOCModal();
  };
  return (
    <div className="fullPOCDiv">
      {i > 1 && <StyledLine />}
      {i > 1 && (
        <span className="trash-icon">
          <Icon
            type="delete"
            onClick={deletePOC}
            theme="twoTone"
            twoToneColor="#005a87"
          />
        </span>
      )}

      <div className="pocInfo">
        <Form.Item label={'Full Name'}>
          <Input
            name={`fullName${i}`}
            label={'Full Name'}
            onChange={e => changeHandler(e)}
            value={values[`fullName${i}`]}
            key={`fullName${i}`}
            placeholder={'Jane Done'}
          />
        </Form.Item>
        <Form.Item label={'Email'}>
          <Input
            name={`email${i}`}
            onChange={e => changeHandler(e)}
            value={values[`email${i}`]}
            key={`email${i}`}
            placeholder={'jane.doe@gmail.com'}
          />
        </Form.Item>

        <Form.Item label={'Phone'}>
          <Input
            name={`phone${i}`}
            onChange={e => changeHandler(e)}
            value={values[`phone${i}`]}
            key={`phone${i}`}
            placeholder={'(202) 213-1234'}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default POC;
