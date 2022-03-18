import React from "react"
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import "./App.css"
import data from "./data/data.js"

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

