import React, { useState, useEffect } from 'react';
import { Button, Icon, message } from 'antd';
import CreatePOC from './CreatePOC';


const CreatePOCFormList = (props) => {
  const [id, setId] = useState(1);
  const [keys, setKeys] = useState([0])

  useEffect(() => {
    setKeys(Array.from(Array(id).keys()))
  }, [id])

  const addPocFields = (e) => {
    e.preventDefault();
    setId(id + 1);
  }

  return (
    <div>
      {keys.map(item => <CreatePOC key={item} changePOC={props.changePOC} pointOfContact={props.pointOfContact}/>)}
      <Button type="dashed" onClick={addPocFields} style={{ width: '100%' }}>
        <Icon type="plus" /> Add field
      </Button>
    </div>
  )
}

export default CreatePOCFormList;