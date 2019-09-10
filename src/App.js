import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Route } from "react-router-dom";
import { signedIn, signedOut } from "./actions/auth";
import firebase from "./firebase/FirebaseConfig";
import Login from "./views/Login";
import "./App.css";

function App(){
  
  /**
   * todo: Get hook from Ethan for dispatch.
   */
  //const [ dispatch ] = useState();
  
  /**
   * Set up google auth on change event handler.
   */
  useEffect( () => {
    firebase.auth()
      .onAuthStateChanged( ( user ) => {
        if( user ){
          //signedIn( dispatch );
        }else{
          //signedOut( dispatch );
        }
        
      } );
  }, [] );
  
  return ( <div className="App">
    <ThemeProvider theme={ theme }>
      <Route to={ "/" } component={ Login }/>
    </ThemeProvider>
  </div> );
}

const theme = {
  primaryColor: "blue", secondaryColor: "green"
};

export default App;
