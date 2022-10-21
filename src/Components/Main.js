import React from "react";

export default function Main(props)
{

    function handleChoose(e)
    {
        Array.from(e.target.parentNode.children).forEach(child =>
        {
            child.classList.remove('active')
        })
        e.target.classList.add('active')
    }

    return (
        <section className="exam">
            <h1>{props.item.question}</h1>
            <div className="answer">
                <span onClick={handleChoose}>{props.a1}</span>
                <span onClick={handleChoose}>{props.a2}</span>
                <span onClick={handleChoose}>{props.a3}</span>
                <span onClick={handleChoose}>{props.a4}</span>
            </div>
            <hr />
        </section>
    )
}