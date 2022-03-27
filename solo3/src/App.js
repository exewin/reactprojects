import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Question from "./Question"
import {nanoid} from "nanoid"


const App = () =>{

  const Header = styled.h1`
    font-family: 'Nunito Sans', sans-serif;
    background-image: linear-gradient(to left, indigo, blue, green, orange, red);   
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `

  const Paragraph = styled.p`

  `
  const Button = styled.button`
    font-family: 'Nunito Sans', sans-serif;
    padding: 10px 20px;
    background: none;
    font-size: 25px;
    border-radius: 5px;
    min-width: 75px;
    cursor: pointer;
    &:hover{
    }
  `
  const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
  `

  const [quizStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5")
    .then(response => response.json())
    .then(data=>setQuestions(data.results.map(object=>({...object, selected:""}))))
  },[])

  const selectAnswer = (questionId, answer) =>{
    setQuestions(prev => prev.map((object,index)=>
      questionId==index?
      {...object, selected:answer}
      :object))
 
      //console.log(questions) ty szmato
  }

  const mappedQuestions = questions.map((quest, index) =>
  <Question 
  key={nanoid()}
  category={quest.category}
  question={quest.question}
  correctAnswer={quest.correct_answer}
  incorrectAnswers={quest.incorrect_answers}
  selected={quest.selected}
  questionId={index}
  handleClick={selectAnswer}
  />)



  return(
    !quizStarted ?
    <Container>
      <Header>RANDOM QUIZ</Header>
      <Paragraph>Answer five completely random questions</Paragraph>
      <Button onClick={()=>setQuizStarted(true)}>Start quiz</Button>
    </Container>
    :
    <Container>
      {mappedQuestions}
      <Button onClick={()=>console.log("check answers")}>Check answers</Button>
    </Container>
  )
}

export default App