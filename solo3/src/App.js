import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Question from "./Question"
import {nanoid} from "nanoid"
import LoadingAnimation from "./LoadingAnimation"

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
    margin: 15px 5px;
    padding: 10px 20px;
    background: none;
    font-size: 25px;
    border-radius: 5px;
    width: 250px;
    cursor: pointer;
  `
const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction: column;
  `

const AllQuestions = styled.div`
  display:grid;
`

export const QUIZ_STATES = {
  START: 'START',
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
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
    if(quizState === QUIZ_STATES.LOADING) {
      fetch(`https://opentdb.com/api.php?amount=${sliderValue}&difficulty=easy`)
        .then(response => response.json())
        .then(data => setQuestions(data.results.map(object=>(
          {...object, selected:"", randomPositions: setRandomPosition()}
        ))))
        .then(() => setQuizState(QUIZ_STATES.QUIZ))
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

  const checkStartResetButton = () =>{
    if(quizState === QUIZ_STATES.START)
      setQuizState(QUIZ_STATES.LOADING)
    else if(quizState === QUIZ_STATES.QUIZ)
      checkAnswers()
    else if(quizState === QUIZ_STATES.RESULTS)
      setQuizState(QUIZ_STATES.LOADING)
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


    switch(quizState){
      case QUIZ_STATES.START:
        return(
          <Container>
            <Header>RANDOM QUIZ</Header>
            <Paragraph>Answer random quiz questions</Paragraph>
            <Paragraph>{sliderValue}</Paragraph>
            <input type={'range'} min={1} max={10} value={sliderValue} onChange={e => setSliderValue(parseInt(e.target.value))} />
            <Button onClick={checkStartResetButton}>Start quiz</Button>
          </Container>
        )
      case QUIZ_STATES.LOADING:
        return(
          <Container>
            <Paragraph>Loading...</Paragraph>
            <LoadingAnimation/>
          </Container>
        )
      default:
        return(
          <Container>
            <AllQuestions>{mappedQuestions}</AllQuestions>
            <Paragraph>{quizState === QUIZ_STATES.RESULTS && `Score: ${points}/${questions.length}`}</Paragraph>
            <Container style={{flexDirection: 'row'}}>
              <Button onClick={()=>setQuizState(QUIZ_STATES.START)}>Menu</Button>
              <Button onClick={checkStartResetButton}>{quizState === QUIZ_STATES.QUIZ ? "Check answers" : "New quiz"}</Button>
            </Container>
          </Container>
        )
    }
}

export default App
