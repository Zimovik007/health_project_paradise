import React from "react";
// import {Container, Row, Col, Image, Button, Navbar, Nav, Form, FormControl, NavDropdown} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Navigation from "./Navigation";
import Game from "./Game";
import Login from "./Login";
import Registration from "./Registration";
import Logout from "./Logout";

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loginLogin: "",
            loginId: "",
        };

        this.getLoginData = this.getLoginData.bind(this);
    }

    componentWillMount(){
        const main = this;
        fetch('/get_user',
        {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        })
        .then(function(response) {
            response.json().then(function(data){
                if (data.login && data.id){
                    main.setState({
                        loginLogin: data.login,
                        loginId: data.id,
                    });
                }
            });
        })
        .catch(function(err) {
            main.setState({
                isLoading: false,
            });
        });
    }

    getLoginData(obj){
        this.setState({
            loginLogin: obj.login,
            loginId: obj.id,
        });
    }

    render(){
        return(
            <Router>
                <Navigation login={this.state.loginLogin} />
                <Route path="/" exact component={Game} />
                <Route path="/login" render={() => <Login getLoginData={this.getLoginData} />} />
                <Route path="/registration" render={() => <Registration getLoginData={this.getLoginData} />} />
                <Route path="/logout" render={() => <Logout getLoginData={this.getLoginData} />} />
            </Router>
        );
    }
}

export default App;