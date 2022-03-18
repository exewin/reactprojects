import React from "react"
import Navbar from "./components/Navbar"
import {Card} from "./components/Card"
import data from "./data/data.js"
import styled from "styled-components"

styled.body`
  margin:0px;
  font-family: 'Nanum Gothic', sans-serif;
`


function App(){
  const mappedData = data.map(item=>
     <Card key={item.id} item={item}/>
     )
  return(
    <div>
        <Navbar/>
        {mappedData}
    </div>
  )
}

export default App

