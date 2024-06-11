import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import "./userprofile.css"

const apiurl = process.env.REACT_APP_API_URL;
export default function UserProfile() {
  return (
    <>
      <Navbar />
      <div className="user-container">
        <div class="overlay"></div>
        <div class="stars" aria-hidden="true"></div>
        <div class="starts2" aria-hidden="true"></div>
        <div class="stars3" aria-hidden="true"></div>
        <main class="main">
          <section class="contact">
            <h1 class="title">Profile Section</h1>
            <h2 class="sub-title"> Under Construction</h2>
          </section>
        </main>
      </div>
    </>
  );
}
