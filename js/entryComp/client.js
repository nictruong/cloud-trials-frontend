import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import CompDashboard from "../pages/CompDashboard";
import Layout from "../pages/Layout";
import Settings from "../pages/Settings";
import TrialPage from "../pages/TrialPage";

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" title="Vendor Dashboard ALPHA" component={Layout}>
			<IndexRoute component={CompDashboard}></IndexRoute>
			{/*<Route path="settings" name="settings" component={Settings}></Route>*/}
		</Route>
	</Router>,
app);