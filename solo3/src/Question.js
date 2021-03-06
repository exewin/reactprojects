import React from "react"
import styled from "styled-components"
import {nanoid} from "nanoid"
import Answer  from "./Answer"
import {decodeHtml} from "./GlobalFunctions"

const borderColor = "white"

const QuestionBlock = styled.div`
    background-color: rgba(89, 89, 188, .4);
    display:flex;
    flex-direction: column;
    border:2px solid ${borderColor};
    max-width: 600px;
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

const QuestionParagraph = styled.p`
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

const Question = (props) =>{

    const createAnswer = (content, index) => {
        return(
            <Answer
            questionId={props.questionId}
            text={content}
            handleClick={props.quizEnded ? ()=>{} : props.handleClick}
            trueAnswer={props.quizEnded ? content === props.correctAnswer ? "true" : "false" : "hidden"}
            selected={content === props.selected}
            position={props.randomPositions[index]}
            key={nanoid()}
            />
        )
    }

    const correctAnswer = createAnswer(props.correctAnswer, 0)
    const wrongAnswers = props.incorrectAnswers.map((answer, index) => createAnswer(answer, index+1))



    return(
        <QuestionBlock>
            <Category>{props.category}</Category>
            <QuestionParagraph>{decodeHtml(props.question)}</QuestionParagraph>
            <AnswersBlock>
            {wrongAnswers}
            {correctAnswer}
            </AnswersBlock>
        </QuestionBlock>

    )
}

export default Question
