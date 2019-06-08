import React from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="">Health-Project-Paradise</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-right">
                        <Link to="./login">Login</Link>
                        <Link to="./registration">Registration</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default Navigation;