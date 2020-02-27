import React, { Component } from "react";
import { TextField, PrimaryButton, Stack } from "office-ui-fabric-react";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("Sumited");
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField
            label="Username or email"
            type="text"
            iconProps={{ iconName: "Mail" }}
            name="login"
          />
          <TextField
            label="Password"
            type="password"
            iconProps={{ iconName: "Lock" }}
            name="password"
          />
          <div>
            Don't have account? Create <a href="#">Here</a>
          </div>
        </Stack>
        <div className="form-action-wrapper">
          <PrimaryButton text="Login" type="submit" />
        </div>
        <style jsx>
          {`
            .login-form {
              margin: 0 auto;
              width: 70%;
              min-width: 300px;
              max-width: 700px;
              box-sizing: border-box;
              padding: 3rem 1.5rem;
              border: 1px solid #343434;
            }
          `}
        </style>
      </form>
    );
  }
}
