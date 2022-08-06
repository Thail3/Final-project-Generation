import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    // {
    //   id: 0,
    //   name: "Title Name 1",
    //   date: "28/07/2022",
    //   duration: "3 hours",
    //   type: "Run",
    //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   status: "status 1",
    // },
    // {
    //   id: 1,
    //   name: "Title Name 2",
    //   date: "27/07/2022",
    //   duration: "2 hours",
    //   type: "Bicycle ride",
    //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   status: "status 1",
    // },
    // {
    //   id: 2,
    //   name: "Title Name 3",
    //   date: "29/07/2022",
    //   duration: "5 hours",
    //   type: "Swim",
    //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   status: "status 2",
    // },
    // {
    //   id: 3,
    //   name: "Title Name 4",
    //   date: "30/07/2022",
    //   duration: "4 hours",
    //   type: "Walk",
    //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   status: "status 3",
    // },
    // {
    //   id: 4,
    //   name: "Title Name 5",
    //   date: "31/07/2022",
    //   duration: "6 hours",
    //   type: "Hike",
    //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   status: "status 4",
    // },
    // {
    //   id: 5,
    //   name: "Title Name 6",
    //   date: "01/08/2022",
    //   duration: "2 hours",
    //   type: "Run",
    //   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //   status: "status 5",
    // },
  ]);

  const [title, setTitle] = useState("");
  console.log(title);
  const [imgActivities, setImgActivities] = useState("");
  const [type, setType] = useState("run");
  console.log(type);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  console.log(date);
  const [startDuration, setStartDuration] = useState("00:00");
  console.log(startDuration);
  const [endDuration, setEndDuration] = useState("00:00");
  console.log(endDuration);
  const [description, setDescription] = useState("");
  console.log(description);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loging, setLoging] = useState("");
  const [logout, setLogout] = useState("");
  const [userName, setUserName] = useState("");

  const duration = () => {
    const start = new Date(
      +date.substring(0, 4),
      +date.substring(5, 7) - 1,
      +date.substring(8, 10),
      +startDuration.substring(0, 2),
      +startDuration.substring(3, 5),
      0,
      0
    );
    const end = new Date(
      +date.substring(0, 4),
      +date.substring(5, 7) - 1,
      +date.substring(8, 10),
      +endDuration.substring(0, 2),
      +endDuration.substring(3, 5),
      0,
      0
    );
    let minutes = Math.round((end.getTime() - start.getTime()) / 1000 / 60);
    return minutes;
  };
  console.log(duration());

  const initialState = {
    title: "",
    type: "run",
    date: new Date().toISOString().substring(0, 10),
    startDuration:"00:00",
    endDuration:"00:00",
    description:"",
  }

  const clearActivity = () => {
    setTitle(initialState.title);
    setType(initialState.type);
    setDate(initialState.date);
    setStartDuration(initialState.startDuration);
    setEndDuration(initialState.endDuration);
    setDescription(initialState.description);
  };

  const url = "http://localhost:8000";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/activity`);
      res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setActivities(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createActivity = async () => {
    try {
      await axios.post(`${url}/activity`, {
        title: title,
        type: type,
        date: date,
        duration: duration(),
        desc: description,
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const updateActivity = async (id) => {
    try {
      const idx = activities.findIndex((activity) => activity._id === id);
      const newActivity = [...activities];
      const res = await axios.patch(`${url}/activity/${id}`);
      newActivity[idx] = res.data;
      setActivities(newActivity);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteActivity = async (id) => {
    try {
      await axios.delete(`${url}/activity/${id}`);
      const newActivity = activities.filter((activity) => activity._id !== id);
      setActivities(newActivity);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activities,
        setActivities,
        type,
        setType,
        title,
        setTitle,
        imgActivities,
        setImgActivities,
        date,
        setDate,
        startDuration,
        setStartDuration,
        endDuration,
        setEndDuration,
        description,
        setDescription,
        status,
        setStatus,
        loading,
        setLoading,
        logout,
        setLogout,
        userName,
        setUserName,
        createActivity,
        updateActivity,
        deleteActivity,
        clearActivity,
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
