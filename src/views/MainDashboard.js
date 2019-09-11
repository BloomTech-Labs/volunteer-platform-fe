import React from "react";
import {Link} from 'react-router-dom'

const MainDashboard = () => {
  return ( <div>
    <Link to={'/signup'}/>
    <Link to={'/login'}/>
    <h1>Shows a list of events.</h1>
    </div> );
};

export default MainDashboard;