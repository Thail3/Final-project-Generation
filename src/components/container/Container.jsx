import React from "react";
import "./container.css";
import CardComponent from "../CardComponent/CardComponent";

function Container(props) {
  //const activities = props.activities
  const activities = [
    {
      id: 0,
      name: "Title Name 1",
      date: "28/07/2022",
      duration: "3 hours",
      type: "Run",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "status 1",
    },
    {
      id: 1,
      name: "Title Name 2",
      date: "27/07/2022",
      duration: "2 hours",
      type: "Bicycle ride",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "status 1",
    },
    {
      id: 2,
      name: "Title Name 3",
      date: "29/07/2022",
      duration: "5 hours",
      type: "Swim",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "status 2",
    },
    {
      id: 3,
      name: "Title Name 4",
      date: "30/07/2022",
      duration: "4 hours",
      type: "Walk",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "status 3",
    },
    {
      id: 4,
      name: "Title Name 5",
      date: "31/07/2022",
      duration: "6 hours",
      type: "Hike",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "status 4",
    },
    {
      id: 5,
      name: "Title Name 6",
      date: "01/08/2022",
      duration: "2 hours",
      type: "Run",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "status 5",
    },
  ];
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
