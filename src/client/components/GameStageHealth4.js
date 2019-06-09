import React from "react";
import {Spinner, Form, Modal} from "react-bootstrap";

function GameStageHealth4({ winner, request_my, request_enemy }){
    return(
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title>{(winner == 1) ? "Ты победил!" : (winner == -1) ? 'Ты проиграл!' : 'Ничья!'} - {request_my} - {request_enemy}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img src="../load2.jpg" width="150" />
            </Modal.Body>

            <Modal.Footer>
                <p>Чтобы начать новую игру - обнови страницу</p>
            </Modal.Footer>
        </Modal.Dialog>
    );
}

export default GameStageHealth4;