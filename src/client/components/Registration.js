import React from "react";
import {Container, Row, Col, Form, Button} from "react-bootstrap";


class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: "",
        };

        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.sendRegistrationForm = this.sendRegistrationForm.bind(this);
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
            console.log(response);
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