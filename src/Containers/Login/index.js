import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import FacebookLogin from "react-facebook-login";
const APIURL = process.env.REACT_APP_APIURL;
const APPID_FB = process.env.REACT_APP_APPID_FB;

export default function LoginPage() {
  const { addToast } = useToasts();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post(APIURL + "/users/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setLoading(false);
        if (response.data.status === 1) {
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("fullname", response.data.fullname);
          localStorage.setItem("userID", response.data.userID);
          window.location.href = "/dashboard";
        } else
          addToast(response.data.msg, {
            appearance: "error",
            autoDismiss: true,
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const responseFacebook = (response) => {
    const username = response.id; // lấy id của fb làm username
    const fullname = response.name;
    const email = response.email;
    axios
      .post(APIURL + "/users/auth/facebook", {
        username: username,
        fullname: fullname,
        email: email,
      })
      .then(function (response) {
        setLoading(false);
        if (response.data.status === 1) {
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("fullname", response.data.fullname);
          localStorage.setItem("userID", response.data.userID);
          window.location.href = "/dashboard";
        } else
          addToast(response.data.msg, {
            appearance: "error",
            autoDismiss: true,
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Login to <span className="brand-red">Re</span>
          <span className="brand-min">min</span>
          <span className="brand-red">d</span>
        </h1>
        <div class="social-login">
          <FacebookLogin
            appId={APPID_FB}
            fields="id,name,email"
            callback={responseFacebook}
            icon={<FontAwesomeIcon className="icon" icon={faFacebookSquare} />}
            cssClass="btnFacebook"
            textButton = "with Facebook"
          />
          <Button className="btn google-btn social-btn" type="button">
            <span>
              <FontAwesomeIcon className="icon" icon={faGoogle} /> with Google
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
            disabled={isLoading || !validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faSignInAlt} />
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <hr></hr>
        <div className="btn-container">
          <Link to="/signup">
            <Button className="btn btn-primary btn-block btn-signup">
              <FontAwesomeIcon className="icon" icon={faUserPlus} /> Sign up New
              Account
            </Button>
          </Link>
        </div>
      </form>
      <a
        href="https://github.com/nhoxtheanh/GK-WebNC-ReactServer"
        className="github-link"
      >
        Visit my Github
      </a>
    </div>
  );
}
