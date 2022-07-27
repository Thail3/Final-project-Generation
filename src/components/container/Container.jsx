import React from "react";
import "./container.css";
import CardComponent from "../CardComponent/CardComponent"
import { Container as BContainer } from 'react-bootstrap';

function Container(props) {
  const renderCard = () => {
    return (
      <div>
        <CardComponent />
      </div>
    )
  }
  const activities =[{}, {}, {}, {},  {}, {}, ]
  const cards = activities.map( () => (
    <div>
      <CardComponent />
    </div>
  ))

  return (

    <BContainer>
      <div class="d-flex justify-content-center align-items-center flex-wrap">
        <div class="d-flex justify-content-center align-items-center flex-wrap">
            {cards}
        </div>
      </div>
    </BContainer>


  )
}

export default Container;
