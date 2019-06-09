import React from "react";
import {Spinner, Form, Modal} from "react-bootstrap";

function GameStage6({ winner, request_my, request_enemy, first, second, isAbs }){
    return(
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title style={{ marginLeft: "auto", marginRight: "auto" }}>{(winner == 1) ? "Ты победил!" : (winner == -1) ? 'Ты проиграл!' : 'Ничья!'} <br /> {request_my}:{first}{(!isAbs) ? '%' : null} - {request_enemy}:{second}{(!isAbs) ? '%' : null}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img src="../load.jpg" width="150" />
            </Modal.Body>

            <Modal.Footer>
                <p>Чтобы начать новую игру - обнови страницу</p>
            </Modal.Footer>
        </Modal.Dialog>
    );
}

export default GameStage6;