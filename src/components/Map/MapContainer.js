import React from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import CurrentLocation from './Map';

export class MapContainer extends React.Component{
  state = {
    showingInfoWindow: true,
    activeMarker: {},
    selectedPlace: {},
  };
  
  onMarkerClick = (props, marker, e) => {
    debugger;
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  
  onClose = props => {
    debugger;
    if (this.state.showingInfoWindow){
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  
  render(){
    
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick}
                name={'current location'}/>
        <InfoWindow
          marker={this.state.activeMarker}
          visable={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  };
}

export default GoogleApiWrapper(
  porps => ({apiKey: process.env.REACT_APP_apiKey}))(
  MapContainer);