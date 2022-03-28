import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Question from "./Question"
import {nanoid} from "nanoid"


const App = () =>{

  //CSS
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

  //End CSS

  const QIUZ_LENGTH = 5;

  const [quizState, setQuizState] = useState(0)
  const [questions, setQuestions] = useState([])
  const [points, setPoints] = useState(0)


  const getRandomInt = max => Math.floor(Math.random() * max);
  const setRandomPosition = () =>{
    return [getRandomInt(4),getRandomInt(4),getRandomInt(4),getRandomInt(4)]
  }

  const reset = useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount="+QIUZ_LENGTH+"&difficulty=easy")
    .then(response => response.json())
    .then(data=>setQuestions(data.results.map(object=>(
      {...object, selected:"", randomPositions: setRandomPosition()}
      ))))
    .then(quizState === 3 && setQuizState(1))
    console.log("effect")
  },[quizState != 3])

  const selectAnswer = (questionId, answer) =>{
    setQuestions(prev => prev.map((object,index)=>
      questionId==index?
      {...object, selected:answer}
      :object))
  }

  const checkAnswers = () =>{
      let points = 0;
      questions.forEach(question =>{
        if(question.selected == question.correct_answer)
          points++
      })
      setPoints(points)
      setQuizState(2)
  }

  const checkResetButton = () =>{
    if(quizState === 1)
      checkAnswers()
    else if(quizState === 2)
      setQuizState(3)
  }

  const mappedQuestions = questions.map((quest, index) =>
  <Question 
  key={nanoid()}
  category={quest.category}
  question={quest.question}
  questionId={index}
  correctAnswer={quest.correct_answer}
  incorrectAnswers={quest.incorrect_answers}
  quizEnded={quizState == 2 ? true : false}
  selected={quest.selected}
  randomPositions={quest.randomPositions}
  handleClick={selectAnswer}
  />)

  console.log(quizState)

  return( 
    quizState === 0 ?
    <Container>
      <Header>RANDOM QUIZ</Header>
      <Paragraph>Answer five completely random questions</Paragraph>
      <Button onClick={()=>setQuizState(1)}>Start quiz</Button>
    </Container>
    :
    <Container>
      {mappedQuestions}
      <Paragraph>{quizState === 2 && `Score: ${points}/${questions.length}`}</Paragraph>
      <Button onClick={checkResetButton}>{quizState === 1 ? "Check answers" : "New quiz"}</Button>
    </Container>
  )
}

export default App