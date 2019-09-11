import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../styled";

const MainDashboard = () => {
  return ( <div>
    <Link to={ "/signup" }/>
    <Link to={ "/login" }/>
    <StyledButton>Log out</StyledButton>
    <h1>Shows a list of events.</h1>
  </div> );
};

export default MainDashboard;