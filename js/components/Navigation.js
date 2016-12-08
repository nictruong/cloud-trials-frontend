import React from "react";

import MenuStore from "../stores/MenuStore";
import NavigationTop from "./navigation/NavigationTop";

export default class Navigation extends React.Component {
  constructor() {
    super();

    this.setBlockStyle = this.setBlockStyle.bind(this);
    this.setNoneStyle = this.setNoneStyle.bind(this);

    this.state = {
      style: {display: "block", "marginBottom": 0} 
    };
  }

  componentWillMount() {
    MenuStore.on("open", this.setBlockStyle);
    MenuStore.on("close", this.setNoneStyle);
  }

  componentWillUnmount() {
    MenuStore.removeListener("open", this.setBlockStyle);
    MenuStore.removeListener("close", this.setNoneStyle);
  }

  setBlockStyle() {
    this.setState({ style: {display: "block", marginBottom: 0}});
  }

  setNoneStyle() {
    this.setState({ style: {display: "none", marginBottom: 0}});
  }

  render() {

    return (
      <nav class="navbar navbar-default navbar-static-top navbarnic" role="navigation" style={this.state.style}>
        <NavigationTop title={this.props.title}/>
      </nav>
    );
  }
}