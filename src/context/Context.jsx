import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([
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
  ]);
  const [title, setTitle] = useState("");
  console.log(title);
  const [imgActivities, setImgActivities] = useState("");
  const [type, setType] = useState("");
  console.log(type);
  const [date, setDate] = useState("");
  console.log(date);
  const [startDuration, setStartDuration] = useState("00:00");
  console.log(startDuration);
  const [endDuration, setEndDuration] = useState("00:00");
  console.log(endDuration);
  const [description, setDescription] = useState("");
  console.log(description);
  const [status, setStatus] = useState(false);
  return (
    <AppContext.Provider
      value={{
        activities,
        setTitle,
        setImgActivities,
        setType,
        setDate,
        setStartDuration,
        setEndDuration,
        setDescription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
