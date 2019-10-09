import React from 'react';
import styled from 'styled-components';
import MapContainer from '../Map/MapContainer';
import {useStateValue} from '../../hooks/useStateValue';

export const ThirdRow = () => {
  const [{events}, dispatch] = useStateValue();
  debugger;
  const markers = [
    {
      title: events.event.nameOfEvent,
      name: events.event.organizationName,
      address: events.event.streetAddress + ' ' + events.event.city + ', ' +
        events.event.state,
      pos: {
        lat: events.event.lat,
        lng: events.event.lng,
      },
    },
  ];
  
  return (
    <StyledThirdRow>
      <div className="details">
        <h5>Details</h5>
        <p>{events.event.eventDetails}</p>
      </div>
      <div className="map">
        <h5>Find us at</h5>
        {events.event.lat &&
        <MapContainer markers={markers} lng={events.event.lng}
                      lat={events.event.lat} width={'250px'}
                      height={'250px'}
        />}
      </div>
    </StyledThirdRow>
  );
};

const StyledThirdRow = styled.div`
  width: 80%;
  margin: 0 auto 24px;
  min-height: 150px;
  display: flex;
  .details {
    width: 70%;
    
    
    p {
      background-color: white;
      padding: 1rem;
    }
  }
  .map{
    width: 30%;
    position: relative;
  }
`;

export default ThirdRow;
