import React from "react";
import {Container, Row, Col, Button, Spinner} from "react-bootstrap";


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFindGame: false,
        };
        this.findGame = this.findGame.bind(this);
    };

    findGame(){
        this.setState({
            isFindGame: true,
        });
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
                        <Button onClick={this.findGame} variant="info" style={{ display: this.state.isFindGame ? "none" : "inline", width: 250, height: 100, fontSize: 25 }}>Начать игру!</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;