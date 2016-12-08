import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TrialStore extends EventEmitter {
	constructor() {
		super();
	}

	loadTrials(data) {
		this.trials = data;
		this.emit("change");
	}

	loadTrialsForVendor(data) {
		this.trialsForVendor = data;
		this.emit("fetched");
	}

	getAll() {
		return this.trials;
	}

	getAllTrialsForVendor() {
		return this.trialsForVendor;
	}

	getTrial(trialID) {
		for (var i=0; i<this.trials.length; i++) {			
			if (this.trials[i].trialID == trialID) {
				return this.trials[i];
			}
		}
	}

	handleActions(action) {
		switch(action.type) {
			case "CREATE_TRIAL": {
				this.createTrial(action.software);
				break;
			}
			case "RECEIVE_TRIALS": {
				this.loadTrials(action.data);
				break;
			}
			case "UPDATING_TRIAL_TIME": {
				console.log("updating");
				this.emit("updating");
				break;
			}
			case "UPDATED_TRIAL_TIME": {
				console.log("updated");
				this.emit("updated");
				break;
			}
			case "FETCH_TRIALSFORVENDOR": {
				this.emit("fetching");
				break;
			}
			case "RECEIVE_TRIALSFORVENDOR": {
				this.loadTrialsForVendor(action.data);
				break;
			}
		}
	}
}

const trialStore = new TrialStore;
TrialStore.dispatchToken = dispatcher.register(trialStore.handleActions.bind(trialStore));

export default trialStore;