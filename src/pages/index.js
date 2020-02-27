import React from "react";
import { PrimaryButton } from "office-ui-fabric-react";
import LoginForm from "../components/login-form/LoginForm";

export default function IndexPage() {
  return (
    <div className="landing-page">
      <LoginForm />
      <style jsx>
        {`
          .landing-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        `}
      </style>
    </div>
  );
}
