import React from "react"
import photo from "../images/photo.png"
import emailicon from "../images/emailicon.png"
import linkedinicon from "../images/linkedinicon.png"
import hair from "../images/hair.png"

export default function Personality()
{
  return(
    <div className="personality">
      <img className="main-photo" src={photo}/>
      <h2>Al Pacino</h2>
      <p className="colored-text">Middleend Developer</p>
      <small>texas.ranger</small>
      <div className="personality-buttons">
        <a href="http://google.com" id="button-email"><img src={emailicon}/> Email</a>
        <a href="http://linkedin.com" id="button-linkedin"><img src={linkedinicon}/> LinkedIn</a>
      </div>
    </div>
  )
}