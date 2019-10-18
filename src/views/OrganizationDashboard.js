import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, Select } from 'antd';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import {
  getAllEventsByOrg,
  deleteOrganization,
  getFileUrl,
  updateOrganization,
  deleteOrganizationImage,
  getAllRecurringEventsByOrg,
} from '../actions';
import {
  OrgButtons,
  OrgPhoto,
  OrgInfo,
  EventPanel,
} from '../components/OrgDashboard';
import { deleteModal, StyledCard, StyledLine, StyledLoader } from '../styled';

export const OrganizationDashboard = props => {
  const [{ events }, dispatch] = useStateValue();
  const [displayOrg, setDisplayOrg] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [calendarValue, setCalendarValue] = useState(moment());

  useEffect(() => {
    if (props.location.state) {
      setDisplayOrg(props.location.state.org);
      getAllEventsByOrg(props.location.state.org.orgId, dispatch);
      getAllRecurringEventsByOrg(props.location.state.org.orgId, dispatch);

      if (props.location.state.org.imageUrl) {
        setImageUrl(props.location.state.org.imageUrl);
      } else {
        setImageUrl(null);
      }
    }
  }, [props.location]);

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

  const onSelect = value => {
    const beginning = value.startOf('date');
    const newValue = moment.unix(beginning.unix());
    if (selectedDate) {
      const date2 = newValue.unix();
      if (selectedDate === date2) {
        setSelectedDate(null);
        setCalendarValue(moment());
      } else {
        setSelectedDate(newValue.unix());
        setCalendarValue(newValue);
      }
    } else {
      setSelectedDate(newValue.unix());
      setCalendarValue(newValue);
    }
  };

  const onPanelChange = (value, mode) => {
    setCalendarValue(moment.unix(value.unix()));
  };

  const displayAll = e => {
    e.preventDefault();
    setSelectedDate(null);
    setCalendarValue(moment());
  };

  const deleteImage = org => {
    deleteOrganizationImage(org);
    setImageUrl(null);
  };

  return (
    <StyledDashboard>
      <h2 className={'org-name'}>{displayOrg.organizationName}</h2>

      <OrgButtons displayOrg={displayOrg} deleteOrg={deleteOrg} />

      <StyledContent>
        <div className={'left-col'}>
          <OrgPhoto
            imageUrl={imageUrl}
            imageOwner={displayOrg}
            deleteImage={deleteImage}
            onFileUpload={onFileUpload}
            imageName={displayOrg.orgId}
          />
          <div className="calendar">
            <Calendar
              fullscreen={false}
              disabledDate={current =>
                current && current < moment().startOf('day')
              }
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              value={calendarValue}
              style={{
                width: 300,
                border: '1px solid #d9d9d9',
                borderRadius: 4,
              }}
            />
          </div>
          <StyledAboutUs backgroundcolor={'#E8E8E8'} borderRadius="0px">
            <h5>About Us</h5>
            <StyledLine width={'40%'} />
            <p>{displayOrg.aboutUs}</p>
          </StyledAboutUs>
        </div>
        <div className={'right-col'}>
          <OrgInfo displayOrg={displayOrg} />
          {events.isLoading ? (
            <StyledLoader />
          ) : (
            <EventPanel
              recurringEvents={events.recurringEvents}
              events={events.events}
              selectedDate={selectedDate}
              displayAll={displayAll}
            />
          )}
        </div>
      </StyledContent>
    </StyledDashboard>
  );
};

export const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 1020px;
  margin: 0 auto;

  .org-title {
    margin-bottom: 0.7rem;
  }

  .org-name {
    margin-bottom: 2.5rem;
    margin-top: 0;
    font-size: 40px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
  align-items: baseline;

  .left-col {
    display: flex;
    flex-direction: column;
    align-items: center;

    .calendar {
      margin-bottom: 70px;
    }
  }

  .right-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 55%;
  }
`;

export const StyledAboutUs = styled(StyledCard)`
  .ant-card-body {
    padding: 6px;
  }
  h5 {
    font-size: 16px;
    text-align: center;
  }

  p {
    margin-top: 10px;
    padding: 15px;
  }
`;
export default OrganizationDashboard;
