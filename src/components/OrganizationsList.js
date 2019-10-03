import React, {useEffect} from 'react';
import {getOrganizationsByState} from '../actions';
import {useStateValue} from '../hooks/useStateValue';
import OrganizationCard from './OrganizationCard';
import PropTypes from 'prop-types';

const OrganizationsList = ({state}) => {
  
  const [{org}, dispatch] = useStateValue();
  
  useEffect(() => {
    getOrganizationsByState(state, dispatch);
  }, [state]);
  
  return (
    <div>
      {org.organizations.map(org => {
        return <OrganizationCard org={org}/>;
      })}
    </div>
  );
};

OrganizationsList.propTypes = {
  state: PropTypes.string.isRequired,
};

export default OrganizationsList;