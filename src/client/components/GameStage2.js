import React from "react";
import { Toast } from "react-bootstrap";

function GameStage2(){
    return(
        <Toast animation={true} style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Toast.Header>
                <img src="../load2.jpg" width="60" className="rounded mr-2" alt="" />
                <strong className="mr-auto">Ваш ход первый!</strong>
                <small></small>
            </Toast.Header>
            <Toast.Body>Ожидайте список городов!</Toast.Body>
        </Toast>
    );
}

export default GameStage2;