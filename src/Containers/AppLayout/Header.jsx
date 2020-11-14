import React, { memo } from 'react';
//import { StyledHeader } from './styles';
import Navbar from 'react-bootstrap/Navbar'
import {Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Header = () => {
  let fullname = localStorage.getItem("fullname");
  let userID = localStorage.getItem("userID");
  
  function logout(){
    localStorage.setItem("jwtToken", "invalid token :))");
    localStorage.setItem("fullname", "Hổng biết");
    localStorage.setItem("userID", 0);
  }

  function getProfile(){
    window.location.href = "/users/" + userID;
  }

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/dashboard">
          <span className="brand-red">
            Re
          </span>
          <span className="brand-min">
            min
          </span>
          <span className="brand-red">
            d
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="https://www.facebook.com/nhoxtheanh">Conatct</Nav.Link>
          </Nav>
          <Form inline className="searchForm input-group col-lg-4">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" disabled="true" />
            <Button variant="outline-success"  disabled="true">Search</Button>
          </Form>
          
          <NavDropdown title="Account" id="profile-dropdown">
              <NavDropdown.Item onClick={getProfile}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/login' onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <br/>
    </header>
  );
};

export default memo(Header);
