import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

export const HeaderDiv = ({ style, children, loggedIn }) => {
  return (
    <StyledHeader style={style}>
      <Link to="/" style={{ marginLeft: '30px' }}>
        VolunTier
      </Link>
      {loggedIn || <Link to="/login">Login</Link>}
      {loggedIn || <Link to="/signup">Sign Up</Link>}
      {children}
    </StyledHeader>
  );
};
const StyledHeader = styled(Header)`
  && {
    display: flex;
    justify-content: space-between;
  }
`;
export default HeaderDiv;
