import React from "react";
import {Container, Row, Col, Form, Button, Alert, } from "react-bootstrap";

import {Route, Redirect} from 'react-router';


class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: "",
            isReg: false,
        };

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.sendRegistrationForm = this.sendRegistrationForm.bind(this);
        this.hideSuccessRegistration = this.hideSuccessRegistration.bind(this);
    };

    hideSuccessRegistration(){
        this.setState({
            isReg: false,
        });
    }

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

    sendRegistrationForm(){
        const main = this;
        main.setState({
            isLoading: true,
        });

        fetch('/register',
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
            if (response.ok){
                // main.setState({
                //     login: "",
                //     password: "",
                //     isReg: true,
                // });
                response.json().then(function(data){
                    main.setState({
                        login: data.login,
                        id: data.id,
                        isReg: true,
                    });
                });
            }
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
        if (this.state.isReg){
            this.props.getLoginData({login: this.state.login, id: this.state.id});
            return(
                <Redirect push to={{ 
                    pathname: '/', 
                    state: {
                        id: this.state.id,
                        login: this.state.login,
                    } 
                }} />
            );
            return(
                <Container>
                    <Row style={{ marginTop: "30px" }}>
                        <Col
                            lg={{ span: 8, offset: 2 }}
                            md={{ span: 8, offset: 2 }}
                            sm={12}
                            xs={12}
                        >
                            <Alert show={this.state.show} variant="success">
                                <Alert.Heading>Успешная регистрация!</Alert.Heading>
                                <p>
                                    Вы были успешно зарегистрированы в игре и можете войти в свой аккаунт, перейдя во вкладку "Вход"
                                </p>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <Button onClick={this.hideSuccessRegistration} variant="outline-success">
                                        Понятно!
                                    </Button>
                                </div>
                            </Alert> 
                        </Col>
                    </Row>
                </Container>
            );
        }
        return(
                <Container>
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
                                <Form.Text className="text-muted">
                                    Ваш логин будет виден всем пользователям
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введите пароль" value={this.state.password} onChange={this.onChangePassword} />
                            </Form.Group>
                            <Button variant="success" onClick={this.sendRegistrationForm}>
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Registration;