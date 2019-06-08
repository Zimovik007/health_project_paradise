import React from "react";
import {Spinner, Form} from "react-bootstrap";

function GameStage4({ waitOrCity, categories }){
    console.log(categories);
    return(
        <div>
        {
            (waitOrCity == 1) 
            ?
                <div>
                    <h1>Соперник запрещает категории</h1>
                    <Spinner animation="grow" variant="info" width="150" height="150" style={{ fontSize: 45 }} />
                </div>
            :
                <div>
                    <h1>Запретите не более 3 категорий</h1>
                    <Form>
                        { 
                            categories.map((v, i) => <Form.Check type='checkbox' key={i} label={v} className="mb-3" inline />)
                        }
                    </Form>
                </div>
        }
        </div>
    );
}

export default GameStage4;