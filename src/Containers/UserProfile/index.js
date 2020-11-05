import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faBackspace } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";
import Form from "react-bootstrap/Form";
import CommonLayout from "../AppLayout/CommonLayout";
import AlertBT from "react-bootstrap/Alert";
import { useToasts } from 'react-toast-notifications';
const APIURL = process.env.REACT_APP_APIURL;

export default function UserProfilePage({ userID }) {
  const { addToast } = useToasts();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  ///const [birthday, setBirthday] = useState(""); /// TODO : xử lý ngày
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
    return fullname.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(APIURL + "/users/" + userID, {
        fullname: fullname,
        email: email,
        gender: gender,
        address: address
      })
      .then(function (response) {
        addToast(response.data.msg, {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function goBackToDashBoard() {
    window.location.href = "/dashboard";
  }

  const checkPermission = () => {
    return userID == localStorage.getItem("userID");
  }

  return (
    <CommonLayout>
    <div className="profilePage">
      {checkPermission() ? (
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
          <Form.Control
            as="select"
            custom
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Control>
        </FormGroup>
        <div className="btn-container">
          <Button
            variant="primary"
            className="buttons"
            disabled={!validateForm()}
            type="submit"
          >
            <FontAwesomeIcon className="icon" icon={faSave} />
            Save
          </Button>
          <Button
            variant="outline-secondary"
            className="buttons"
            onClick={() => goBackToDashBoard()}
          >
            <FontAwesomeIcon className="icon" icon={faBackspace} />
            Back
          </Button>
        </div>
      </form>
      ) : <div><AlertBT variant="warning">You don't have permission</AlertBT></div> }
    </div>
    </CommonLayout>
  );
}
