import React from "react";
import {Container, Navbar, Nav} from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from './NavigationStyles.css';

function Navigation({ login }){
    return(
        <Container fluid style={{ padding: 0, borderBottom: "1px solid #ededed" }}>
            <Navbar bg="default" variant="light" expand="lg">
                <Container>
                <Navbar.Brand><Link to="./">Health Project Paradise</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {(login) 
                    ? 
                        <Nav className="mr-right">
                            <Nav.Item as="li">
                                <Nav.Link><Link to="./" className={styles.links}>{login}</Link></Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link><Link to="./logout" className={styles.links}>Выйти</Link></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    :
                        <Nav className="mr-right">
                            <Nav.Item as="li">
                                <Nav.Link><Link to="./login" className={styles.links}>Вход</Link></Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link><Link to="./registration" className={styles.links}>Регистрация</Link></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    }
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
}

export default Navigation;