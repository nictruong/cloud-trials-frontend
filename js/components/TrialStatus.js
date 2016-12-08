import React from "react";

import Trial from "./Trial/Trial";
import TrialStore from "../stores/TrialStore";

export default class TrialStatus extends React.Component {
  constructor() {
    super();
  }  

  render() {

    const trialComponents = this.props.trials.map((trial) => {
      return <Trial key={trial.trialID} trial={trial} class={this.props.className}/>
    });

    return (
      <div class="row">
        {trialComponents}
      </div>
    );
  }
}