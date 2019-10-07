import React, { useState } from 'react';
import styled from 'styled-components';
import {Event, OrganizationCard} from '../MainDashboard';
import { NoResultsFound } from './NoResultsFound';
import { Pagination } from 'antd';

export const ResultList = ({ results, type }) => {
  const itemPerPage = 10;
  const [current, setCurrent] = useState(1);
  const [displayResults, setDisplayResults] = useState(
    results.slice(0, itemPerPage)
  );

  const changePage = page => {
    setCurrent(page);
    setDisplayResults(
      results.slice(itemPerPage * (page - 1), itemPerPage * page)
    );
    window.scrollTo(0, 0);
  };

  return displayResults.length ? (
    <StyledResultList>
      {displayResults.map(result =>
        type === 'Events' ? (
          <Event key={result.eventId} event={result} />
        ) : (
          <OrganizationCard key={result.orgId} org={result} />
        )
      )}
      <Pagination
        current={current}
        onChange={changePage}
        total={results.length}
      />
    </StyledResultList>
  ) : (
    <NoResultsFound />
  );
};

const StyledResultList = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ResultList;
