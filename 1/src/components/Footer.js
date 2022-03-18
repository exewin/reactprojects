import React from "react"
import githubicon from "../images/githubicon.png"
import twittericon from "../images/twittericon.png"
import facebookicon from "../images/facebookicon.png"
import instagramicon from "../images/instagramicon.png"

export default function Footer()
{
  return(
    <div className="footer">
      <a href="http://github.com"><img src={githubicon}/></a>
      <a href="http://twitter.com"><img src={twittericon}/></a>
      <a href="http://facebook.com"><img src={facebookicon}/></a>
      <a href="http://instagram.com"><img src={instagramicon}/></a>
    </div>
  )
}