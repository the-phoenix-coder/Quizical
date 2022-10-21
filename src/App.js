import React from "react"
import Start from './Components/Start'
import Main from './Components/Main'
import Swal from 'sweetalert2'


export default function App()
{
    const [allData, setAllData] = React.useState([])
    const [item, setItem] = React.useState()
    const [againS, setAgainS] = React.useState(false)




    window.addEventListener('load', () => loading())

    function loading()
    {
        let timerInterval
        Swal.fire({
            title: 'Loading the Questions',
            timer: 2000,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        })
    }
    fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then(data => setAllData(data.results))
    
    function handleClick()
    {      
        generateQuestion()
    }

    function generateQuestion()
    {
        setItem(allData.map(item =>
            {
                const arr = [item.correct_answer, item.incorrect_answers[0], item.incorrect_answers[1], item.incorrect_answers[2]]
                const shuffledArr = arr.sort((a, b) => .5 - Math.random())
                return (
                        <Main
                            item={item}
                            a1={shuffledArr[0]}
                            a2={shuffledArr[1]}
                            a3={shuffledArr[2]}
                            a4={shuffledArr[3]}
                        />
                    )
        }))
    }

    function handleSubmitting()
    {
        const spans = Array.from(document.querySelectorAll('span'))
        const filtered = spans.filter(span => span.classList.contains('active'))
        filtered.forEach(answer =>
        {
            item.forEach(cor =>
            {
                cor.props.item.correct_answer === answer.innerText ? answer.classList.add('correct') : answer.classList.add('error')
            })
        })
        const pass = spans.filter(span => span.classList.contains('correct'))
        const trues = pass.length
        if (trues >= 3)
        {
            Swal.fire(
                'Success',
                'You have passed the exam',
                'success'
            ).then(stopAnswering())
        } else
        {
            Swal.fire(
                'Oops...',
                'You have failed in the exam!',
                'error',
            ).then(() =>
            {
                setAgainS(prev => true)
                document.querySelector('button.sub').style.display = 'none'
                stopAnswering()
            })
        }
        const failed = spans.filter(span => !span.classList.contains("correct")&&span.classList.contains('error'))
        failed.forEach(fail =>
        {
            item.forEach(cor =>
            {
                const childrens = Array.from(fail.parentNode.children)
                childrens.forEach(item => item.innerText === cor.props.item.correct_answer && item.classList.add('correct'))
            })
        })
    }

    function tryAgain()
    {
        window.location.reload()
    }

    function stopAnswering()
    {
        const spans = Array.from(document.querySelectorAll('span'))
        spans.forEach(span => span.classList.add('disabled'))
    }

    return (
        <>
            <Start clicking={handleClick} item={item} />
            {item}
            {item && <button className="sub" onClick={handleSubmitting}>Submit</button>}
            {againS && <button onClick={tryAgain}>Try Again</button>}
        </>
    )
}