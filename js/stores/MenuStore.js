import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MenuStore extends EventEmitter {
	constructor() {
		super();
	}

	handleActions(action) {
		switch(action.type) {
			case "OPEN_MENU": {
				this.emit("open");
				break;
			}
			case "CLOSE_MENU": {
				this.emit("close");
				break;
			}
		}
	}
}

const menuStore = new MenuStore;
dispatcher.register(menuStore.handleActions.bind(menuStore));
window.dispatcher = dispatcher;

export default menuStore;