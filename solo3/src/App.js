import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Question from "./Question"
import {nanoid} from "nanoid"

const Header = styled.h1`
  font-family: 'Nunito Sans', sans-serif;
  background-image: linear-gradient(to left, indigo, blue, green, orange, red);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 50px;
`

const Paragraph = styled.p`

  `
const Button = styled.button`
    font-family: 'Nunito Sans', sans-serif;
    margin-bottom: 15px;
    padding: 10px 20px;
    background: none;
    font-size: 25px;
    border-radius: 5px;
    min-width: 75px;
    cursor: pointer;
  `
const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
  `

export const QUIZ_STATES = {
  START: 'START',
  QUIZ: 'QUIZ',
  RESULTS: 'RESULTS',
}

const App = () => {
  const [quizState, setQuizState] = useState(QUIZ_STATES.START)
  const [questions, setQuestions] = useState([])
  const [points, setPoints] = useState(0)
  const [sliderValue, setSliderValue] = useState(5)

  const getRandomInt = max => Math.floor(Math.random() * max);
  const setRandomPosition = () =>{
    return [getRandomInt(4),getRandomInt(4),getRandomInt(4),getRandomInt(4)]
  }

  useEffect(()=>{
    if(quizState === QUIZ_STATES.QUIZ) {
      fetch(`https://opentdb.com/api.php?amount=${sliderValue}&difficulty=easy`)
        .then(response => response.json())
        .then(data => setQuestions(data.results.map(object=>(
          {...object, selected:"", randomPositions: setRandomPosition()}
        ))))
    }
  },[quizState])

  const selectAnswer = (questionId, answer) =>{
    setQuestions(prev => prev.map((object,index)=>
      questionId===index?
      {...object, selected:answer}
      :object))
  }

  const checkAnswers = () =>{
      let points = 0;
      questions.forEach(question =>{
        if(question.selected === question.correct_answer)
          points++
      })
      setPoints(points)
      setQuizState(QUIZ_STATES.RESULTS)
  }

  const checkResetButton = () =>{
    if(quizState === QUIZ_STATES.QUIZ)
      checkAnswers()
    else if(quizState === QUIZ_STATES.RESULTS)
      setQuizState(QUIZ_STATES.QUIZ)
  }

  const mappedQuestions = questions.map((quest, index) =>
  <Question
  key={nanoid()}
  category={quest.category}
  question={quest.question}
  questionId={index}
  correctAnswer={quest.correct_answer}
  incorrectAnswers={quest.incorrect_answers}
  quizEnded={quizState === QUIZ_STATES.RESULTS}
  selected={quest.selected}
  randomPositions={quest.randomPositions}
  handleClick={selectAnswer}
  />)

  console.log(quizState)

  return(
    quizState === QUIZ_STATES.START ?
    <Container>
      <Header>RANDOM QUIZ</Header>
      <input type={'range'} min={1} max={10} value={sliderValue} onChange={e => setSliderValue(parseInt(e.target.value))} />
      <Paragraph>Answer five completely random questions</Paragraph>
      <Button onClick={()=>setQuizState(QUIZ_STATES.QUIZ)}>Start quiz</Button>
    </Container>
    :
    <Container>
      {mappedQuestions}
      <Paragraph>{quizState === QUIZ_STATES.RESULTS && `Score: ${points}/${questions.length}`}</Paragraph>
      <Button onClick={checkResetButton}>{quizState === QUIZ_STATES.QUIZ ? "Check answers" : "New quiz"}</Button>
    </Container>
  )
}

export default App
