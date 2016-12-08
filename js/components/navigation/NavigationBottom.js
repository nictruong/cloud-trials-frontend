import React from "react";

import Button from "react-bootstrap/lib/Button";
import Countdown from "react-cntdwn";
import Modal from "react-bootstrap/lib/Modal";
import { Link } from "react-router";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Popover from "react-bootstrap/lib/Popover";
import YoutubePlayer from 'react-youtube-player';
import Tooltip from "react-bootstrap/lib/Tooltip";

export default class NavigationBottom extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.trial.startDatetime == "0000-00-00 00:00:00") {
      this.state = {modal: "activeModal"};  
    }else{
      this.state = {modal: "unactiveModal"};
    }
    
    this.triggerModal = this.triggerModal.bind(this);
  }

  triggerModal() {
    if (this.state.modal == "activeModal") {
      this.setState( { modal: "unactiveModal" });
    }else{
      this.setState( { modal: "activeModal" });
    }
  }

  render() {

    const style = {
      "marginBottom": 0
    };

    const popoverHover = (
      <Popover id="modal-popover" title="Need help?">
        Click to contact support, or call 1(800)XXX-XXXX
      </Popover>
    );

    if (this.props.trial.startDatetime != "0000-00-00 00:00:00") {
      var endDate = moment(this.props.trial.startDatetime).add(7, "days").toDate();
    }else{
      var endDate = moment().add(7, "days").toDate();
    }

    const format = {
      day: 'DD',
      hour: 'HH',
      minute: 'MM',
      second: 'SS'
    };

    let component = <Countdown format={format} targetDate={endDate} timeSeparator={' '} />

    const modalStyle = {
      visibility: "hidden"
    }

    return (
      <div>
        <nav class="navbar navbar-default navbar-static-bottom navbarnic navbar-fixed-bottom" role="navigation" style={style}>
          <div class="navbar-header">
            <Link class="navbar-brand" to="/">
              <i class="fa fa-chevron-left fa-fw"></i>
            </Link>
          </div>

          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-top-links navbar-left">
              <li>
                <a onClick={this.triggerModal} href="javascript:;">
                    <i class="fa fa-youtube-play fa-fw"></i>
                </a>
            </li>
            </ul>

            <div class="nav navbar-nav timer">
              {component}
            </div>

            <ul class="nav navbar-nav navbar-top-links navbar-right">
              <li>
                <OverlayTrigger  trigger={['hover']} placement="top" overlay={popoverHover}>
                  <a href="mailto:anthony@eng-base.com?subject=Trial%20Support">
                      <i class="fa fa-question-circle fa-fw"></i>
                      <span>Support</span>
                  </a>
                </OverlayTrigger>
              </li>
            </ul>
          </div>

        </nav>

        <div id={this.state.modal} class="modal fade in">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" onClick={this.triggerModal} aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  {/*<iframe width="720" height="405" src="https://www.youtube.com/embed/ztwJWUDe6Ls?autoplay=1&playlist=k6nVwdTWnMg,idgtG9elVGY,_KUDJfEF5QU" frameborder="0" />*/}
                  <YoutubePlayer
                    width="720"
                    height="405"
                    playbackState={this.state.modal=="activeModal" ? "playing" : "paused"}
                    configuration={
                        {
                          showinfo: 1,
                          controls: 1,
                          playlist: "ztwJWUDe6Ls,k6nVwdTWnMg,idgtG9elVGY,_KUDJfEF5QU"
                        }
                    }
                  />
                </div>
              </div>
            </div> 
          </div>
      </div>
    );
  }
}