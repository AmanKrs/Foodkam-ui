import React from "react";
import googleplay from "../../assets/googleplay.png";
import appstore from "../../assets/appstore.png";
import logo from "../../assets/logonew.png";
import { Facebook, Twitter, Youtube, Instagram, Copyright } from "lucide-react";
import "./footer.css";

export default function Footer() {
  return (
    <>
      <div className="footerdiv">
        <div className="footer-container">
          <div className="menu-items">
            <h4 className="footmenu">COMPANY</h4>
            <p>About us</p>
            <p>Careers</p>
            <p>Terms & Conditions</p>
          </div>
          <div className="menu-items">
            <h4 className="footmenu">CONTACT</h4>
            <p>Help & Support</p>
          </div>
          <div className="menu-items">
            <h4 className="footmenu">FOR RESTAURANTS</h4>
            <p>Partner With Us</p>
            <p>Register Restaurant</p>
          </div>
          <div className="apkstore">
            <img src={appstore} alt="apple store icon" />
            <img src={googleplay} alt="google play icon" />
          </div>
        </div>
        <hr className="hzline"></hr>
        <footer className="ftrdiv">
          <img src={logo} alt="logo for app" className="footerlogo" />
          <p className="ftr-copyright">
            <Copyright size={16} /> FoodKam@2023
          </p>
          <div className="ftricondiv">
            <p>SOCIAL LINKS</p>
            <div className="ftr-icon">
              <Twitter size={26} />
              <Youtube size={26} />
              <Instagram size={26} />
              <Facebook size={26} />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
