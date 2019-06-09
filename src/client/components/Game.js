import React from "react";
import {Container, Row, Col, Button, Spinner, OverlayTrigger, Tooltip} from "react-bootstrap";

import Websocket from 'react-websocket';

import GameStage1 from './GameStage1';
import GameStage2 from './GameStage2';
import GameStage3 from './GameStage3';
import GameStage4 from './GameStage4';
import GameStage5 from './GameStage5';
import GameStage6 from './GameStage6';

import GameStageHealth1 from './GameStageHealth1';
import GameStageHealth2 from './GameStageHealth2';
import GameStageHealth3 from './GameStageHealth3';
import GameStageHealth4 from './GameStageHealth4';

import StageInfo from './StageInfo';


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFindGame: false,
            stage: 0,
            stageHealth: 0,
            waitOrCity: -1,
            cities: [],
            categories: [],
            diseases: [],
            disease: "",
            deletedCategories: [],
            winner: -1,
            city: "",
            isOpenSocket: false,
            healthGame: false,
        };
        this.findGame = this.findGame.bind(this);
        this.onMessageWebSockets = this.onMessageWebSockets.bind(this);
        this.selectCity = this.selectCity.bind(this);
        this.selectCityHealth = this.selectCityHealth.bind(this);
        this.selectDisease = this.selectDisease.bind(this);
        this.onOpenWebSocket = this.onOpenWebSocket.bind(this);
        this.selectDeletedCategories = this.selectDeletedCategories.bind(this);
        this.onFinishGame = this.onFinishGame.bind(this);
        this.findGameHealth = this.findGameHealth.bind(this);
    };

    onOpenWebSocket(){
        this.setState({
            isOpenSocket: true,
        });
    }

    onFinishGame(obj){
        this.refWebSocket.sendMessage(JSON.stringify(obj));
    }

    selectCity(city){
        let obj = {
            message: "city selected",
            city_id: city.target.value,
        };
        this.refWebSocket.sendMessage(JSON.stringify(obj)); 
    }

    selectCityHealth(city){
        let obj = {
            message: "health city selected",
            city_id: city.target.value,
        };
        this.refWebSocket.sendMessage(JSON.stringify(obj)); 
    }

    selectDisease(disease){
        let obj = {
            message: "health disease selected",
            disease_id: disease.target.value,
        };
        this.refWebSocket.sendMessage(JSON.stringify(obj)); 
    }

    selectDeletedCategories(cats){
        let obj = {
            message: "categories selected",
            categories: cats,
        };
        this.refWebSocket.sendMessage(JSON.stringify(obj)); 
    }

    onMessageWebSockets(data){
        const main = this;

        if (!this.state.healthGame){

            if (data == 'game found'){
                main.setState({
                    stage: 1,
                    isFindGame: false,
                });
            }
            data = JSON.parse(data);
            if (data.choice && main.state.stage == 1){
                main.setState({
                    stage: 3, 
                    waitOrCity: 1,
                    cities: data.data,
                });
            }
            else if (main.state.stage == 1){
                main.setState({
                    waitOrCity: 0,
                    stage: 3,
                    cities: data.data,
                });
            }
            else if (main.state.stage == 3){
                main.setState({
                    city: data.data.city,
                    categories: data.data.category_list,
                    stage: 4,
                });
            }
            else if (main.state.stage == 4){
                main.setState({
                    deletedCategories: data.data,
                    stage: 5,
                });
            }
            else if (main.state.stage == 5){
                main.setState({
                    winner: data.data.winner,
                    r_my: data.data.request_my,
                    r_en: data.data.request_enemy,
                    stage: 6,
                });
            }
        }
        else {
            if (data == 'game found'){
                main.setState({
                    stageHealth: 1,
                    isFindGame: false,
                });
            }
            data = JSON.parse(data);
            if (data.choice && main.state.stageHealth == 1){
                main.setState({
                    stageHealth: 2, 
                    waitOrCity: 1,
                    diseases: data.data,
                });
            }
            else if (main.state.stageHealth == 1){
                main.setState({
                    waitOrCity: 0,
                    stageHealth: 2,
                    diseases: data.data,
                });
            }
            else if (main.state.stageHealth == 2){
                main.setState({
                    disease: data.data.disease,
                    cities: data.data.cities_list,
                    stageHealth: 3,
                });
            }
            else if (main.state.stageHealth == 3){
                console.log(data);
                main.setState({
                    winner: data.data.winner,
                    r_my: data.data.request_my,
                    r_en: data.data.request_enemy,
                    stageHealth: 4,
                });
            }
        }
    }

    findGame(){
        if (!this.props.loginData.login)
            return;
        const main = this;
        main.setState({
            isFindGame: true,
        });
        let obj = {
            id: main.props.loginData.id,
            message: 'game start',
        };
        main.refWebSocket.sendMessage(JSON.stringify(obj));        
    }

    findGameHealth(){
        if (!this.props.loginData.login)
            return;
        const main = this;
        main.setState({
            isFindGame: true,
            healthGame: true,
        });
        let obj = {
            id: main.props.loginData.id,
            message: 'health game start',
        };
        main.refWebSocket.sendMessage(JSON.stringify(obj));
    }

    render(){
        return(
            <Container style={{flex: 1, height: '100%' }}>
                <Websocket 
                    url='ws://localhost:8000'
                    onMessage={this.onMessageWebSockets}
                    onOpen={this.onOpenWebSocket}
                    ref={ Websocket => { this.refWebSocket = Websocket }}
                />
                <Row style={{ height: "10%" }}></Row>
                <Row style={{ height: "20%" }}>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'center' }}
                    >
                        {(this.state.stage >= 4) ? <StageInfo city={this.state.city} deletedCategories={this.state.deletedCategories} /> : null}
                        {(this.state.stage >= 3) ? <StageInfoHealth disease={this.state.disease} /> : null}


                    </Col>
                </Row>
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
                            <div>
                                <Button disabled={!this.props.loginData.login} onClick={this.findGame} variant="info" style={{ display: (this.state.isFindGame || this.state.stage != 0 || this.state.stageHealth != 0) ? "none" : "inline", width: 250, height: 100, fontSize: 20, marginRight: 10, }}>Начать игру!</Button> 
                                <Button disabled={!this.props.loginData.login} onClick={this.findGameHealth} variant="success" style={{ display: (this.state.isFindGame || this.state.stageHealth != 0 || this.state.stage != 0) ? "none" : "inline", width: 250, height: 100, fontSize: 20 }}>Начать здравоохранительную игру!</Button> 
                            </div>
                        </OverlayTrigger>
                        :
                        <div>
                            <Button disabled={!this.props.loginData.login && !this.state.isOpenSocket} onClick={this.findGame} variant="info" style={{ display: (this.state.isFindGame || this.state.stage != 0 || this.state.stageHealth != 0) ? "none" : "inline", width: 250, height: 100, fontSize: 20, marginRight: 10, }}>Начать игру!</Button>
                            <Button disabled={!this.props.loginData.login && !this.state.isOpenSocket} onClick={this.findGameHealth} variant="success" style={{ display: (this.state.isFindGame || this.state.stageHealth != 0 || this.state.stage != 0) ? "none" : "inline", width: 250, height: 100, fontSize: 20 }}>Начать здравоохранительную игру!</Button> 
                        </div>
                        }

                        {(this.state.stage == 1) ? <GameStage1 /> : null}
                        {(this.state.stage == 2) ? <GameStage2 /> : null}
                        {(this.state.stage == 3) ? <GameStage3 waitOrCity={this.state.waitOrCity} cities={this.state.cities} selectCity={this.selectCity} /> : null}
                        {(this.state.stage == 4) ? <GameStage4 waitOrCity={this.state.waitOrCity} categories={this.state.categories} selectDeletedCategories={this.selectDeletedCategories}/> : null}
                        {(this.state.stage == 5) ? <GameStage5 onFinishGame={this.onFinishGame}/> : null}
                        {(this.state.stage == 6) ? <GameStage6 winner={this.state.winner} request_my={this.state.r_my} request_enemy={this.state.r_en} /> : null}

                        {(this.state.stageHealth == 1) ? <GameStageHealth1 /> : null}
                        {(this.state.stageHealth == 2) ? <GameStageHealth2 waitOrCity={this.state.waitOrCity} diseases={this.state.diseases} selectDisease={this.selectDisease} /> : null}
                        {(this.state.stageHealth == 3) ? <GameStageHealth3 waitOrCity={this.state.waitOrCity} cities={this.state.cities} selectCity={this.selectCityHealth}/> : null}
                        {(this.state.stageHealth == 4) ? <GameStageHealth4 winner={this.state.winner} request_my={this.state.r_my} request_enemy={this.state.r_en} /> : null}

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;