import React from "react"
import logo from "../images/logo.png"
import styled from "styled-components"

const Nav = styled.nav`
background: #e77;
width:100vw;
display:flex;
align-items: center;
justify-content: center;
column-gap: 5px;
color:white;
font-family: 'Fredoka', sans-serif;
margin-bottom: 15px;
padding: 20px;
`

export default function Navbar(){
  return(
    <Nav>
      <img src={logo}/>
      <h4>my travel journal.</h4>
    </Nav>
  )
}
