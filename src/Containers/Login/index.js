import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    //event.preventDefault();
    alert(username + password); ////////TODO : ở đây sẽ tự hiện gọi api đến login
  }

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Login</h1>
        <div class="social-login">
          <Button className="btn facebook-btn social-btn" type="button">
            <span>
              <FontAwesomeIcon className="icon" icon={faFacebookSquare} /> Sign
              in with Facebook
            </span>
          </Button>
          <Button className="btn google-btn social-btn" type="button">
            <span>
              <FontAwesomeIcon className="icon" icon={faGoogle} /> Sign in with
              Google
            </span>
          </Button>
        </div>
        <p className="text-center" style={{ marginTop: "1rem" }}>
          OR
        </p>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <div className="btn-container">
          <Button
            className="btn btn-success btn-block btn-login"
            disabled={!validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faSignInAlt} />
            Login
          </Button>
        </div>
        <hr></hr>
        <div className="btn-container">
          <Button className="btn btn-primary btn-block btn-signup">
            <FontAwesomeIcon className="icon" icon={faUserPlus} /> Sign up New
            Account
          </Button>
        </div>
      </form>
    </div>
  );
}
