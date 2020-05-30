import {
  TextField,
  PrimaryButton,
  Stack,
  DefaultButton,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import { CREATE_ACCOUNT_URL } from "../../constants/APIs";
import {
  passwordValidate,
  emailValidation,
  usernameValidate,
} from "../../validations/user-input.validation";
import { WRONG_REPEAT_PASSWORD } from "../../constants/error-message";
import Router from "next/router";
import { connect } from "react-redux";
import {
  onDoneAction,
  onLoadAction,
} from "../../store/actions/progress.action";
import { removeError, setErrorAct } from "../../store/actions/error.action";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        firstName: "",
        lastName: "",
      },
      errors: {},
    };
  }

  componentWillUnmount() {
    this.props.removeError();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onLoadAct("Creating account...");

    axios
      .post(CREATE_ACCOUNT_URL, this.state.form)
      .then((res) => {
        this.props.onDoneAct();
        Router.push("/");
      })
      .catch((err) => {
        this.props.onDoneAct();
        if (err.response) {
          const errors = err.response.data;
          this.props.setErrorAct(errors);
        } else {
          console.log(err);
        }
      });
  };

  handleOnChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  checkErrorMessage = (field, value) => {
    switch (field) {
      case "email":
        return emailValidation(value);
      case "password":
        return passwordValidate(value);
      case "username":
        return usernameValidate(value);
    }
  };

  renderErrors = () => {
    let errorMessages = [];
    for (const e in this.props.errors) {
      errorMessages.push(this.props.errors[e]);
    }
    return errorMessages;
  };

  render() {
    const inlineTextFieldStyles = {
      root: {
        width: "50%",
      },
    };

    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        {Object.keys(this.props.errors).length ? (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            dismissButtonAriaLabel="Close"
            onDismiss={this.props.removeError}
          >
            {this.renderErrors()}
          </MessageBar>
        ) : null}
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField
            label="Email"
            type="email"
            iconProps={{ iconName: "Mail" }}
            name="email"
            required
            onChange={this.handleOnChange}
            onGetErrorMessage={(value) =>
              this.checkErrorMessage("email", value)
            }
            validateOnLoad={false}
          />
          <TextField
            label="Username"
            type="text"
            iconProps={{ iconName: "Contact" }}
            name="username"
            required
            onChange={this.handleOnChange}
            validateOnLoad={false}
            onGetErrorMessage={(value) =>
              this.checkErrorMessage("username", value)
            }
          />
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack.Item styles={inlineTextFieldStyles}>
              <TextField
                label="Password"
                type="password"
                iconProps={{ iconName: "Lock" }}
                name="password"
                required
                onChange={this.handleOnChange}
                onGetErrorMessage={(value) =>
                  this.checkErrorMessage("password", value)
                }
                validateOnLoad={false}
              />
            </Stack.Item>
            <Stack.Item styles={inlineTextFieldStyles}>
              <TextField
                label="Repeat password"
                type="password"
                iconProps={{ iconName: "Lock" }}
                name="repeatPassword"
                required
                onChange={this.handleOnChange}
                onGetErrorMessage={(value) =>
                  value === this.state.form.password
                    ? ""
                    : WRONG_REPEAT_PASSWORD
                }
                validateOnLoad={false}
              />
            </Stack.Item>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack.Item styles={inlineTextFieldStyles}>
              <TextField
                label="First name"
                type="text"
                iconProps={{ iconName: "People" }}
                name="firstName"
                onChange={this.handleOnChange}
              />
            </Stack.Item>
            <Stack.Item styles={inlineTextFieldStyles}>
              <TextField
                label="Last name"
                type="text"
                iconProps={{ iconName: "People" }}
                name="lastName"
                onChange={this.handleOnChange}
              />
            </Stack.Item>
          </Stack>
        </Stack>
        <div className="form-action-wrapper">
          <Stack horizontal tokens={{ childrenGap: 15 }}>
            <Link href="/">
              <a>
                <DefaultButton
                  iconProps={{ iconName: "ChevronLeft" }}
                  text="Login"
                />
              </a>
            </Link>
            <PrimaryButton text="Create account" type="submit" />
          </Stack>
        </div>
        <style jsx>
          {`
            .register-form {
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

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDoneAct: () => dispatch(onDoneAction()),
    onLoadAct: (label) => dispatch(onLoadAction(label)),
    removeError: () => dispatch(removeError()),
    setErrorAct: (errors) => dispatch(setErrorAct(errors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
