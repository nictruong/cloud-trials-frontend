import React from "react";

import PageHeader from "../components/PageHeader";

export default class Settings extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div id="page-wrapper">
        <PageHeader title="Settings"/>
      </div>
    );
  }
}