import React from "react";
import "./container.css";
import CardComponent from "../CardComponent/CardComponent";
import { useGlobalContext } from "../../context/Context";

function Container(props) {
  const { activities } = useGlobalContext();
  console.log(activities);

  const cards = activities.map((activity, index) => (
    <CardComponent
      key={index}
      activity={activity}
      id={activity.id}
      name={activity.name}
      date={activity.date}
      duration={activity.duration}
      type={activity.type}
      description={activity.description}
      status={activity.status}
    />
  ));

  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-around">{cards}</div>
    </div>
  );
}

export default Container;
