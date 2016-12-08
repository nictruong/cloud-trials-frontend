import React from "react";

import Button from "react-bootstrap/lib/Button";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Form from "react-bootstrap/lib/Form";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import * as TrialActions from "../actions/TrialActions";
import TrialStore from "../stores/TrialStore";

export default class TrialUserAdder extends React.Component {
  constructor() {
    super();

    this.addUser = this.addUser.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  addUser() {
    console.log(this.state.email);
    TrialActions.addUserAndTrial(this.state.email);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  render() {

    return (
      <Form inline>
        <FormGroup controlId="formInlineName">          
        </FormGroup>
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Email</ControlLabel>
          {' '}
          <FormControl type="email" onChange={this.handleEmailChange} placeholder="jane.doe@example.com" />
        </FormGroup>
        {' '}
        <Button bsStyle="primary" onClick={this.addUser}>
          Add
        </Button>
      </Form>
    );
  }
}