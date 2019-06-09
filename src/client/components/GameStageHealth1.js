import React from "react";
import { Toast } from "react-bootstrap";

function GameStageHealth1(){
    return(
        <Toast animation={true} style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Toast.Header>
                <img src="../load2.jpg" width="60" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Игра найдена!</strong>
                <small>Только что</small>
            </Toast.Header>
            <Toast.Body>Приготовьтесь!</Toast.Body>
        </Toast>
    );
}

export default GameStageHealth1;