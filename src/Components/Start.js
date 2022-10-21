import React from "react";

export default function Start(props)
{
    
    return (
        <main>
            <h1>Quizzical</h1>
            <h6>Some description if needed</h6>
            {!props.item && <button onClick={props.clicking}>Start quiz</button>}
        </main>
    )
}