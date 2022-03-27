import React from "react"
import styled from "styled-components"
import {nanoid} from "nanoid"
import Answer  from "./Answer"


const Question = (props) =>{

    /* CSS */
    const borderColor = "#ddd"

    const QuestionBlock = styled.div`
    display:flex;
    flex-direction: column;
    border:2px solid ${borderColor};
    max-width: 800px;
    margin:10px;
    border-radius: 5px;
    `

    const Category = styled.h6`
    margin: 0;
    border-bottom:2px solid ${borderColor};
    border-right: 2px solid ${borderColor};
    width: fit-content;
    padding:5px 20px;
    border-radius: 0px 0px 5px 0px;
    cursor: default;
    `

    const Question = styled.p`
    margin:5px;
    padding:5px 12px;
    cursor: default;
    `
    
    const AnswersBlock = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    gap:15px;

    `
    /* End CSS */

    const createAnswer = content => {
        return(
            <Answer
            questionId={props.questionId} 
            text={content} 
            handleClick={props.handleClick} 
            selected={content == props.selected ? true : false}
            key={nanoid()}
            />
        )
    }

    const wrongAnswers = props.incorrectAnswers.map(answer => createAnswer(answer))
    const correctAnswer = createAnswer(props.correctAnswer)


    return(
        <QuestionBlock>
            <Category>{props.category}</Category>
            <Question>{props.question}</Question>
            <AnswersBlock>
            {wrongAnswers} 
            {correctAnswer}
            </AnswersBlock>
        </QuestionBlock>

    )
}

export default Question