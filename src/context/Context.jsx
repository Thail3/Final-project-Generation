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
  const [type, setType] = useState("Run");
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
  const [loading, setLoading] = useState(false);
  const [loging, setLoging] = useState("");
  const [logout, setLogout] = useState("");
  const [userName, setUserName] = useState("");

  const url = "http://localhost:8000";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/activity`);
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
      await axios.post(`${url}/activity`);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const updateActivity = async () => {
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

  const deleteActivity = async () => {
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
