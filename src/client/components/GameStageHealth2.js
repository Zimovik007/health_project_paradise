import React from "react";
import {Spinner, Form} from "react-bootstrap";

import Countdown from 'react-countdown-now';

class GameStageHealth2 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            waitOrCity: props.waitOrCity,
            diseases: props.diseases,
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
            this.props.selectDisease(e);
        }
        else{
            let obj = {
                target: {
                    value: randomInteger(0, this.state.diseases.length - 1),
                }
            };
            this.props.selectDisease(obj);
        }
    }

    render(){
        const renderer = ({ seconds, completed }) => <span style={{ marginTop: "30px", fontSize: "25px" }}>{(!this.state.formDisable) ? seconds : null}</span>;
        return(
            <div>
            {
                (this.state.waitOrCity == 1) 
                ?
                    <div>
                        <h2>Какое заболевание выберем??</h2>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Выберите заболевание:</Form.Label>
                                <Form.Control as="select" onChange={this.onCompleteTimer}>
                                    <option disabled selected value />
                                    {this.state.diseases.map((v, i) => <option key={i} value={i}>{v}</option>)}
                                </Form.Control>
                            </Form.Group>  
                        </Form>
                        <Countdown date={this.state.date + 20000} renderer={renderer} onComplete={this.onCompleteTimer} />
                    </div>
                :
                    <div>
                        <h2>Соперник выбирает заболевание</h2>
                        <Spinner animation="grow" variant="info" width="150" height="150" style={{ fontSize: 45 }} />
                    </div>
            }
            </div>
        );
    }
}

export default GameStageHealth2;