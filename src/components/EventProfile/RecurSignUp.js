import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Collapse, Icon } from 'antd';
import { StyledButton } from '../../styled';

const { Panel } = Collapse;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  margin: '0 auto 24px',
  maxWidth: '80%',
  border: 0,
  overflow: 'hidden',
};

export const RecurSignUp = ({ localState, auth, register, unRegister }) => {
  let current = Object.keys(localState.registeredVolunteers).filter(
    date => moment().unix() - date < 0
  );
  return (
    <StyledRecurSignUp id="recurSignUp">
      <Collapse
        style={{ marginTop: '2rem' }}
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <Icon type="caret-right" rotate={isActive ? 90 : 0} />
        )}
      >
        {current.map(date => {
          return (
            <Panel
              key={date}
              header={moment.unix(date).format('LLL')}
              style={customPanelStyle}
            >
              <h5>
                Spots Remaining:{' '}
                {localState.numberOfVolunteers -
                  localState.registeredVolunteers[date].length}
              </h5>
              {localState.registeredVolunteers[date].includes(
                auth.googleAuthUser.uid
              ) ? (
                <StyledButton onClick={() => unRegister(date)}>
                  Un-Register
                </StyledButton>
              ) : (
                <StyledButton onClick={() => register(date)}>
                  Register
                </StyledButton>
              )}
            </Panel>
          );
        })}
      </Collapse>
    </StyledRecurSignUp>
  );
};

const StyledRecurSignUp = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;
