import dispatcher from "../dispatcher";

export function open() {
	dispatcher.dispatch({
		type: "OPEN_MENU",
	});
}

export function close() {
	dispatcher.dispatch({ 
		type: "CLOSE_MENU",
	});
}