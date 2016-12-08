import React from "react";
import { Link } from "react-router";

export default class NavigationSide extends React.Component {
  constructor() {
    super();    
  }

  render() {

    return (
      <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav navbar-collapse">
          <ul class="nav" id="side-menu">
            <li>
              <Link to="/"><i class="fa fa-dashboard fa-fw"></i> Dashboard</Link>
            </li>
            {/*<li>
              <Link to="settings"><i class="fa fa-wrench fa-fw"></i> Settings</Link>
            </li>*/}
          </ul>
        </div>
      </div>
    );
  }
}