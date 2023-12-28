import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logonew.png";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { BadgePercent } from "lucide-react";

export default function Navbar() {
  const [custLogin, setCustLogin] = useState(true);
  const [resLogin, setResLogin] = useState(true);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  const handleAccount = () => {};
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setCustLogin(false);
    }
    if (localStorage.getItem("restoken") == null) {
      setResLogin(false);
    }
  }, []);

  return (
    <>
      {!custLogin && !resLogin && (
        <div className="header">
          <img src={logo} alt="logo for app" className="navlogo" />
          <nav className="navbar">
            <li className="navlist"> Home</li>
            <li className="navlist"> About</li>
            <li className="navlist" onClick={handleLogin}>
              Login
            </li>
            <li className="navlist"> Sign up </li>
          </nav>
        </div>
      )}
      {custLogin && (
        <>
          <div className="loggedheader">
            <div className="loggednavbar">
              <img src={logo} alt="logo for app" className="navbarlogo" />
              <div className="currentlocationdiv">location</div>
            </div>
            <nav className="lnavbar">
              <li className="cart">
                <BadgePercent /> <span>Offers</span>
              </li>
              <li className="cart" onClick={handleAccount}>
                Account
              </li>
              <li className="cart">
                <LocalMallIcon size={30} color="primary" />
                <span>Cart</span>
              </li>
            </nav>
          </div>
        </>
      )}
      {resLogin && (
        <>
        <div className="loggedheader">
            <div className="loggednavbar">
              <img src={logo} alt="logo for app" className="navbarlogo" />
              <div className="currentlocationdiv">location</div>
            </div>
            <nav className="lnavbar">
              <li className="cart">
                <BadgePercent /> <span>Offers</span>
              </li>
              <li className="cart" onClick={handleAccount}>
                Account
              </li>
              <li className="cart">
                <LocalMallIcon fontSize="medium" color="success" />
                <span>Cart</span>
              </li>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
