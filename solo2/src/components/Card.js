import React from "react"
import mark from "../images/mark.png"

export default function Card(props){
  return(
    <section className="card-container">
      <img src={process.env.PUBLIC_URL + props.item.image} className="card-image"/>
      <div className="card-information">
        <div className="card-location">
          <img src={mark} className="card-mark"/>
          <h4 className="card-country">{props.item.location}</h4>
          <a href={props.item.googleMapsUrl} className="card-googlemaps">View on Google Maps</a>
        </div>
        <h2 className="card-title">{props.item.title}</h2>
        <h6 className="card-date">{props.item.startDate} - {props.item.endDate}</h6>
        <p className="card-desc">{props.item.description}</p>
      </div>
    </section>
  )
}
