import React from "react";

export default class NavigationTop extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <div class="navbar-header">
          <a class="navbar-brand" href="index.html">{this.props.title}</a>
        </div>
      </div>
    );
  }
}