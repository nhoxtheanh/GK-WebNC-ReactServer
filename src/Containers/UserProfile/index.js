import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const APIURL = process.env.REACT_APP_APIURL;

export default function UserProfilePage(userID) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  ///const [birthday, setBirtday] = useState(""); /// TODO : xử lý ngày
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchInfo();
  }, []);

  function fetchInfo() {
    axios
      .get(APIURL + "/users/" + userID)
      .then(function (response) {
        setFullname(response.data.userInfo.fullname);
        setEmail(response.data.userInfo.email);
        setGender(response.data.userInfo.gender);
        setAddress(response.data.userInfo.address);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function validateForm() {
    return (
      fullname.length > 0
    );
  }

  function handleSubmit(event) {
    // event.preventDefault();
    // axios
    //   .post(APIURL + "/users/" + userID, {
    //     fullname: fullname,
    //     username: username,
    //     password: password
    //   })
    //   .then(function (response) {
    //     alert(response.data.msg);
    //     if(response.data.status === 1)
    //       window.location.href = "/login";
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  return (
    <div className="signupPage">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Your Profile</h1>
        <FormGroup controlId="fullname" bsSize="large">
          <FormLabel>Fullname</FormLabel>
          <FormControl
            autoFocus
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="address" bsSize="large">
          <FormLabel>Address</FormLabel>
          <FormControl
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="gender" bsSize="large">
          <FormLabel>Gender</FormLabel>
          <select value={this.state.value} onChange={(e) => setGender(e.target.value)}>
            <option value="grapefruit">Male</option>
            <option value="lime">Female</option>
          </select>
        </FormGroup>
        <div className="btn-container">
          <Button
            className="btn btn-success btn-block btn-login"
            disabled={!validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faUserPlus} />
            Save
          </Button>
          <Button
            className="btn btn-light btn-block btn-login"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
