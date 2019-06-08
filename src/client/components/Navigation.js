import React from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation({ login }){
    return(
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link to="./">Health-Project-Paradise</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {(login) 
                    ? 
                        <Nav className="mr-right">
                            <Link to="./">{login}</Link> 
                        </Nav>
                    :
                        <Nav className="mr-right">
                            <Nav.Item as="li">
                                <Nav.Link><Link to="./login">Вход</Link></Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link><Link to="./registration">Регистрация</Link></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default Navigation;