import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Form } from 'antd';
import { POC } from './POC';
import { StyledButton, StyledCancelButton } from '../../styled';

export const SecondPart = ({ clickNext, storedData, clickPrevious }) => {
  const [allPOCs, setAllPOCs] = useState([1]);
  const [values, setValues] = useState({ ...storedData });
 
  const changePOC = (action, i) => {
    if (action === 'add') {
      setAllPOCs([...allPOCs, allPOCs.length + 1]);
    } else {
      let removed = allPOCs.splice(allPOCs.indexOf(i), 1);
      setAllPOCs([...allPOCs]);
    }
  };
 
  return (
    <Form layout={'vertical'} onSubmit={() => clickNext(values)}>
      <h4>Who is the point of contact?</h4>
      {allPOCs.map(poc => (
        <POC
          key={poc}
          i={poc}
          changePOC={changePOC}
          values={values}
          setValues={setValues}
        />
      ))}
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

      <div className="buttonStyles">
        <StyledCancelButton onClick={clickPrevious} type="primary">
          Previous
        </StyledCancelButton>
        <StyledButton onClick={() => clickNext(values)} type="primary">
          Next
        </StyledButton>
      </div>
    </Form>
  );
};

const DivForStyling = styled.div``;
export default SecondPart;
