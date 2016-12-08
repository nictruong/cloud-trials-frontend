import React from "react";
import Iframe from "react-iframe";

import Loader from "react-loader";
import MenuStore from "../stores/MenuStore";
import NavigationBottom from "../components/navigation/NavigationBottom";
import * as TrialActions from "../actions/TrialActions";
import TrialStore from "../stores/TrialStore";

export default class TrialPage extends React.Component {
  constructor(props) {
    super(props);

    this.getTrialUrl = this.getTrialUrl.bind(this);
    this.getTrial = this.getTrial.bind(this);

    this.state = { 
      loaded: false, 
      style: { 
        marginLeft: "0px", 
        paddingLeft: "0px", 
        width: "100%"
      },
      iframe: <div></div>,
      modal: "activeModal"
    };
    
    let trialID = this.props.params.trialID;
    let trial = this.getTrial(trialID);

    if (trial.startDatetime === "0000-00-00 00:00:00") {
      TrialActions.updateTrialTime(trialID);
    }

    this.state = {
      loaded: true,
      iframe: <Iframe id="iframe" url={this.getTrialUrl(this.props.params.trialID)} width="100%" height="95%" />,
      modal: "activeModal"
    }    
  }

  getTrialUrl(trialID) {
    return TrialStore.getTrial(trialID).v2Url;
  }

  getTrial(trialID) {
    return TrialStore.getTrial(trialID);
  }

  render() {

    return (
      <div style={this.state.style}>
        {/*<Loader loaded={this.state.loaded}>*/}
          {this.state.iframe}
        {/*</Loader>*/}
        <NavigationBottom trial={this.getTrial(this.props.params.trialID)}/>
      </div>
    );
  }
}