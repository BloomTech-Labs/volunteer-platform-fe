import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import { signOut, getUsersOrganizations, getAllEventsByOrg } from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import OrganizationInfo from '../components/OrganizationInfo';

const OrganizationDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ displayOrg, setDisplayOrg ] = useState( '' );
  
  useEffect( () => {
    if( state.auth.googleAuthUser ){
      const uid = state.auth.googleAuthUser.uid;
      getUsersOrganizations( uid, dispatch );
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
    if( displayOrg ){
      getAllEventsByOrg( displayOrg.orgId, dispatch );
    }
  }, [ displayOrg ] );
  
  return ( <div>
    <h1>Organization dashboard</h1>
    <Select defaultValue='select' onChange={ changeHandler }>
      <Select.Option value='select' disabled>Select one</Select.Option>
      { state.org.userOrganizations.map(
        item => ( <Select.Option key={ item.orgId }
                                 value={ item.orgId }>{ item.organizationName }</Select.Option> ) ) }
    </Select>
    { displayOrg ? <OrganizationInfo org={ displayOrg }/> :
      <div>You have not created any organization yet</div> }
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