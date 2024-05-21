import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logonew.png";
import { LogOut } from "lucide-react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { BadgePercent } from "lucide-react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
export default function Navbar() {
  const [custLogin, setCustLogin] = useState(false);
  const [resLogin, setResLogin] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    window.location.reload();
  };

  const handleAccount = () => {
    navigate("/user-profile");
  };

  const handleuserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("restoken");
    navigate("/login");
    window.location.reload();
  };

  const handleNavigatecart = () => {
    if (localStorage.getItem("token")) {
      navigate("/orderlist");
    }
  };

  const handlenavmenu = () => {
    setSideBar(!sideBar);
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setCustLogin(true);
    }
    if (localStorage.getItem("restoken") !== null) {
      setResLogin(true);
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
          </nav>
        </div>
      )}
      {custLogin && (
        <div className="loggedheader">
          <div className="loggednavbar">
            <NavLink to="/">
              <img src={logo} alt="logo for app" className="navbarlogo" />
            </NavLink>

            <div className="currentlocationdiv">location</div>
          </div>
          <nav className="lnavbar">
            <li className="cart">
              <BadgePercent /> <span>Offers</span>
            </li>
            <li className="cart" onClick={handleAccount}>
              Account
            </li>
            <li className="cart" onClick={handleNavigatecart}>
              <LocalMallIcon size={30} color="primary" />
              <span>Cart</span>
            </li>
            <li className="cart" onClick={handleuserLogout}>
              <LogOut className="logout" />
            </li>
          </nav>
          <div className={sideBar ? "nav-side" : "navBar"}>
            <MenuRoundedIcon onClick={handlenavmenu} />
            
          </div>
        </div>
      )}
      {resLogin && (
        <div className="header">
          <img src={logo} alt="logo for app" className="navlogo" />
          <nav className="navbar">
            <li className="navlist"> Home</li>
            <li className="navlist"> About</li>
            <li className="navlist" onClick={handleLogin}>
              Account
            </li>
            <li className="navlist" onClick={handleuserLogout}>
              <LogOut className="logout" />
            </li>
          </nav>
        </div>
      )}
    </>
  );
}
