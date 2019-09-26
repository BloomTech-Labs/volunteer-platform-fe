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
  deleteModal, StyledCard,
} from '../styled';

export const OrganizationDashboard = (props) => {
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
      
      <h4 className={'org-title'}>Dashboard of</h4>
      <h2 className={'org-name'}>{displayOrg.organizationName}</h2>
      <div className={'org-actions'}>
        <div className={'action'}>
          <div className={'action-icon'}>
            <Icon type="edit"/>
          </div>
          <span>Update Org. Info</span>
        </div>
        <div className={'action'}>
          <div className={'action-icon'}>
            <Icon type="form"/>
          </div>
          <span>Create Event</span>
        </div>
        <div className={'action'}>
          <div className={'action-icon'}>
            <Icon type="delete"/>
          </div>
          <span>Delete Org</span>
        </div>
      </div>
      
      <div className={'row mg-lf-4 row-wrap'}>
        <div className={'column'}>
          <StyledCard backgroundColor={'#E8E8E8'}>
            {imageUrl ? (
              <StyledAvatarImage className={'column'}>
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
          </StyledCard>
        </div>
        <StyledCard backgroundColor={'#E8E8E8'}>
          
          <h3>Org Info.</h3>
          <div className={'org-top'}>
            <div className={'org-top-col'}>
              <h3>Hours of operations:</h3>
              {displayOrg && <h5>{displayOrg.daysOfTheWeek.daysOfTheWeek.map(day => {
                return (<span className={'day'}>{day}</span>);
              })}</h5>}
              {displayOrg && <h5>Opens: {displayOrg.startTime}</h5>}
              {displayOrg && <h5>Closes: {displayOrg.endTime}</h5>}
            </div>
            <div className={'org-top-col'}>
              <h3>Hours of operations:</h3>
              {displayOrg && <h5>{displayOrg.daysOfTheWeek.map(day => {
                return (<span className={'day'}>{day}</span>);
              })}</h5>}
              {displayOrg && <h5>Opens: {displayOrg.startTime}</h5>}
              {displayOrg && <h5>Closes: {displayOrg.endTime}</h5>}
            </div>
          
          </div>
        
        </StyledCard>
        
        <div className={'bottom'}>
          <div className={'details'}>
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
    margin-bottom: 0;
  }
  
  .org-name {
    margin-bottom: 4rem;
  }
  
  .org-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 2px solid ${props => props.theme.primary5}
  width: 50%;
  min-height: 80px;
  margin-bottom: 3rem;
  }
  
  .action {
    padding: 1rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
  }
  
  .action-icon {
    color: ${props => props.theme.gray1};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: ${props => props.theme.gray8};
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
  
  .day:not(:first-child) {
    margin-left: 1rem;
  }
  
  .org-top-col {
    display: flex;
    flex-direction: column;
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
