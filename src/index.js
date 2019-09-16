import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { StateProvider } from './contexts/StateProvider';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as reset from './styles/reset.css';
import * as global from './styles/global.css';
import { initialState } from './reducers/initialState';
import { mainReducer } from './reducers/mainReducer';

const GlobalStyle = createGlobalStyle`
    ${ reset }
    ${ global }
    body{
        font-family: ${ ( { theme } ) => theme.loraFont }
    }
`;

const theme = {
  primaryColor: 'blue', secondaryColor: 'green', borderRadiusDefault: '10px',
};

ReactDOM.render( <ThemeProvider theme={ theme }>
  <>
    <GlobalStyle/>
    <StateProvider initialState={ initialState } reducer={ mainReducer }>
      <Router>
        <App/>
      </Router>
    </StateProvider>
  </>
</ThemeProvider>, document.getElementById( 'root' ) );
