import React from "react";

import Navigation from "../components/Navigation";

// STATE FOR INTERNAL
// PROPS FOR INJECTING

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <Navigation title={this.props.route.title}/>
        {this.props.children}
      </div>
    );
  }
}