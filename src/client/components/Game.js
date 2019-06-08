import React from "react";
import {Container, Row, Col, Button, Spinner, OverlayTrigger, Tooltip} from "react-bootstrap";

import GameStage1 from './GameStage1';
import GameStage2 from './GameStage2';
import GameStage3 from './GameStage3';


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFindGame: false,
            stage: 0,
            waitOrCity: -1,
            cities: [],
            categories: [],
            winner: -1,
            socket: null,
        };
        this.findGame = this.findGame.bind(this);
    };

    findGame(){
        if (!this.props.loginData.login)
            return;
        const main = this;
        main.setState({
            isFindGame: true,
        });
        main.state.socket = new WebSocket("ws://localhost:8080");
        main.state.socket.onopen = function(){
            let obj = {
                id: main.props.loginData.id,
                message: 'game start',
            };
            main.state.socket.send(JSON.stringify(obj));
        }
        main.state.socket.onmessage = function(event) {
            if (event.data == 'game found'){
                main.setState({
                    stage: 1,
                    isFindGame: false,
                });
            }
            else if (event.data == 1 && main.state.stage == 1){
                main.setState({
                    stage: 2, 
                    waitOrCity: event.data,
                });
            }
            else if (event.data == 0 && main.state.stage == 1){
                main.stage({
                    waitOrCity: event.data,
                    stage: 3,
                });
            }
            else if (main.state.stage == 2){
                main.setState({
                    cities: event.data,
                    stage: 3,
                });
            }
            else if (main.state.stage == 3){
                main.setState({
                    city: event.data,
                    stage: 4,
                });
            }
            else if (main.state.stage == 4 && !main.state.waitOrCity){
                main.setState({
                    categories: event.data,
                    stage: 5,
                });
            }
            else if (main.state.stage == 4 && main.state.waitOrCity){
                main.setState({
                    deletedCategories: event.data,
                    stage: 6,
                });
            }
            else if (main.state.stage == 5){
                main.setState({
                    deletedCategories: event.data,
                    stage: 6,
                });
            }
            else if (main.state.stage == 6){
                main.setState({
                    winner: event.data,
                });
            }
        };
    }

    render(){
        return(
            <Container style={{flex: 1, height: '100%' }}>
                <Row style={{ height: "30%" }}></Row>
                <Row>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'center' }}
                    >
                        {(this.state.isFindGame) ? <Spinner animation="border" variant="info" style={{ width: 150, height: 150, fontSize: 45 }}/> : null}
                        
                        { (!this.props.loginData.login) 
                        ?
                        <OverlayTrigger
                            key='top'
                            show={true}
                            placement='top'
                            overlay={
                                <Tooltip>
                                    Для игры необходима авторизация
                                </Tooltip>
                            }
                        >
                            <Button disabled={!this.props.loginData.login} onClick={this.findGame} variant="info" style={{ display: (this.state.isFindGame || this.state.stage != 0) ? "none" : "inline", width: 250, height: 100, fontSize: 25 }}>Начать игру!</Button> 
                        </OverlayTrigger>
                        :
                        <Button disabled={!this.props.loginData.login} onClick={this.findGame} variant="info" style={{ display: (this.state.isFindGame || this.state.stage != 0) ? "none" : "inline", width: 250, height: 100, fontSize: 25 }}>Начать игру!</Button>
                        }

                        {(this.state.stage == 1) ? <GameStage1 /> : null}
                        {(this.state.stage == 2) ? <GameStage2 /> : null}
                        {(this.state.stage == 3) ? <GameStage3 waitOrCity={this.state.waitOrCity} /> : null}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;