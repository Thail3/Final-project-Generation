import React, { useState } from "react";
import Avatar from "react-avatar";
import Button from "react-bootstrap/Button";
import { AiFillEdit } from "react-icons/ai";
import { AiFillPicture } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import "./ProfileComponent.css";

export default function ProfileComponent({
  username = "Username 1",
  profilePhoto = "https://pbs.twimg.com/profile_images/429442426038538240/6Ac9kykG_400x400.jpeg",
  coverPhoto = "https://images.template.net/wp-content/uploads/2014/11/facebook-cover-photos-nature.jpg",
  email = "foobar@foobar.com",
}) {
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleChangeProfileImg = () => {};

  return (
    <div className="container p-0 profile text-center">
      <div className="profile-header">
        <div className="photo">
          <div className="cover img-rounded">
            <img src={coverPhoto} alt="cover" width="100%" height="100%" />
          </div>
        </div>
        <div className="mt-3 profile-photo">
          <Avatar name={username} src={profilePhoto} round={true} size={200} />
        </div>
        <div className="profile-change-pic">
          <Button variant="outline-primary" size="lg" className="m-3">
            <AiFillPicture className="m-1 mb-2" />
            <input
              type="file"
              name="image"
              onChange={handleChangeProfileImg}
              className="m-2"
            >
              Update profile picture
            </input>
          </Button>
          <Button variant="outline-secondary" size="lg" className="m-3">
            <AiFillPicture className="m-1 mb-2" />
            <span className="m-2">Update cover picture</span>
          </Button>
        </div>
      </div>
      <div></div>
      <div className="main mt-3">
        <div></div>
        <div>
          <h1>Name : {username}</h1>
        </div>
        {/* <div className="fs-4">Email : {email}</div> */}

        {/* <div className="footer mt-3  btn-block">
          <Button
            variant="outline-primary"
            size="lg"
            className="m-3 edit btn-block w-50"
          >
            <AiFillEdit className="m-1 mb-2" />
            <span className="m-2">Edit profile</span>
          </Button>
          <Button
            variant="outline-danger"
            size="lg"
            className="m-3 delete btn-block w-50"
          >
            <BsFillShieldLockFill className="m-1 mb-2" />
            <span className="m-2">Change password</span>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
