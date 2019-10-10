import React from 'react';
import styled from 'styled-components';
import MapContainer from '../Map/MapContainer';
import { StyledCard } from '../../styled';
import { Col } from 'antd';

export const ThirdRow = ({ localState }) => {
  const markers = [
    {
      title: localState.nameOfEvent,
      name: localState.nameOfEvent,
      address: `${localState.streetAddress} ${localState.city}, ${localState.state}`,
      position: { lat: localState.lat, lng: localState.lng },
    },
  ];

  return (
    <StyledThirdRow>
      <Col className="details" span={16}>
        <h4>Details</h4>
        <p className="details-info">{localState.eventDetails}</p>
      </Col>
      <Col className="map" span={6} offset={2}>
        <h4>Find us at</h4>
        {localState.lat && (
          <MapContainer
            marginLeft={'0'}
            height={'250px'}
            width={'250px'}
            lat={localState.lat}
            lng={localState.lng}
            markers={markers}
          />
        )}
      </Col>
    </StyledThirdRow>
  );
};

const StyledThirdRow = styled(StyledCard)`
  min-height: 150px;
  h4 {
    margin-top: 0;
  }
  .details,
  .map {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default ThirdRow;
