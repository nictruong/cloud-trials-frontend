/*import fetch from "fetch";*/

import dispatcher from "../dispatcher";

export function createTrial(software) {
	dispatcher.dispatch({
		type: "CREATE_TRIAL",
		software,
	});
}

export function deleteTrial(id) {
	dispatcher.dispatch({
		type: "DELETE_TRIAL",
		id,
	});
}

export function loadTrials() {
	dispatcher.dispatch({
		type: "FETCH_TRIALS",
	});

	fetch(location.protocol + '//' + location.hostname + '/api/public/trials', {
		method: 'get',
		credentials: 'include'
	}).then(function(response) {
		response.json().then(function(data) {
			dispatcher.dispatch({
				type: "RECEIVE_TRIALS",
				data: data,
			})
		});
	});
}

export function updateTrialTime(trialID) {	

	dispatcher.dispatch({
		type: "UPDATING_TRIAL_TIME",
	});

	fetch(location.protocol + '//' + location.hostname + '/api/public/trials/time/' + trialID, {
		method: 'get',
		credentials: 'include'
	}).then(function(response) {
		console.log("Trial started!");

		loadTrials();

		dispatcher.dispatch({
			type: "UPDATED_TRIAL_TIME"
		})
	});
}

export function loadTrialsForVendor() {
	dispatcher.dispatch({
		type: "FETCH_TRIALSFORVENDOR",
	});

	fetch(location.protocol + '//' + location.hostname + '/api/public/vendor/trials', {
		method: 'get',
		credentials: 'include'
	}).then(function(response) {
		response.json().then(function(data) {
			dispatcher.dispatch({
				type: "RECEIVE_TRIALSFORVENDOR",
				data: data,
			})
		});
	});
}

export function addUserAndTrial(email) {

	fetch(location.protocol + '//' + location.hostname + '/api/public/users', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email
		}),
		credentials: 'include'
	}).then(function(response) {

		response.json().then(function(data) {

			if (data.id) {
				fetch(location.protocol + '//' + location.hostname + '/api/public/trials', {
					method: 'post',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"userID": data.id,
						"software": {
							"software_id": 49
						}
					}),
					credentials: 'include'
				}).then(function(response) {
					loadTrialsForVendor();
				});
			}else{
				console.log("error");
			}

			
		});
	}).catch(function(e) {
		console.log(e);
	});
}