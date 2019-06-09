import React from "react";
import {Spinner, Form} from "react-bootstrap";

import Countdown from 'react-countdown-now';

class GameStage3 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            cities: props.cities,
            date: Date.now(),
            complete: false,
        };

        this.onCompleteTimer = this.onCompleteTimer.bind(this);
    }
    

    onCompleteTimer(e){
        if (this.state.complete)
            return;
        function randomInteger(min, max) {
            var rand = min + Math.random() * (max - min)
            rand = Math.round(rand);
            return rand;
        }
        this.setState({
            complete: true,
        });
        if (e.target){
            this.props.selectCity(e);
        }
        else{
            let obj = {
                target: {
                    value: randomInteger(0, this.state.cities.length - 1),
                }
            };
            this.props.selectCity(obj);
        }
    }

    render(){
        const renderer = ({ seconds, completed }) => <span style={{ marginTop: "30px", fontSize: "25px" }}>{(!this.state.formDisable) ? seconds : null}</span>;
        return(
            <div>
                <h2>В каком городе болезнь наиболее популярна?</h2>
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Выберите город:</Form.Label>
                        <Form.Control as="select" onChange={this.onCompleteTimer}>
                            <option disabled selected value />
                            {this.state.cities.map((v, i) => <option key={i} value={i}>{v}</option>)}
                        </Form.Control>
                    </Form.Group>  
                </Form>
                <Countdown date={this.state.date + 20000} renderer={renderer} onComplete={this.onCompleteTimer} />
            </div>
        );
    }
}

export default GameStage3;