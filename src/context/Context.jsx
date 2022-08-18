import axios from "axios";
import imgRun from "../assets/run.png";
import imgBike from "../assets/bike.png";
import imgSwim from "../assets/swimming.png";
import imgWalk from "../assets/walking.png";
import imgWeight from "../assets/weight-lifting.png";
import imgScuba from "../assets/scuba-diving.png";
import imgHike from "../assets/hiking.png";

import React, { useState, useContext, useEffect, useMemo } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  // const [activityId, setActivityId] = useState("");
  const [title, setTitle] = useState("");
  console.log(title);
  // const [imgActivities, setImgActivities] = useState('');
  const [type, setType] = useState("");
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
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalActivities, setTotalActivities] = useState(0);

  // console.log("start Duration", startDuration);

  //?! Set Form when Edit

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

  const buildActivityData = (
    newTitle,
    newType,
    newDate,
    newDuration,
    newDesc
  ) => {
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

    let activityData = {
      title: newTitle,
      date: formattedDate,
      type: newType,
      startDuration: formattedTime,
      endDuration: hh + ":" + mm,
      description: newDesc,
      imgActivities: "", //TODO: set image
    };
    return activityData;
  };

  //?! Date convert for sent to Backend

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

  //?! Calculate Duration in Form

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
  // console.log(duration());

  //?! Clear form

  const clearActivity = () => {
    setTitle("");
    // setImgActivities("");
    setType("");
    setDate("");
    setStartDuration("");
    setEndDuration("");
    setDescription("");
  };

  //?!Pagination --------------------------------------------

  const currentPageData = useMemo(() => {
    return activities;
  }, [activities]);

  console.log("currentPageData", currentPageData); //currentPageData

  //?! Fetch Data Activity ------------------------------------------

  //? convert type to mapImageActivity
  const typeToImageActivityPath = (val) => {
    if (val === "run") {
      return imgRun;
    } else if (val === "bike") {
      return imgBike;
    } else if (val === "swim") {
      return imgSwim;
    } else if (val === "walk") {
      return imgWalk;
    } else if (val === "weight") {
      return imgWeight;
    } else if (val === "scuba") {
      return imgScuba;
    } else if (val === "hike") {
      return imgHike;
    }
  };

  const url = "http://localhost:8000";

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${url}/activity?page=${pageNumber}&limit=${pageSize}`
        // `${url}/activity`
      );
      console.log("Context fetchData", res.data);

      let mapStatusActivity = new Map();

      for (let i = 0; i < res.data.activities.length; i++) {
        let id = res.data.activities[i]._id;
        // console.log(id);
        mapStatusActivity.set(id, res.data.activities[i].status);
      }

      // let mapImageActivity = new Map();
      // for (let i = 0; i < res.data.length; i++) {
      //   let id = res.data[i]._id;
      //   mapImageActivity.set(id, typeToImageActivityPath(res.data[i].type));
      // }

      console.log("mapStatusActivity", mapStatusActivity);
      setStatusActivity(mapStatusActivity);
      setActivities(res.data.activities);
      setTotalActivities(res.data.totalActivities);
      setPageSize(res.data.pageSize);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

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
      console.log("Context statusActivity", statusActivity.get(id));

      let updateData = {
        title: title,
        type: type,
        date: date,
        duration: duration(),
        //? status have to fix when update
        status: statusActivity.get(id),
        desc: description,
      };
      console.log("Context updateData", updateData);
      const res = await axios.patch(`${url}/activity/${id}`, updateData);
      newActivity[idx] = res.data;
      setActivities(newActivity);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const updateStatusActivity = async (id) => {
    try {
      const idx = activities.findIndex((activity) => activity._id === id);
      const newActivity = [...activities];
      console.log("Context statusActivity", statusActivity.get(id));

      let currentData = activities[idx];
      console.log("updateStatusActivity", currentData);

      let updateData = {
        title: currentData.title,
        type: currentData.type,
        date: currentData.date,
        duration: currentData.duration,
        status: statusActivity.get(id),
        desc: currentData.description,
      };
      console.log("Context updateData", updateData);
      const res = await axios.patch(`${url}/activity/${id}`, updateData);
      newActivity[idx] = res.data;
      setActivities(newActivity);
      fetchData();
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
        pageNumber,
        setPageNumber,
        // activityId,
        // setActivityId,
        pageSize,
        createActivity,
        updateActivity,
        deleteActivity,
        setActivityData,
        startDateTime,
        clearActivity,
        // nextPage,
        // previousPage,
        // handlePage,
        // currentPage,
        fetchData,
        updateStatusActivity,
        buildActivityData,
        currentPageData,
        totalActivities,
        typeToImageActivityPath,
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
