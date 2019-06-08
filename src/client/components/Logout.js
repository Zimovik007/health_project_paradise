import React from "react";
import {Container, Row, Col, Form, Button, Alert, } from "react-bootstrap";

import {Route, Redirect} from 'react-router';


class Logout extends React.Component{
    constructor(props){
        super(props);
    };

    componentWillMount(){
        fetch('/logout',
        {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
        });
    }

    render(){
        this.props.getLoginData({login: "", id: ""});
        return(
            <Redirect to="/" />
        );
    }
}

export default Logout;