import React, { useState, useEffect } from 'react';
import { Select, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { getAllEventsByOrg, deleteOrganization, getFileUrl } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import OrganizationInfo from '../components/OrganizationInfo';

const OrganizationDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ displayOrg, setDisplayOrg ] = useState( '' );
  const [ imageUrl, setImageUrl ] = useState( null );
  
  useEffect( () => {
    debugger;
    if( displayOrg.imagePath ){
      getFileUrl( displayOrg.imagePath ).then( res => {
        setImageUrl( res );
      } );
    }else{
      setImageUrl( null );
    }
  }, [ displayOrg ] );
  
  useEffect( () => {
    if( state.auth.googleAuthUser ){
      const uid = state.auth.googleAuthUser.uid;
    }
  }, [] );
  
  const changeHandler = value => {
    setDisplayOrg( state.org.userOrganizations.find(
      item => item.orgId === value ) );
  };
  
  useEffect( () => {
    if( state.org.userOrganizations.length > 0 ){
      setDisplayOrg( state.org.userOrganizations[ 0 ] );
    }
  }, [ state.org.userOrganizations ] );
  
  useEffect( () => {
    debugger;
    if( displayOrg ){
      getAllEventsByOrg( displayOrg.orgId, dispatch );
    }
  }, [ displayOrg ] );
  
  const deleteOrg = e => {
    e.preventDefault();
    deleteOrganization( displayOrg.orgId, dispatch );
  };
  
  return ( <div>
    <h1>Organization dashboard</h1>
    { imageUrl ? <Avatar shape="square" size={ 128 } src={ imageUrl }/> :
      <Avatar shape="square" size={ 128 } icon={ 'user' }/> }
    <Select defaultValue='select' onChange={ changeHandler }>
      <Select.Option value='select' disabled>Select one</Select.Option>
      { state.org.userOrganizations.map(
        item => ( <Select.Option key={ item.orgId }
                                 value={ item.orgId }>{ item.organizationName }</Select.Option> ) ) }
    </Select>
    { displayOrg ? ( <>
      <Link to={ {
        pathname: '/create-org', state: {
          org: displayOrg,
        },
      } }>Edit organization info</Link>
      <button onClick={ deleteOrg }>Delete Org</button>
      <OrganizationInfo org={ displayOrg }/>
    </> ) : <div>You have not created any organization yet</div> }
    <Link to={ {
      pathname: '/org-dashboard/create-event', state: {
        org: displayOrg,
      },
    } }>Create event</Link>
    { state.events.events.length > 0 ?
      <EventList events={ state.events.events }/> :
      <div>No event has been created</div> }
  </div> );
};

export default OrganizationDashboard;