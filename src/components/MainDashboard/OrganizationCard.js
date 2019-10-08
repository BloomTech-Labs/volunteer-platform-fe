import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tag } from 'antd';
import { StyledCard, StyledButton } from '../../styled';
import { Link } from 'react-router-dom';

export const OrganizationCard = ({ org }) => {
  //aboutUs, causeAreas, city, state, streetAddress, website, organizationName
  return (
    <StyledOrgCard margin={'0 0 20px 0'}>
      <h1>{org.organizationName}</h1>
      {org.causeAreas.map(cause => (
        <Tag>{cause}</Tag>
      ))}

      <h4>{`${org.streetAddress} ${org.city}, ${org.state}`}</h4>
        <h5>{org.website}</h5>
      <Link to={`/organization/${org.orgId}`}>
        <button>View More</button>
      </Link>
    </StyledOrgCard>
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
    POC: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
    causeAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    daysOfTheWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

const StyledOrgCard = styled(StyledCard)``;
export default OrganizationCard;
