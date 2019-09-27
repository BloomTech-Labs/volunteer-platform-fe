import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const HeaderDiv = ( { style, children, loggedIn } ) => {
  return ( <StyledHeader style={ style }>
      <Link to="/" style={ { marginLeft: '30px' } }>
        <h2>
          Volun<span>Tier</span>
        </h2>
      </Link>
      <div className="signup-links">
        { loggedIn || <Link to="/login">Login</Link> }
        { loggedIn || <Link to="/signup">Sign Up</Link> }
      </div>
      { children }
    </StyledHeader> );
};
const StyledHeader = styled( Header )`
  && {
    display: flex;
    justify-content: space-between;
    background: ${ ( { theme } ) => theme.gray3 };
    width:100vw;

    h2 {
      margin-left: 40px;
      font-family: ${ ( { theme } ) => theme.titleText };
      font-size: 24px;
      line-height: 22px;
      color: ${ ( { theme } ) => theme.primary };

      span {
        font-style: italic;
      }
    }

    .signup-links {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-right: 40px;

      a {
        font-size: 14px;
        cursor: pointer;
        font-family: ${ ( { theme } ) => theme.titleText };
        color: ${ ( { theme } ) => theme.primary8 };
      }
    }
  }
`;
export default HeaderDiv;
