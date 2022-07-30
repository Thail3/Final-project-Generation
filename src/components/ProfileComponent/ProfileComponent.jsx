import React from "react";
import Avatar from "react-avatar";
import Button from "react-bootstrap/Button";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

export default function ProfileComponent({
  username = "Username 1",
  src = "https://pbs.twimg.com/profile_images/429442426038538240/6Ac9kykG_400x400.jpeg",
  email = "foobar@foobar.com",
  bio = "Lorem ipsum dolor sit amet consectetur consequatur",
}) {
  return (
    <div className="container profile text-center">
      <div className="head">
        <div className="mt-5">
          <Avatar name={username} src={src} round={true} size={200} />
        </div>
        <div className="">
          <Button variant="outline-primary" size="lg" className="m-3">
            Update profile picture
          </Button>
          <Button variant="outline-secondary" size="lg" className="m-3">
            Update cover picture
          </Button>
        </div>
      </div>
      <div></div>
      <div className="body mt-3">
        <div></div>
        <div>
          <h1>Name : {username}</h1>
        </div>
        <div className="fs-4">Email : {email}</div>
        <div className="fs-3 mt-2">
          Bio: {bio}
        </div>
        {/* <div className="fs-2">
          adipisicing elit. Tenetur officiis ullam et, dolorem,
        </div>
        <div className="fs-2">
          sunt iusto mollitia blanditiis maxime consequatur!
        </div> */}
        <div className="foot-button mt-3">
          <Button variant="outline-primary" size="lg" className="m-3 edit">
            <AiFillEdit className="m-1 mb-2" />
            Edit profile
          </Button>
          <Button variant="outline-danger" size="lg" className="m-3 delete">
            <AiFillDelete className="m-1 mb-2" />
            Change password
          </Button>
        </div>
      </div>
    </div>
  );
}
