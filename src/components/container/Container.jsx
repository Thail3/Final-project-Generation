import React from "react";
import "./container.css";
import CardComponent from "../CardComponent/CardComponent";
import { useGlobalContext } from "../../context/Context";

function Container(props) {
  const { currentPage, activities, currentPageData } = useGlobalContext();
  // console.log("Container currentPage", currentPage);
  // console.log("Container activities", activities);

  const cards = currentPageData.map((activity, index) => (
    <CardComponent
      key={index}
      activity={activity}
      id={activity._id}
      title={activity.title}
      date={activity.date}
      duration={activity.duration}
      type={activity.type}
      description={activity.desc}
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
