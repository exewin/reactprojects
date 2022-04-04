import React from "react"
import styled from "styled-components"
import {nanoid} from "nanoid"
import {decodeHtml} from "./GlobalFunctions"

const borderStyling = props =>{
    let styling = '2px solid white'
    if(props.trueAnswer === "hidden")
        if(props.selected)
            styling = '2px solid yellow'
        else
            styling = '2px solid white'
    else if(props.trueAnswer === "true")
        if(props.selected)
            styling = '2px solid #7e7'
        else
            styling = '2px dashed #3f3'
    else if(props.trueAnswer === "false")
        if(props.selected)
            styling = '2px solid red'
        else
            styling = '2px solid white'

    return styling
}

const AnswerBtn = styled.button`
    background: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 18px;
    border-radius: 5px;
    border: ${props => borderStyling(props.componentProps)};
    min-width: 75px;
    order: ${props => props.componentProps.position};
    cursor: ${props => props.componentProps.trueAnswer === "hidden" ? 'pointer' : 'default'};
    &:hover{
        border: ${props => props.componentProps.trueAnswer === "hidden" ? props.componentProps.selected ? '2px solid #dd2' : '2px solid #f3f' : borderStyling(props.componentProps)};
    }
`

const Answer = (props) =>{


    return(
        <AnswerBtn
        key={nanoid()}
        componentProps={props}
        onClick={()=>props.handleClick(props.questionId, props.text)}
        >{decodeHtml(props.text)}</AnswerBtn>
    )
}

export default Answer
