import React from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";

import {Route, Redirect} from 'react-router';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: "",
            id: "",
        };

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.sendLoginForm = this.sendLoginForm.bind(this);
    };

    onChangeLogin(e){
        this.setState({
            login: e.target.value,
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value,
        });
    }

    sendLoginForm(){
        const main = this;
        main.setState({
            isLoading: true,
        });

        fetch('/login',
        {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: JSON.stringify({
                "login": this.state.login,
                "password": this.state.password,
            }),
        })
        .then(function(response) {
            main.setState({
                isLoading: false,
            });
            response.json().then(function(data){
                if (data.status){
                    alert("Неверный логин или пароль!");
                    return;
                }
                let obj = {
                    login: data.login,
                    id: data.id,
                };
                main.setState({
                    id: data.id,
                });
            })
          }
        )
        .catch(function(err) {
            main.setState({
                isLoading: false,
            });
            console.log('Fetch Error :-S', err);
        });
    }

    render(){
        if (this.state.id){
            this.props.getLoginData({login: this.state.login, id: this.state.id});
            return (
                <Redirect push to={{ 
                    pathname: '/', 
                    state: {
                        id: this.state.id,
                        login: this.state.login,
                    } 
                }} />
            );
        }
        return(
            <Container style={{flex: 1, height: '100%' }}>
                <Row style={{ height: "10%" }}></Row>
                <Row>
                    <Col
                        lg={{ span: 8, offset: 2 }}
                        md={{ span: 8, offset: 2 }}
                        sm={12}
                        xs={12}
                    >
                        <Form>
                            <Form.Group controlId="formBasicLogin">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control type="text" placeholder="Введите ваш логин" value={this.state.login} onChange={this.onChangeLogin} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введите пароль" value={this.state.password} onChange={this.onChangePassword} />
                            </Form.Group>
                            <Button variant="info" onClick={this.sendLoginForm}>
                                Войти
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;