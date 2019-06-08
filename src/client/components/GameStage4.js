import React from "react";
import {Spinner, Form} from "react-bootstrap";


class GameStage4 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            categories: props.categories,
            waitOrCity: props.waitOrCity,
            cnt: 3,
            res: [],
        };

        this.onClickCheckbox = this.onClickCheckbox.bind(this);
    }

    onClickCheckbox(e, i){
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
        else
            this.props.selectDeletedCategories(newRes);
    }
    
    render(){
        return(
            <div>
            {
                (this.state.waitOrCity == 1) 
                ?
                    <div>
                        <h1>Соперник запрещает категории</h1>
                        <Spinner animation="grow" variant="info" width="150" height="150" style={{ fontSize: 45 }} />
                    </div>
                :
                    <div>
                        <h1>У вас есть {this.state.cnt} {(this.state.cnt == 1) ? "клик" : "клика"}, чтобы убрать как можно больше категорий</h1>
                        <Form>
                            { 
                                this.state.categories.map((v, i) => <Form.Check onClick={(e) => this.onClickCheckbox(e, i)}type='checkbox' key={i} label={v} className="mb-3" inline />)
                            }
                        </Form>
                    </div>
            }
            </div>
        );
    }
}

export default GameStage4;