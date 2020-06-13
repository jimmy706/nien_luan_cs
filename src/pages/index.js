import React from "react";
import LoginForm from "../components/login-form/LoginForm";
import Head from "next/head";
import SpinnerOverlay from "components/Progress/SpinnerOverlay";
import cookies from "next-cookies";
export default function IndexPage() {
  return (
    <div className="landing-page">
      <Head>
        <script
          src="https://apis.google.com/js/platform.js?onload=onLoadCallback"
          async
          defer
        />
        <meta
          name="google-signin-client_id"
          content="811793049599-q4fa97rb0idqv4gom75g25hqbmhsn97k.apps.googleusercontent.com"
        />
        <title>Login</title>
      </Head>

      <LoginForm />
      <SpinnerOverlay />
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

IndexPage.getInitialProps = (context) => {
  const { res } = context;
  const token = cookies(context).jwt;
  if (token) {
    res.writeHead(302, { Location: "/boards" });
    res.end();
  }
  return {};
};
