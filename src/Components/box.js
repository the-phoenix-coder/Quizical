import React from "react";

export default function Box(props)
{
    const [isShown, setIsShown] = React.useState(true)
    function toggle()
    {
        setIsShown(prev => prev = !prev)
        
    }
    return (
        <div>
            {props.head && <h3>{props.head}</h3>}
            {isShown && <p>{props.p}</p>}
            <button onClick={toggle}>{isShown ? 'Hide' : 'Show'} punchline</button>
            <hr />
        </div>
    )
}