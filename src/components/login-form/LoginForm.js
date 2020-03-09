import React, { Component } from "react";
import { TextField, PrimaryButton, Stack } from "office-ui-fabric-react";
import Link from "next/link";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("Sumited");
  };

  componentDidMount() {
    const ggLoginOpts = {
      scope: "https://www.googleapis.com/auth/plus.login",
      width: "auto",
      height: 35,
      longtitle: true,
      theme: "dark",
      onsuccess: this.onSignIn,
      onfailure: this.onLoginFail
    };

    gapi.signin2.render("g-signin2", ggLoginOpts);
  }

  onLoginFail = err => {
    console.log(err);
  };

  handleOnChange = e => {
    console.log(e.target.value);
  };

  onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
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
            onChange={this.handleOnChange}
          />
          <TextField
            label="Password"
            type="password"
            iconProps={{ iconName: "Lock" }}
            name="password"
            onChange={this.handleOnChange}
          />
          <div>
            Don't have account? Create{" "}
            <Link href="/register">
              <a>Here</a>
            </Link>
          </div>
        </Stack>
        <div className="form-action-wrapper">
          <PrimaryButton text="Login" type="submit" />
          <p className="text-center">Or</p>
          <div>
            <div id="g-signin2"></div>
          </div>
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

            .form-action-wrapper {
              flex-direction: column;
            }
          `}
        </style>
      </form>
    );
  }
}
