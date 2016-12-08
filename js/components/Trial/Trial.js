import Countdown from "react-cntdwn";
import moment from "moment";
import React from "react";
import { Link } from "react-router";

export default class Trial extends React.Component {
  constructor() {
  	super();
  }

  render() {

  	let className;
  	let component;
  	let link;  	

  	if (this.props.className === "red") {
  		className = "panel panel-red";

  		link = <div></div>		
  	}else{
		className = "panel panel-primary";  		

		if (this.props.trial.startDatetime === "0000-00-00 00:00:00") {
	  		component = <div class="react-count-down date">7 days</div>

	  		link = <Link to={"trials/" + this.props.trial.trialID}>
		                <div class="panel-footer">
		                    <span class="pull-left">Start</span>
		                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
		                    <div class="clearfix"></div>
		                </div>
		            </Link>
	  	}else{

	  		let endDate = moment(this.props.trial.startDatetime).add(7, "days").toDate();

	  		const format = {
	  			day: 'DD',
	  			hour: 'HH',
	  			minute: 'MM',
	  			second: 'SS'
	  		};

	  		component = <div><Countdown format={format} targetDate={endDate} timeSeparator={' '} /><div>Time left</div></div>

	  		link = <Link to={"trials/" + this.props.trial.trialID}>
		                <div class="panel-footer">
		                    <span class="pull-left">Resume</span>
		                    <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
		                    <div class="clearfix"></div>
		                </div>
		            </Link>
	  	}
  	}

    return (
	    <div class="col-lg-8 col-md-12">
	        <div class={className}>
	            <div class="panel-heading">
	                <div class="row">
	                    <div class="col-xs-7">
	                        {/*<i class="fa fa-comments fa-5x"></i>*/}
	                        <img src="sframelogowithtxt350x92.png" />
	                    </div>
	                    <div class="col-xs-5 text-right">
	                        {component}
	                    </div>
	                </div>
	            </div>
	            {link}
	        </div>
	    </div>
    );
  }
}