import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../styled";
import { signOut } from "../actions";
import { useStateValue } from "../hooks/useStateValue";

const MainDashboard = () => {
  const [ state, dispatch ] = useStateValue();
  return ( <div>
    <Link to={ "/signup" }/>
    <Link to={ "/login" }/>
    <StyledButton onClick={ () => signOut( dispatch ) }>Log out</StyledButton>
    <h1>Shows a list of events.</h1>
  </div> );
};

export default MainDashboard;