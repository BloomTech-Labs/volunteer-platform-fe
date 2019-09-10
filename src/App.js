import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { signedIn, signedOut } from "./actions/auth";
import { useStateValue } from "./hooks/useStateValue";
import firebase from "./firebase/FirebaseConfig";
import Login from "./views/Login";
import "./App.css";

function App(){
  
  const [ state, dispatch ] = useStateValue();
  
  /**
   * Set up google auth on change event handler.
   */
  useEffect( () => {
    firebase.auth()
      .onAuthStateChanged( ( user ) => {
        if( user ){
          signedIn( user, dispatch );
        }else{
          signedOut( dispatch );
        }
        
      } );
  }, [] );
  
  return ( <div className="App">
    
    <Route to={ "/" } component={ Login }/>
  
  </div> );
}

export default App;
