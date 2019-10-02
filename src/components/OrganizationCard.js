import React from 'react';
import PropTypes from 'prop-types';
import {StyledCard, StyledButton} from '../styled';
import {Link} from 'react-router-dom';

const OrganizationCard = ({org, history}) => {
  
  
  return (
    <StyledCard>
      <Link to={`/organization/${org.orgId}`}>
        <h1>{org.organizationName}</h1>
      </Link>
    </StyledCard>
  );
};

OrganizationCard.propTypes = {
  org: PropTypes.shape({
    orgId: PropTypes.string,
    aboutUs: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    organizationName: PropTypes.string.isRequired,
    organizationOwnerUID: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    imageUrl: PropTypes.string,
    POC: PropTypes.arrayOf(PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })).isRequired,
    causeAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    daysOfTheWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default OrganizationCard;