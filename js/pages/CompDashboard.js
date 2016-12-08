import React from "react";

import Button from "react-bootstrap/lib/Button";
import MyUsers from "./MyUsers";
import PageHeader from "../components/PageHeader";
import * as TrialActions from "../actions/TrialActions";
import TrialStore from "../stores/TrialStore";
import TrialUserAdder from "../components/TrialUserAdder";

export default class CompDashboard extends React.Component {
  constructor() {
    super();

    this.state = { trials: [] };

    TrialActions.loadTrialsForVendor();

    this.getAllTrialsForVendor = this.getAllTrialsForVendor.bind(this);
  }

  componentWillMount() {
    TrialStore.on("fetched", this.getAllTrialsForVendor);
  }

  componentWillUnmount() {
    TrialStore.removeListener("fetched", this.getAllTrialsForVendor);
  }

  getAllTrialsForVendor() {
    var trials = TrialStore.getAllTrialsForVendor();

    this.setState({ trials });
  }

  render() {

    return (
      <div id="page-wrapper">
        <PageHeader title="My Cloud Trials"/>
        <MyUsers trials={this.state.trials}/>
        {/*<TrialUserAdder/>*/}
      </div>
    );
  }
}