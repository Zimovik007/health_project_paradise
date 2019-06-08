import React from "react";
import {Container, Row, Col} from "react-bootstrap";


class Game extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <Container>
                <Row>
                    <Col
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <h2>Игра</h2>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;