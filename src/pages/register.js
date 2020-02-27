import React from "react";
import RegisterForm from "../components/register-form/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="register-page">
      <RegisterForm />
      <style jsx>
        {`
          .register-page {
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
