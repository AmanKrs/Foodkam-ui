import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import "./userprofile.css"

const apiurl = process.env.REACT_APP_API_URL;
export default function UserProfile() {
  return (
    <>
      <Navbar />
      <div className="user-container">
        <div className="overlay"></div>
        <div className="stars" aria-hidden="true"></div>
        <div className="starts2" aria-hidden="true"></div>
        <div className="stars3" aria-hidden="true"></div>
        <main className="main">
          <section className="contact">
            <h1 className="title">Profile Section</h1>
            <h2 className="sub-title"> Under Construction</h2>
          </section>
        </main>
      </div>
    </>
  );
}
