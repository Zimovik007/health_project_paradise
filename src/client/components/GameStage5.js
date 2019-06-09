import React from "react";
import {Spinner, Form} from "react-bootstrap";

import Countdown from 'react-countdown-now';


class GameStage5 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            query: "",
            date: Date.now(),
            formDisable: false,
        };

        this.onCompleteTimer = this.onCompleteTimer.bind(this);
        this.onChangeQuery = this.onChangeQuery.bind(this);
    }

    onChangeQuery(e){
        this.setState({
            query: e.target.value,
        });
    }

    onCompleteTimer(){
        this.setState({
            formDisable: true,
        });
        let obj = {
            message: 'request selected',
            request: this.state.query,
        };
        this.props.onFinishGame(obj);
    }
    
    render(){
        const renderer = ({ seconds, completed }) => <span style={{ marginTop: "30px", fontSize: "25px" }}>{(!this.state.formDisable) ? seconds : null}</span>;

        return(
            <div>
                <h2>Введите запрос</h2>
                <Form>
                    <Form.Control disabled={ this.state.formDisable } size="lg" type="text" placeholder="Охота на медведя" value={this.state.query} onChange={this.onChangeQuery} />
                </Form>
                <Countdown date={this.state.date + 20000} renderer={renderer} onComplete={this.onCompleteTimer} />
            </div>
        );
    }
}

export default GameStage5;