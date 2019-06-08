import React from "react";

function GameStage3({ waitOrCity }){
    console.log(waitOrCity);
    return(
        <div>
        {
            (waitOrCity == 1) 
            ?
                <h1>Выбираете город</h1>
            : 
                <h1>Соперник выбирает город</h1>
        }
        </div>
    );
}

export default GameStage3;