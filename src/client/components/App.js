import React from "react";
// import {Container, Row, Col, Image, Button, Navbar, Nav, Form, FormControl, NavDropdown} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navigation from "./Navigation";
import Game from "./Game";
import Login from "./Login";
import Registration from "./Registration";

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <Navigation />
                <Route path="" exact component={Game} />
                <Route path="./login" component={Login} />
                <Route path="./registration" component={Registration} />
            </Router>
        );
    }
}

export default App;