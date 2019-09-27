import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Icon, Select, Tooltip, Calendar} from 'antd';
import {Link} from 'react-router-dom';
import {
  getAllEventsByOrg,
  deleteOrganization,
  getFileUrl,
  updateOrganization,
  deleteOrganizationImage,
  getAllRecurringEventsByOrg,
} from '../actions';
import { useStateValue } from '../hooks/useStateValue';
import EventList from '../components/EventList';
import {
  StyledButton,
  StyledAvatar,
  StyledUploadImage,
  deleteModal,
  StyledCard,
} from '../styled';
import moment from 'moment';

export const OrganizationDashboard = props => {
  const [state, dispatch] = useStateValue();
  const [displayOrg, setDisplayOrg] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [calendarValue, setCalendarValue] = useState(moment());
 
  useEffect(() => {
    if (displayOrg.imagePath) {
      getFileUrl(displayOrg.imagePath).then(res => {
        setImageUrl(res);
      });
    } else {
      setImageUrl(null);
    }
  }, [displayOrg]);

  useEffect(() => {
    if (state.auth.googleAuthUser) {
      const uid = state.auth.googleAuthUser.uid;
    }
  }, []);

  const changeHandler = value => {
    setDisplayOrg(
      state.org.userOrganizations.find(item => item.orgId === value)
    );
  };

  useEffect(() => {
    if (state.org.userOrganizations.length > 0) {
      setDisplayOrg(state.org.userOrganizations[0]);
    }
  }, [state.org.userOrganizations]);

  useEffect(() => {
    if (displayOrg) {
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
    getFileUrl(path)
      .then(url => {
        setImageUrl(url);
        const updatedDisplayOrg = {
          ...displayOrg,
          imagePath: path,
          imageUrl: url,
        };
        updateOrganization(displayOrg.orgId, updatedDisplayOrg, dispatch);
      })
      .catch(err => console.log(err));
  };
  const onSelect = (value, mode) => {
    const begining = value.startOf('date');
    const newValue = moment.unix(begining.unix());
    debugger;
    if (selectedDate){
      
      const date2 = newValue.unix();
      if (selectedDate === date2){
        setSelectedDate(null);
      }else{
        setSelectedDate(newValue.unix());
      }
    }else{
      setSelectedDate(newValue.unix());
    }
    
    setCalendarValue(newValue);
  };
  
  function onPanelChange(value, mode){
    console.log(value, mode);
  }

  return (
    <StyledDashboard>
      <h4 className={'org-title'}>Dashboard of</h4>
      <h2 className={'org-name'}>{displayOrg.organizationName}</h2>
      <div className={'org-actions'}>
        <div className={'action'}>
          <div className={'action-icon'}>
            <Icon type="edit" />
          </div>
          <span>Update Org. Info</span>
        </div>
        <div className={'action'}>
          <Link
            to={{
              pathname: '/org-dashboard/create-event',
              state: {
                org: displayOrg,
              },
            }}
          >
            <div className={'action-icon'}>
              <Icon type="form"/>
            </div>
            <span>Create Event</span>
          </Link>
        </div>
        <div className={'action'}>
          <div className={'action-icon'}>
            <Icon type="delete" />
          </div>
          <span>Delete Org</span>
        </div>
      </div>

      <div className={'row mg-lf-4 row-wrap'}>
        <div className={'column'}>
          <StyledCard backgroundColor={'#E8E8E8'}>
            {imageUrl ? (
              <StyledAvatarImage className={'column'}>
                <StyledAvatar shape="square" size={256} src={imageUrl} />
                <Tooltip title={'Delete Avatar'}>
                  <StyledDelete
                    onClick={() => deleteOrganizationImage(displayOrg)}
                    type="close"
                  />
                </Tooltip>
              </StyledAvatarImage>
            ) : (
              <StyledUploadImage fileUploadComplete={onFileUpload} />
            )}
          </StyledCard>
        </div>
        <StyledCard backgroundColor={'#E8E8E8'}>
          <Select defaultValue="select" onChange={changeHandler}
                  value={displayOrg ? displayOrg.orgId : ''}>
            {state.org.userOrganizations.map(item => (
              <Select.Option key={item.orgId} value={item.orgId}>
                {item.organizationName}
              </Select.Option>
            ))}
          </Select>
          <div className={'org-top'}>
            <div className={'org-top-col'}>
              <h3>Hours of operations:</h3>
              {displayOrg && (
                <h5>
                  {displayOrg.daysOfTheWeek.daysOfTheWeek.map(day => {
                    return <span className={'day'}>{day}</span>;
                  })}
                </h5>
              )}
              {displayOrg && <h5>Opens: {displayOrg.startTime}</h5>}
              {displayOrg && <h5>Closes: {displayOrg.endTime}</h5>}
            </div>
            <div className={'org-top-col'}>
              <h3>Hours of operations:</h3>
              {displayOrg && (
                <h5>
                  {displayOrg.daysOfTheWeek.map(day => {
                    return <span className={'day'}>{day}</span>;
                  })}
                </h5>
              )}
              {displayOrg && <h5>Opens: {displayOrg.startTime}</h5>}
              {displayOrg && <h5>Closes: {displayOrg.endTime}</h5>}
            </div>
          </div>
        </StyledCard>

        <div className={'bottom'}>
          <div className={'details'}>
            {displayOrg ? (
              <div style={{
                width: 300,
                border: '1px solid #d9d9d9',
                borderRadius: 4,
              }}>
                <Calendar fullscreen={false}
                          disabledDate={current =>
                            current && current < moment().startOf('day')}
                          onSelect={onSelect}
                          value={calendarValue}
                          onPanelChange={onPanelChange}
                
                />
              </div>
            ) : (
              <div>You have not created any organization yet</div>
            )}
          </div>
          <div className={'events'}>
            {state.events.events.length > 0 ||
            state.events.recurringEvents.length > 0 ? (
              <EventList
                events={selectedDate ? state.events.events.filter(event => {
                  
                  const isBigger = event.date >=
                    selectedDate;
                  const lessThanNextDay = event.date <
                    moment.unix(selectedDate)
                      .add(1, 'day')
                      .startOf('day')
                      .unix();
                  
                  if (isBigger && lessThanNextDay){
                    return true;
                  }
                  return false;
                  
                }) : state.events.events}
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
  margin-top: 3rem;
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
    border: 2px solid ${props => props.theme.primary5};
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
