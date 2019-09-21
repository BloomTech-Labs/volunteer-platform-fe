import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import {
  getAllEventsByOrg, deleteOrganization, getFileUrl, updateOrganization,
  deleteOrganizationImage,
} from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import OrganizationInfo from '../components/OrganizationInfo';
import { StyledUploadImage } from '../styled/StyledUploadImage';
import { StyledButton, StyledAvatar } from '../styled';

export const OrganizationDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  const [ displayOrg, setDisplayOrg ] = useState( '' );
  const [ imageUrl, setImageUrl ] = useState( null );
  
  useEffect( () => {
    
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
    
    if( displayOrg ){
      getAllEventsByOrg( displayOrg.orgId, dispatch );
    }
  }, [ displayOrg ] );
  
  const deleteOrg = e => {
    e.preventDefault();
    deleteOrganization( displayOrg.orgId, dispatch );
  };
  
  const onFileUpload = ( path ) => {
    
    setImageUrl( getFileUrl( path ) );
    const updatedDisplayOrg = { ...displayOrg, imagePath: path };
    
    updateOrganization( displayOrg.orgId, updatedDisplayOrg, dispatch );
  };
  
  return ( <StyledDashboard>
    <h1>Organization dashboard</h1>
    <div className={ 'row mg-lf-4' }>
      <div className={ 'column' }>
        { imageUrl ?
          <div className={ 'column mg-rt-4' }><StyledAvatar shape="square"
                                                            size={ 256 }
                                                            src={ imageUrl }/><StyledButton
            onClick={ () => deleteOrganizationImage( displayOrg ) }>Delete
            Image</StyledButton></div> :
          <StyledUploadImage fileUploadComplete={ onFileUpload }/> }
      
      </div>
      
      <div>
        <Select defaultValue='select' onChange={ changeHandler }>
          <Select.Option value='select' disabled>Select one</Select.Option>
          { state.org.userOrganizations.map(
            item => ( <Select.Option key={ item.orgId }
                                     value={ item.orgId }>{ item.organizationName }</Select.Option> ) ) }
        </Select>
        { displayOrg ? ( <>
          <StyledButton>
            <Link to={ {
              pathname: '/create-org', state: {
                org: displayOrg,
              },
            } }>Edit organization info</Link>
          </StyledButton>
          
          <StyledButton onClick={ deleteOrg }>Delete Org</StyledButton>
          <OrganizationInfo org={ displayOrg }/>
        </> ) : <div>You have not created any organization yet</div> }
        <Link to={ {
          pathname: '/org-dashboard/create-event', state: {
            org: displayOrg,
          },
        } }>Create event</Link>
      </div>
    </div>
    
    
    { state.events.events.length > 0 ?
      <EventList events={ state.events.events }/> :
      <div>No event has been created</div> }
  </StyledDashboard> );
};

const StyledDashboard = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export default OrganizationDashboard;