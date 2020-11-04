import React, { memo } from 'react';
//import { StyledHeader } from './styles';
import Navbar from 'react-bootstrap/Navbar'
import {Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'

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
        <Navbar.Brand href="/dashboard">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline className="searchForm input-group col-lg-4">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="greeting">Chào <Button variant="outline-primary" onClick={getProfile}><b>{fullname}</b></Button></div>
          <a href="/login"><Button variant="info" onClick={logout}>Logout</Button></a>
        </Navbar.Collapse>
      </Navbar>
      <br/>
    </header>
  );
};

export default memo(Header);
