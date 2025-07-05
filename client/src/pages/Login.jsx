import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [pageState, setPageState] = useState("login");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {};
  const onSignUp = () => {};

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="form-heading">
          {pageState == "signUp" ? "Create Account" : "login"}
        </h2>

        {pageState == "signUp" ? (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        ) : (
          ""
        )}
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        {pageState == "login" ? (
          <div
            className="forgot-password"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </div>
        ) : (
          ""
        )}

        {pageState == "login" ? (
          <button className="signup-button" onClick={onLogin}>
            login
          </button>
        ) : (
          <button className="signup-button" onClick={onSignUp}>
            Sign Up
          </button>
        )}

        {pageState == "signUp" ? (
          <div className="login-link">
            Already have an account?{" "}
            <span className="link-text" onClick={() => setPageState("login")}>
              Login here
            </span>
          </div>
        ) : (
          <div className="login-link">
            Dont have an account?{" "}
            <span className="link-text" onClick={() => setPageState("signUp")}>
              Sign up
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
