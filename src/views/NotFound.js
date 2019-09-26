import React from 'react';
import styled from 'styled-components';
import pug from '../assets/404.jpg';

const MainContent = styled.div`
  margin: 0 auto;
  padding: 8px 24px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  position: absolute;

  img {
    object-fit: cover;
    width: 100%;
  }
`;

const NotFoundMessage = styled.div`
  position: absolute;
  top: 30px;
  right: 15%;
  width: 200px;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  span {
    display: block;
    font-size: 72px;
    font-style: italic;
    line-height: 1;
  }
`;

const GoBackMessage = styled.a`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  line-height: 1;
  top: 32px;
  height: 32px;
  left: 5%;
  text-align: center;
  color: ${props => props.theme.gray9};
  background-color: ${props => props.theme.accent6};
  border-radius: 0 20px 20px 0;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 100%;
    width: 0;
    height: 0;
    border-width: 16px;
    border-style: solid;
    border-color: ${props => props.theme.accent6};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  &:hover {
    color: ${props => props.theme.gray2};
  }
`;

export const NotFound = () => {
  return (
    <MainContent>
      <img src={pug} />
      <NotFoundMessage>
        <span>404</span>NOT FOUND
      </NotFoundMessage>
      <GoBackMessage href="/">
        <div>Back Home</div>
      </GoBackMessage>
    </MainContent>
  );
};
