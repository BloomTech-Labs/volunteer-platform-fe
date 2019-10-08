import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useStateValue } from '../hooks/useStateValue';
import {
  StyledButton,
  StyledLine,
  StyledAvatar,
  StyledLoader,
} from '../styled';
import {
  createNewMessageThread,
  getOrganizationByOrgId,
  getAllEventsByOrg,
  getAllRecurringEventsByOrg,
} from '../actions';
import styled from 'styled-components';
import { StyledAboutUs, StyledDashboard } from './OrganizationDashboard';
import { OrgInfo, EventPanel } from '../components/OrgDashboard';
import { Calendar } from 'antd';

export const OrganizationProfile = ({ match, history }) => {
  const [{ org, auth, events }, dispatch] = useStateValue();
  const [selectedDate, setSelectedDate] = useState();
  const [calendarValue, setCalendarValue] = useState(moment());
  const { organization } = org;
  useEffect(() => {
    getOrganizationByOrgId(match.params.id, dispatch);
    getAllEventsByOrg(match.params.id, dispatch);
    getAllRecurringEventsByOrg(match.params.id, dispatch);
  }, [match.params.id]);

  const createMessageThread = () => {
    const from = {
      type: 'users',
      uid: auth.googleAuthUser.uid,
    };

    const to = {
      type: 'organizations',
      uid: org.organization.orgId,
    };

    createNewMessageThread(to, from);
    history.push('/messages');
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

  return (
    <StyledOrgProfile>
      <h2 className={'org-name'}>{organization.organizationName}</h2>
      <StyledLine />
      <StyledButton onClick={createMessageThread}>Message</StyledButton>
      <div className="top-row">
        {organization.imageUrl && (
          <StyledAvatar shape="square" size={187} src={organization.imageUrl} />
        )}
        <StyledAboutUs backgroundcolor={'#E8E8E8'} borderRadius="0px">
          <h5>About Us</h5>
          <StyledLine width={'40%'} />
          <p>{organization.aboutUs}</p>
        </StyledAboutUs>
      </div>
      <div className="bottom-part">
        <div className="left-col">
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
        <div className="right-col">
          <OrgInfo displayOrg={organization} />
        </div>
      </div>
    </StyledOrgProfile>
  );
};

const StyledOrgProfile = styled(StyledDashboard)`
  
`;
