import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Geocode from 'react-geocode';

const mapStyles = {
  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export class CurrentLocation extends React.Component{
  constructor(props){
    super(props);
    
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat,
        lng,
      },
    };
  }
  
  componentDidUpdate(prevProps, prevState, snapshot){
    debugger;
    if (prevProps.google !== this.props.google){
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation){
      this.recenterMap();
    }
  }
  
  recenterMap(){
    const map = this.map;
    const current = this.state.currentLocation;
    
    const google = this.props.google;
    const maps = google.maps;
    
    if (map){
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }
  
  componentDidMount(){
    debugger;
    Geocode.setApiKey(process.env.REACT_APP_googleMapsApi);
    // set response language. Defaults to english.
    Geocode.setLanguage('en');

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion('us');
    Geocode.fromAddress('7605 Cavalier Ct').then(
      response => {
        debugger;
        const {lat, lng} = response.results[ 0 ].geometry.location;
        this.setState({currentLocation: {lat, lng}});
        
      },
      error => {
        console.error(error);
      },
    );
    this.loadMap();
  }
  
  loadMap(){
    if (this.props && this.props.google){
      // checks if google is available
      const {google} = this.props;
      const maps = google.maps;
      
      const mapRef = this.refs.map;
      
      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);
      
      let {zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        },
      );
      
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }
  
  renderChildren(){
    const {children} = this.props;
    
    if (!children){
      return;
    }
    
    return React.Children.map(children, c => {
      if (!c){
        return;
      }
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }
  
  render(){
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
  
}

export default CurrentLocation;

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233,
  },
  centerAroundCurrentLocation: false,
  visible: true,
};