import React from "react"
import mark from "../images/mark.png"
import styled from 'styled-components'


const Base = styled.div`
  padding:20px 20px;
  display:flex;
  align-items: center;
  column-gap: 20px;
  box-shadow: 10px 2px 5px #fdd;
`
const Image = styled.img`
  border-radius:6px;
  max-width:160px;
  max-height: 220px;
`
const Info = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
`
const Location = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`
const Mark = styled.img`
  width:9px;
`
const Country = styled.h4`
  margin-right:8px;
`
const GoogleMapsUrl = styled.a`
  text-decoration: none;
  color: #f55;
  transition: 0.2s;
  &:hover{
    color: #a33;
  }
`
const Title = styled.h2`
  font-family: 'Bungee', cursive;
`
const Date = styled.h6`
  font-size: 13px;
`
const Desc = styled.p`
  max-width: 460px;
`




export const Card = (props) => {
  const {
    item
  } = props
  return(
    <Base>
      <Image src={process.env.PUBLIC_URL + item.image}/>
      <Info>
        <Location>
          <Mark src={mark}/>
          <Country>{item.location}</Country>
          <GoogleMapsUrl href={props.item.googleMapsUrl}>View on Google Maps</GoogleMapsUrl>
        </Location>
        <Title>{props.item.title}</Title>
        <Date>{props.item.startDate} - {props.item.endDate}</Date>
        <Desc>{props.item.description}</Desc>
      </Info>
    </Base>
  )
}
