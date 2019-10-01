import React, { useState } from 'react';
import { Icon, Input, Form } from 'antd';
import {StyledLine} from '../../styled'
export const POC = ({ i, changePOC }) => {
  const [localState, setLocalState] = useState({});

  const changeHandler = e => {
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  return (
    <div className="fullPOCDiv">
      {i > 1 && <StyledLine />}
      <span>{i}</span>
        {i > 1 && (
          <span>
            <Icon type="delete" onClick={() => changePOC('delete', i)} />
          </span>
        )}
      
      <div className="pocInfo">
        <Form.Item label={'Full Name'} required>
          <Input
            name={`fullName${i}`}
            label={'Full Name'}
            onChange={e => changeHandler(e)}
            value={localState[`fullName${i}`]}
            key={`fullName${i}`}
            placeholder={'Jane Done'}
            required
          />
        </Form.Item>
        <Form.Item label={'Email'} required>
          <Input
            name={`email${i}`}
            onChange={e => changeHandler(e)}
            value={localState[`email${i}`]}
            key={`email${i}`}
            placeholder={'jane.doe@gmail.com'}
            required
          />
        </Form.Item>

        <Form.Item label={'Phone'} required>
          <Input
            name={`phone${i}`}
            onChange={e => changeHandler(e)}
            value={localState[`phone${i}`]}
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
