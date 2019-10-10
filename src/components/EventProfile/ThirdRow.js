import React from 'react';
import styled from 'styled-components';
import MapContainer from '../Map/MapContainer';
import {useStateValue} from '../../hooks/useStateValue';

export const ThirdRow = ({localState}) => {
  
  const markers = [
    {
      title: localState.nameOfEvent,
      name: localState.nameOfEvent,
      address: `${localState.streetAddress} ${localState.city}, ${localState.state}`,
      position: {lat: localState.lat, lng: localState.lng},
    },
  ];
  
  return (
    <StyledThirdRow>
      <div className="details">
        <h4>Details</h4>
        <p className='details-info'>{localState.eventDetails}</p>
      </div>
      <div className="map">
        <h4>Find us at</h4>
        {localState.lat &&
        <MapContainer marginLeft={'0'} height={'250px'} width={'250px'}
                      lat={localState.lat} lng={localState.lng}
                      markers={markers}
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
  justify-content: space-between;

  .details, .map {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }

  .details{
    width: 65%;
    .details-info{
        background: white;
        border-radius: 4px;
        min-height: 200px;
    }
  }

  .map{
      width: 30%;
  }
`;

export default ThirdRow;
