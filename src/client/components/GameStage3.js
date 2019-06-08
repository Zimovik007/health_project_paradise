import React from "react";
import {Spinner, Form} from "react-bootstrap";

function GameStage3({ waitOrCity, cities, selectCity }){
    return(
        <div>
        {
            (waitOrCity == 1) 
            ?
                <div>
                    <h2>Какой город разыграем?</h2>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Выберите город:</Form.Label>
                            <Form.Control as="select" onChange={selectCity}>
                                <option disabled selected value />
                                {cities.map((v, i) => <option key={i} value={i}>{v}</option>)}
                            </Form.Control>
                        </Form.Group>  
                    </Form>
                </div>
            :
                <div>
                    <h2>Соперник выбирает город</h2>
                    <Spinner animation="grow" variant="info" width="150" height="150" style={{ fontSize: 45 }} />
                </div>
        }
        </div>
    );
}

export default GameStage3;