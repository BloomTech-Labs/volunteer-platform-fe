import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Icon, Select, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {
  getAllEventsByOrg,
  deleteOrganization,
  getFileUrl,
  updateOrganization,
  deleteOrganizationImage,
  getAllRecurringEventsByOrg,
} from '../actions';
import {useStateValue} from '../hooks/useStateValue';
import EventList from '../components/EventList';
import OrganizationInfo from '../components/OrganizationInfo';
import {
  StyledButton,
  StyledAvatar,
  StyledUploadImage,
  deleteModal,
} from '../styled';

export const OrganizationDashboard = () => {
  const [state, dispatch] = useStateValue();
  const [displayOrg, setDisplayOrg] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  
  useEffect(() => {
    if (displayOrg.imagePath){
      getFileUrl(displayOrg.imagePath).then(res => {
        setImageUrl(res);
      });
    }else{
      setImageUrl(null);
    }
  }, [displayOrg]);
  
  useEffect(() => {
    if (state.auth.googleAuthUser){
      const uid = state.auth.googleAuthUser.uid;
    }
  }, []);
  
  const changeHandler = value => {
    setDisplayOrg(
      state.org.userOrganizations.find(item => item.orgId === value),
    );
  };
  
  useEffect(() => {
    if (state.org.userOrganizations.length > 0){
      setDisplayOrg(state.org.userOrganizations[ 0 ]);
    }
  }, [state.org.userOrganizations]);
  
  useEffect(() => {
    if (displayOrg){
      getAllEventsByOrg(displayOrg.orgId, dispatch);
      getAllRecurringEventsByOrg(displayOrg.orgId, dispatch);
    }
  }, [displayOrg]);
  
  const deleteOrg = e => {
    const deleteOrgModal = deleteModal({
      title: 'Are you sure you want to delete this organization?',
      content: 'This cannot be undone.',
      onOk: () => deleteOrganization(displayOrg.orgId, dispatch),
    });
    
    e.preventDefault();
    deleteOrgModal();
  };
  
  const onFileUpload = path => {
    getFileUrl(path).then(url => {
      setImageUrl(url);
      const updatedDisplayOrg = {...displayOrg, imagePath: path, imageUrl: url};
      updateOrganization(displayOrg.orgId, updatedDisplayOrg, dispatch);
    }).catch(err => console.log(err));
  };
  
  return (
    <StyledDashboard>
      
      <h2 className={'org-title'}>Welcome
        Back {displayOrg.organizationName}</h2>
      
      <div className={'row mg-lf-4 row-wrap'}>
        <div className={'column'}>
          {imageUrl ? (
            <StyledAvatarImage className={'column mg-rt-4'}>
              <StyledAvatar shape="square" size={256} src={imageUrl}/>
              <Tooltip title={'Delete Avatar'}>
                <StyledDelete
                  onClick={() => deleteOrganizationImage(displayOrg)}
                  type="close"/>
              </Tooltip>
            </StyledAvatarImage>
          ) : (
            <StyledUploadImage fileUploadComplete={onFileUpload}/>
          )}
        </div>
        <div>
          <div className={'org-top'}>
            <Select defaultValue="select" onChange={changeHandler}>
              <Select.Option value="select" disabled>
                Select one
              </Select.Option>
              {state.org.userOrganizations.map(item => (
                <Select.Option key={item.orgId} value={item.orgId}>
                  {item.organizationName}
                </Select.Option>
              ))}
            </Select>
            <StyledButton standard={true} type={'danger'} onClick={deleteOrg}>
              Delete Org
            </StyledButton>
          </div>
          
          
          <StyledButton type={'secondary'}>
            <Link
              to={{
                pathname: '/create-org',
                state: {
                  org: displayOrg,
                },
              }}
            >
              Edit organization info
            </Link>
          </StyledButton>
        
        </div>
        
        <div className={'bottom'}>
          <div className={'details'}>
            
            {displayOrg ? (
              
              <OrganizationInfo org={displayOrg}/>
            
            ) : (
              <div>You have not created any organization yet</div>
            )}
            <StyledButton className={'create-event-button'}>
              <Link
                to={{
                  pathname: '/org-dashboard/create-event',
                  state: {
                    org: displayOrg,
                  },
                }}
              >
                Create event
              </Link>
            </StyledButton>
          </div>
          <div className={'events'}
          >
            {state.events.events.length > 0 ||
            state.events.recurringEvents.length > 0 ? (
              <EventList
                events={state.events.events}
                recurringEvents={state.events.recurringEvents}
              />
            ) : (
              <div>No event has been created</div>
            )}
          </div>
        </div>
      </div>
    
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  max-height: 100%;
  margin-top: 4rem;
  .org-top {
    display: flex;
    justify-content: space-around;
  }
  
  .row {
    justify-content: space-around;
  }
  
  .details {
  width: 30%;
  }
  .events {
  width: 58%;
  }
  .bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  }
  
  .create-event-button {
  margin-top: 2rem;
  }
  
  .org-title {
  align-self: flex-start;
  margin-left: 10rem;
  }
`;

const StyledDelete = styled(Icon)`
position: absolute;
right: 10px;
top: 10px;
color: transparent;
`;

const StyledAvatarImage = styled.div`
position: relative;
:hover > i {
  color: #ff4d4f;
}
`;

export default OrganizationDashboard;
