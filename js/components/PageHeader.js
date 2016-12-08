import React from "react";

export default class PageHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header">{this.props.title}</h1>
          </div>
      </div>
    );
  }
}