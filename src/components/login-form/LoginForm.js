import React, { Component } from "react";
import { TextField, PrimaryButton, Stack, MessageBar,MessageBarType } from "office-ui-fabric-react";
import Link from "next/link";
import {connect} from 'react-redux';
import {loginAction, loginOAuthAction} from "../../redux/actions/user.action";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        login: "",
        password: ""
      },
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.loginAction(this.state.form);
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

    if(!process.isServer && gapi) {
      gapi.signin2.render("g-signin2", ggLoginOpts);
    }
  }

  onLoginFail = err => {
    console.log(err);
  };

  handleOnChange = e => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    const ggProfile = {
      name: profile.getName(),
      email: profile.getEmail(),
      avatar: profile.getImageUrl()
    };
    this.props.loginOAuthAction(ggProfile);
  };

  resetError = () => {
    this.setState({
      errors: {}
    })
  };

  renderErrors = () => {
    let errorMessages = [];
    for(const e in this.props.errors) {
      errorMessages.push(this.props.errors[e]);
    }
    return errorMessages;
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        {Object.keys(this.props.errors).length ? (
            <MessageBar  messageBarType={MessageBarType.error} isMultiline={false}  dismissButtonAriaLabel="Close" onDismiss={this.resetError}>
              {this.renderErrors()}
            </MessageBar>
        ): null}
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField
            label="Username or email"
            type="text"
            iconProps={{ iconName: "Mail" }}
            name="login"
            onChange={this.handleOnChange}
            required
          />
          <TextField
            label="Password"
            type="password"
            iconProps={{ iconName: "Lock" }}
            name="password"
            onChange={this.handleOnChange}
            required
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

const mapStateToProps = (state) => {
  return {
    errors: state.errors
  }
};

export default connect(mapStateToProps,{
  loginAction,
  loginOAuthAction
})(LoginForm);