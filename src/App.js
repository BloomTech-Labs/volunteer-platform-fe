import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import { signedIn, signedOut } from "./actions/auth";
import { useStateValue } from "./hooks/useStateValue";
import firebase from "./firebase/FirebaseConfig";
import MainDashboard from "./views/MainDashboard";
import "./App.css";
import Login from "./views/Login";
import CreateOrg from "./views/CreateOrg";
import OrganizationDashboard from "./views/OrganizationDashboard";
import Signup from "./views/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRoute from "./components/LoginRoute";
import SignupRoute from "./components/SignupRotue";

function App(){
  
  const [ state, dispatch ] = useStateValue();
  
  /**
   * Set up google auth on change event handler.
   */
  useEffect( () => {
    firebase.auth()
      .onAuthStateChanged( ( user ) => {
        debugger;
        if( user ){
          signedIn( user, dispatch );
        }else{
          signedOut( dispatch );
        }
        
      } );
  }, [] );
  
  return ( <div className="App">
    <Switch>
      <ProtectedRoute path={ "/" } component={ MainDashboard } exact/>
      <LoginRoute path={ "/login" } component={ Login }/>
      <ProtectedRoute path={ "/create-org" } component={ CreateOrg }/>
      <ProtectedRoute path={ "/org-dashboard" }
                      component={ OrganizationDashboard }/>
      <SignupRoute path={ "/signup" } component={ Signup }/>
    </Switch>
  
  </div> );
}

export default App;
