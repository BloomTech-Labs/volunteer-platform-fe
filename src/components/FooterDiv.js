import React from 'react';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';
import styled from 'styled-components';

const {Footer} = Layout;

export const FooterDiv = () => {
  return (
    <StyledFooter className='Footer'>
      <div className='container'>
        <div className='sitemap'>
          <h5>Site Map</h5>
          <div className='links'>
            <div className='links-left'>
              <Link to="/">Home</Link>
              <Link to="/dashboard">Browse Events</Link>
            </div>
            <div className='links-right'>
              <Link to="/dashboard">Create Organization</Link>
              <Link to="/">View Volunteers</Link>
            </div>
          </div>
        </div>
        <div className='Logo'>
          <h5>Volun<span>Tier </span></h5>
          <h6> © 2019</h6>
        </div>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled(Footer)`
z-index: 100;
.container {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    width: 100vw;

    .sitemap {
        display: flex;
        flex-direction: column;
        max-width: 50%;
        padding: 0px;
        width: 100vw;

        h5 {
            font-weight:bold;
            letter-spacing: 1px;
        }
    }
    
    .links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        letter-spacing: 1px;

    .links-left, .links-right {
        display: flex;
        flex-direction: column;
        margin-left: 1%
    }
        
        a {
            font-size: 12px;
            cursor: pointer;
            font-family: ${({theme}) => theme.titleText};
            color: ${({theme}) => theme.primary8};
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
    
    
    .Logo {
        margin-right: 10%;
        display:flex;
        font-family: ${({theme}) => theme.titleText};
        z-index: 20 !important;
        height: 100%;

        h5 {       
            color: ${({theme}) => theme.primary};
            z-index: 20;
            height: 100%;
            margin-right: 10px;
                span {
                    font-style: italic;
                }
        }
    }
}
`;

export default FooterDiv;
    