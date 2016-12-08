import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import EngDashboard from "../pages/EngDashboard";
import Layout from "../pages/Layout";
import Settings from "../pages/Settings";
import TrialPage from "../pages/TrialPage";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" title="Cloud Trial ALPHA" component={Layout}>
			<IndexRoute component={EngDashboard}></IndexRoute>
			{/*<Route path="settings" name="settings" component={Settings}></Route>*/}
		</Route>
		<Route path="trials/:trialID" name="trial" component={TrialPage}></Route>
	</Router>,
app);