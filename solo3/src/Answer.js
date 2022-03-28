import React from "react"
import styled from "styled-components"
import {nanoid} from "nanoid"
import {decodeHtml} from "./GlobalFunctions"

const Answer = (props) =>{

    const borderStyling = () =>{
        let styling = '2px solid white'
        if(props.trueAnswer === "hidden")
            if(props.selected)
                styling = '2px solid yellow'
            else
                styling = '2px solid white'
        else if(props.trueAnswer === "true")
            if(props.selected)
                styling = '2px solid #3d3'
            else
                styling = '2px dashed green'
        else if(props.trueAnswer === "false")
            if(props.selected)
                styling = '2px solid red'
            else
                styling = '2px solid white'

        return styling
    }

    const Answer = styled.button`
    background: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    border-radius: 5px;
    border: ${borderStyling()};
    min-width: 75px;
    order: ${props.position};
    cursor: ${props.trueAnswer === "hidden" ? 'pointer' : 'default'};
    &:hover{
        border: ${props.trueAnswer === "hidden" ?
        props.selected ? '2px solid #dd2' : '2px solid #99f'
        : borderStyling()};
    }
    `

    return(
        <Answer
        key={nanoid()}
        onClick={()=>props.handleClick(props.questionId, props.text)}
        >{decodeHtml(props.text)}</Answer>
    )
}

export default Answer