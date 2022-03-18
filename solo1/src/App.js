import React from "react"
import Personality from "./components/Personality.js"
import About from "./components/About.js"
import Interests from "./components/Interests.js"
import Footer from "./components/Footer.js"
import "./App.css"

export default function App()
{
  return(
    <div className="container">
      <Personality/>
      <About/>
      <Interests/>
      <Footer/>
    </div>
  )
}