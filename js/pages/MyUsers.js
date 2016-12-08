import React from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Loader from "react-loader";
import moment from "moment";
import * as TrialActions from "../actions/TrialActions";
import TrialStore from "../stores/TrialStore";
import TrialUserAdder from "../components/TrialUserAdder";

export default class MyUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      sortName: undefined,
      sortOrder: undefined
    };

    this.onSortChange = this.onSortChange.bind(this);
    this.sortDurations = this.sortDurations.bind(this);
    this.columnClassNameFormat = this.columnClassNameFormat.bind(this);
    this.loadSpinner = this.loadSpinner.bind(this);
    this.unloadSpinner = this.unloadSpinner.bind(this);
  }

  onSortChange(sortName, sortOrder) {
    this.setState({
      sortName,
      sortOrder
    });
  }

  sortDurations(a, b, order) {

    var dummyA = moment.duration(a.totalDuration.replace(/(h )|(m )/g, ":").replace(/s/g, ""));
    var dummyB = moment.duration(b.totalDuration.replace(/(h )|(m )/g, ":").replace(/s/g, ""));

    if (order == 'desc') {
      return dummyA.asSeconds() - dummyB.asSeconds();
    }else{
      return dummyB.asSeconds() - dummyA.asSeconds();
    }
  }

  columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
    return fieldValue === "Offline" ? 'offline' : 'online';
  }

  componentWillMount() {
    TrialStore.on("fetching", this.loadSpinner);
    TrialStore.on("fetched", this.unloadSpinner);
  }

  loadSpinner() {
    this.setState({ loaded: false });
  }

  unloadSpinner() {
    this.setState({ loaded: true }); 
  }

  render() {
  
    if (this.props.trials) {
      var data = this.props.trials;
    }

    var data = data.map((trial)=> {

      console.log(trial);

      if (trial.history.sessions != null && trial.history.sessions.length !=0) {

        console.log("inside");

        var totalDuration = moment.duration(0);

        for (var i=0; i<trial.history.sessions.length; i++) {
          var duration = moment.duration(trial.history.sessions[i].duration.replace(/(h )|(m )/g, ":").replace(/s/g, ""));
          totalDuration = totalDuration.add(duration);
        }  

        trial.totalDuration = "" + totalDuration.hours() + "h " + totalDuration.minutes() + "m " + totalDuration.seconds() + "s";

        if (trial.history.sessions.length == trial.history.connections.length) {
          trial.status = "Offline";
        }else{
          trial.status = "Online";
        }

        trial.endDatetime = moment(trial.startDatetime).add(7, 'days').format("YYYY-MM-DD hh:mm:ss");

        console.log(trial.startDatetime);
        console.log(trial.endDatetime);

      }else{
        trial.endDatetime = "Not yet activated";
        trial.totalDuration = "0h 0m 0s";
        trial.status = "Offline";
      }

      return trial;
    });

    return (
      <Loader loaded={this.state.loaded}>
        <BootstrapTable data={data} striped={true} hover={true}>
          <TableHeaderColumn isKey={true} dataField="trialId" width='25' dataSort={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="email" dataSort={true}>Email</TableHeaderColumn>
          <TableHeaderColumn dataField="startDatetime" dataSort={true} >Trial Start</TableHeaderColumn>
          <TableHeaderColumn dataField="endDatetime" dataSort={true} >Trial End</TableHeaderColumn>
          <TableHeaderColumn dataField="totalDuration" dataSort sortFunc={this.sortDurations}>Total Duration</TableHeaderColumn>
          <TableHeaderColumn dataField="status" dataSort={true} columnClassName={this.columnClassNameFormat}>Status</TableHeaderColumn>
        </BootstrapTable>
        <TrialUserAdder/>
      </Loader>
    );
  }
}