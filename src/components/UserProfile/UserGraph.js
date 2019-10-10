import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { groupHoursByMonths } from '../../utility/groupHoursByMonths';
import styled from 'styled-components';

export const UserGraph = (props) => {
  const [data, setData] = useState([]);
  const [domain, setDomain] = useState([]);

  useEffect(() => {
    if (props.user.validatedHours && props.user.goals) {
      let results = groupHoursByMonths(props.user.validatedHours);
      setData(results);
    } else {
      let results = groupHoursByMonths([]);
      setData(results);
    }
  }, [props.user])

  return (
    <StyledDiv>
      <h5>Hours</h5>
      <LineChart
        width={300}
        height={200}
        data={data}
        margin={{ top: 5, right: 10, left: -15, bottom: 0 }}
      >
        <XAxis dataKey="month" domain={domain}/>
        <YAxis type="number"/>
        <Tooltip />
        <Line type="linear" dataKey="hours" stroke="#FA8C16" dot={{ stroke: '#38B9E0', strokeWidth: 2 }} activeDot={{ r: 8 }} />
      </LineChart>
    </StyledDiv>
  )
}

export default UserGraph;

const StyledDiv = styled.div`
  width: 100%;
  border-radius: 3px;
  background: white;
  border: 1px solid ${({theme}) => theme.gray4};
  padding: 1rem;
`