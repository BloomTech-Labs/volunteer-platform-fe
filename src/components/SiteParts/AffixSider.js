import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Affix, Layout } from 'antd';
import Navigation  from './Navigation';

const { Sider } = Layout;

export const AffixSider = ({collapsed}) => {
  const [scrollClass, setScrollClass] = useState('top');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      let activeClass = 'scrolled';
      if (window.scrollY <= 30) {
        activeClass = 'top';
      }
      setScrollClass(activeClass);
    });
  }, []);
  return (
    <Affix>
      <StyledSider
        height={'100%'}
        breakpoint="md"
        collapsedWidth="0"
        theme={'light'}
        onBreakpoint={broken => {
          //console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          //console.log(collapsed, type);
        }}
        trigger={null}
        collapsed={collapsed ? 1 : 0}
        reverseArrow={true}
        className={scrollClass}
      >
        <Navigation />
      </StyledSider>
    </Affix>
  );
};

const StyledSider = styled(Sider)`
  &&& {
    position: fixed;
    left: 0px;
    top: 64px;
    z-index: 100;
    min-height: 100vh;
    height: 100vh;
    overflow-y: scroll;
    border-right: 1px solid lightgray;
    .ant-menu-root {
      margin-bottom: 10rem;
    }
    ::-webkit-scrollbar {
      display: none;
    }

    transition: all 0.2s;

    &.scrolled {
      top: 32px;
      transition: all 0.2s;
    }
  }
`;

export default AffixSider;
