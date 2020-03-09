import {
  TextField,
  PrimaryButton,
  Stack,
  DefaultButton
} from "office-ui-fabric-react";
import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import { CREATE_ACCOUNT_URL } from "../../constants/APIs";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        firstName: "",
        lastName: ""
      },
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.form);
    axios
      .post(CREATE_ACCOUNT_URL, this.state.form)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  handleOnChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const inlineTextFieldStyles = {
      root: {
        width: "50%"
      }
    };

    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField
            label="Email"
            type="email"
            iconProps={{ iconName: "Mail" }}
            name="email"
            required
            onChange={this.handleOnChange}
          />
          <TextField
            label="Username"
            type="text"
            iconProps={{ iconName: "Contact" }}
            name="username"
            required
            onChange={this.handleOnChange}
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
            <PrimaryButton text="Register" type="submit" />
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
