import React, { useState } from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntInput } from '../../styled';
import { Icon } from 'antd';

export const SecondPart = ({ clickNext, storedData, clickPrevious }) => {
  const [numberOfPOC, setNumberOfPOC] = useState(1);

  const changePOC = action => {
    if (action === 'add') setNumberOfPOC(numberOfPOC => numberOfPOC + 1);
    else setNumberOfPOC(numberOfPOC => numberOfPOC - 1);
  };

  const getPOCInputs = () => {
    const poc = [];
    for (let i = 1; i <= numberOfPOC; i++) {
      poc.push(
        <div className="fullPOCDiv">
          <span>{i}.</span>
          <Icon type="delete" />
          <div className="pocInfo">
            <AntInput
              name={`fullName${i}`}
              label={'Full Name'}
              key={`fullName${i}`}
              placeholder={'Jane Done'}
            />
            <AntInput
              name={`email${i}`}
              label={'Email'}
              key={`email${i}`}
              placeholder={'jane.doe@gmail.com'}
            />
            <AntInput
              name={`phone${i}`}
              label={'Phone'}
              key={`phone${i}`}
              placeholder={'(202) 213-1234'}
            />
          </div>
        </div>
      );
    }

    return poc;
  };
  return (
    <WrappedAntForm
      layout={'vertical'}
      onSubmit={clickNext}
      handleCancel={clickPrevious}
      autofill={storedData}
      buttonText={'Next'}
      cancelButtonText={'Previous'}
    >
      <h4>Who is the point of contact?</h4>
      {getPOCInputs()}
      <Icon
        type="plus-circle"
        style={{
          fontSize: '1.6rem',
          marginRight: '1rem',
          color: '#005A87',
        }}
        onClick={() => changePOC('add')}
      />
      <span style={{ color: '#005A87' }} onClick={() => changePOC('add')}>
        Add another point of contact.
      </span>
    </WrappedAntForm>
  );
};

export default SecondPart;
