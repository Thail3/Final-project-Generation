import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";

export default function Profile() {
  return (
    <div style={{ backgroundColor: "#f0f2f5" }}>
      <Navbar />
      <ProfileComponent />
    </div>
  );
}
