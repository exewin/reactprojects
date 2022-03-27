import React from "react"
import styled from "styled-components"
import {nanoid} from "nanoid"

const Answer = (props) =>{

    //const random = () => Math.floor(Math.random() * 100)

    const Answer = styled.button`
    background: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    border-radius: 5px;
    border: ${props.selected ? '2px solid yellow' : '2px solid white'};
    min-width: 75px;
    cursor: pointer;
    &:hover{
        border: ${props.selected ? '2px solid #dd2' : '2px solid #99f'};
    }
    `

    return(
        <Answer
        key={nanoid()}
        onClick={()=>props.handleClick(props.questionId, props.text)}
        >{props.text}</Answer>
    )
}

export default Answer