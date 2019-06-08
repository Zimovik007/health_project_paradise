import React from "react";
import {Spinner, Form} from "react-bootstrap";

import Countdown from 'react-countdown-now';

class GameStage4 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            categories: props.categories,
            waitOrCity: props.waitOrCity,
            cnt: 3,
            res: [],
            date: Date.now(),
            complete: false,
        };

        this.onCompleteTimer = this.onCompleteTimer.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
    }

    onCompleteTimer(){
        if (this.state.complete)
            return;
        this.setState({
            complete: true,            
        }, this.props.selectDeletedCategories(this.state.res));
    }

    onClickCheckbox(e, i){
        if (this.state.complete)
            return;
        let newCnt = this.state.cnt - 1;
        let newRes = this.state.res;
        if (!newRes.filter(v => v == i).length)
            newRes.push(i);
        else
            newRes.splice(newRes.indexOf(i), 1);
        if (newCnt > 0)
            this.setState({
                cnt: newCnt,
                res: newRes,
            });
        else{
            this.setState({
                complete: true,
            });
            this.props.selectDeletedCategories(newRes);
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
                        <h2>Соперник запрещает категории</h2>
                        <Spinner animation="grow" variant="info" width="150" height="150" style={{ fontSize: 45 }} />
                    </div>
                :
                    <div>
                        <h2>У вас есть {this.state.cnt} {(this.state.cnt == 1) ? "клик" : "клика"}, чтобы убрать как можно больше категорий</h2>
                        <Form>
                            { 
                                this.state.categories.map((v, i) => <Form.Check onClick={(e) => this.onClickCheckbox(e, i)}type='checkbox' key={i} label={v} className="mb-3" inline />)
                            }
                        </Form>
                        <Countdown date={this.state.date + 12000} renderer={renderer} onComplete={this.onCompleteTimer} />            
                    </div>
            }
            </div>
        );
    }
}

export default GameStage4;