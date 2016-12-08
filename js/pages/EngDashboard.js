import moment from "moment";
import React from "react";

import PageHeader from "../components/PageHeader";
import * as TrialActions from "../actions/TrialActions";
import TrialStatus from "../components/TrialStatus";
import TrialStore from "../stores/TrialStore";

export default class Dashboard extends React.Component {
  constructor() {
    super();

    TrialActions.loadTrials();

    this.state = {
      activeTrials: [],
      expiredTrials: [],
    };

    this.getAllTrials = this.getAllTrials.bind(this);
  }

  componentWillMount() {
    TrialStore.on("change", this.getAllTrials);
  }

  componentWillUnmount() {
    TrialStore.removeListener("change", this.getAllTrials);
  }

  getAllTrials() {
    var trials = TrialStore.getAll();

    var that = this;

    trials.map(function (trial) {

      if (!(moment(trial.startDatetime).add(7, "days") < moment())) {
        that.state.activeTrials.push(trial);

        that.setState({
          activeTrials: that.state.activeTrials,
        })
      }
    });
  }

  render() {

    return (
      <div id="page-wrapper">
        <PageHeader title="My Software Tests"/>
        <TrialStatus trials={this.state.activeTrials} class="primary"/>
      </div>
    );
  }
}