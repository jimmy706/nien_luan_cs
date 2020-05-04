import React from "react";
import LoginForm from "../components/login-form/LoginForm";
import Head from "next/head";
export default function IndexPage() {
  return (
    <div className="landing-page">
      <Head>
        <script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer/>
        <meta
          name="google-signin-client_id"
          content="811793049599-q4fa97rb0idqv4gom75g25hqbmhsn97k.apps.googleusercontent.com"
        />
        ><title>Login</title>
      </Head>

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
