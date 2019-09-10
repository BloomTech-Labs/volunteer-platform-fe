import React, { useEffect } from "react";
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
    
      <Route to={ "/" } component={ Login }/>
    
  </div> );
}



export default App;
