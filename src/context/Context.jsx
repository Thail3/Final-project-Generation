import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  console.log(title);
  const [imgActivities, setImgActivities] = useState("");
  const [type, setType] = useState("Run");
  console.log(type);
  const [date, setDate] = useState("");
  console.log(date);
  const [startDuration, setStartDuration] = useState("");
  console.log(startDuration);
  const [endDuration, setEndDuration] = useState("");
  console.log(endDuration);
  const [description, setDescription] = useState("");
  console.log(description);
  const [statusActivity, setStatusActivity] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [loging, setLoging] = useState("");
  const [logout, setLogout] = useState("");
  const [userName, setUserName] = useState("");
  console.log("start Duration", startDuration);

  const setActivityData = (
    newTitle,
    newType,
    newDate,
    newDuration,
    newDesc
  ) => {
    setTitle(newTitle);
    setType(newType);

    const start = new Date(
      Date.UTC(
        +newDate.substring(0, 4),
        +newDate.substring(5, 7) - 1,
        +newDate.substring(8, 10),
        +newDate.substring(11, 13),
        +newDate.substring(14, 16),
        0,
        0
      )
    );

    let date = start.toLocaleString("fr-CA", {
      // timeZone: "Asia/Bangkok",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    const formattedDate = date;
    const formattedTime = start
      .toLocaleString("en-GB")
      // .toLocaleString("en-GB", { timeZone: "Asia/Bangkok" })
      .substring(12, 17);
    console.log("formattedDate", formattedDate);
    setDate(formattedDate);
    setStartDuration(formattedTime);

    let startTime = start.getTime();
    startTime += newDuration * 60 * 1000;
    let endDateTime = new Date(startTime);

    let hh = endDateTime.getHours();
    if (hh < 10) {
      hh = "0" + hh;
    }
    let mm = endDateTime.getMinutes();
    if (mm < 10) {
      mm = "0" + mm;
    }

    setEndDuration(hh + ":" + mm);
    setDescription(newDesc);
  };

  const startDateTime = () => {
    const utcDate = new Date(
      +date.substring(0, 4),
      +date.substring(5, 7) - 1,
      +date.substring(8, 10),
      +startDuration.substring(0, 2),
      +startDuration.substring(3, 5),
      0,
      0
    );

    console.log("utcDate", utcDate);

    return utcDate;
  };

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

  const clearActivity = () => {
    setTitle("");
    setType("");
    setDate("");
    setStartDuration("");
    setEndDuration("");
    setDescription("");
  };

  const url = "http://localhost:8000";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/activity`);
      res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      let mapStatusActivity = new Map();
      for (let i = 0; i < res.data.length; i++) {
        let id = res.data[i]._id;
        console.log(id);
        mapStatusActivity.set(id, false);
      }

      setStatusActivity(mapStatusActivity);
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
        date: startDateTime(),
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
      const res = await axios.patch(`${url}/activity/${id}`, {
        title: title,
        type: type,
        data: date,
        duration: duration(),
        desc: description,
      });
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
        statusActivity,
        setStatusActivity,
        loading,
        setLoading,
        logout,
        setLogout,
        userName,
        setUserName,
        createActivity,
        updateActivity,
        deleteActivity,
        setActivityData,
        startDateTime,
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
