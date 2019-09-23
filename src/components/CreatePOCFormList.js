import React from 'react';
import { Button, Icon } from 'antd';
import styled from 'styled-components';
import CreatePOC from './CreatePOC';

const CreatePOCFormList = props => {
  return (
    <div>
      {props.pointOfContacts.map((poc, i) => (
        <div key={poc.id}>
          {i > 0 && <StyledLine key={i} />}
          <CreatePOC changePOC={props.changePOC} key={poc.id} poc={poc} />
        </div>
      ))}
      {props.pointOfContacts.length === 1 && (
        <Button type="dashed" onClick={props.addPOC} style={{ width: '100%' }}>
          <Icon type="plus" /> Add point of contact.
        </Button>
      )}
    </div>
  );
};
const StyledLine = styled.div`
  border-bottom: 1px solid lightgrey;
  margin-bottom: 1rem;
`;

export default CreatePOCFormList;
