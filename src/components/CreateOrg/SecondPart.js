import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WrappedAntForm, AntInput } from '../../styled';
import { Icon } from 'antd';

export const SecondPart = ({ clickNext, storedData, clickPrevious }) => {
  const [numberOfPOC, setNumberOfPOC] = useState(2);
  const [allPOCs, setAllPOCs] = useState([createPOC(1)]);

  function createPOC(i) {
    return (
      <div className="fullPOCDiv">
        <span>{i}</span>
        <>
          {i > 1 && (
            <Icon type="delete" onClick={() => changePOC('delete', i)} />
          )}
        </>
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

  const changePOC = (action, i) => {
    if (action === 'add') {
      setAllPOCs([...allPOCs, createPOC(numberOfPOC)]);
      setNumberOfPOC(numberOfPOC => numberOfPOC + 1);
    } else {
      let fullPOCs = returnAllPOCs();
      console.log(fullPOCs);
    }
  };

  const returnAllPOCs = () => allPOCs;

  console.log(allPOCs);
  
  return (
    <WrappedAntForm
      layout={'vertical'}
      onSubmit={clickNext}
      cancelButton
      handleCancel={clickPrevious}
      autofill={storedData}
      buttonText={'Next'}
      cancelButtonText={'Previous'}
    >
      <h4>Who is the point of contact?</h4>
      {allPOCs}
      <>
        <Icon
          type="plus-circle"
          style={{
            fontSize: '1.6rem',
            marginRight: '1rem',
            color: '#005A87',
          }}
          onClick={() => changePOC('add')}
        />
      </>
      <span style={{ color: '#005A87' }} onClick={() => changePOC('add')}>
        Add another point of contact.
      </span>
    </WrappedAntForm>
  );
};

export default SecondPart;
