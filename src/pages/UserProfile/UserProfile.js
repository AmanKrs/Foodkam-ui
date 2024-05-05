import React from "react";
import Navbar from "../../component/Navbar/Navbar";

const apiurl = process.env.REACT_APP_API_URL;
export default function UserProfile() {
  return (
    <>
      <Navbar />
      <div className="home-container">UserProfile</div>
    </>
  );
}
