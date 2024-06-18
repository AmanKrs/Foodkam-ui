import "./resprofile.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Navbar from "../../../component/Navbar/Navbar";

export default function RestaurantProfile() {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("restoken");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

function toggleMenu() {
  const sidenav = document.getElementById("sidenav-res");
  sidenav.classList.toggle("open");
}



  return (
    <>
      <div className="res-profile-container">
        <div className="sidenav-resprofile">
          <div className="navbar-header">
            <h3 className="res-pro-head">Restaurant Details</h3>
            <div className="hamburger" onClick={toggleMenu}>
              &#9776;
            </div>
          </div>
          <div className="sidenav-res" id="sidenav-res">
            <NavLink to="/partner/profile" className="sidenav-menu">
              AddMenu
            </NavLink>
            <NavLink to="/partner/profile/menulist" className="sidenav-menu">
              Menu List
            </NavLink>
            <NavLink to="/partner/profile/:id" className="sidenav-menu">
              Profile
            </NavLink>
            <LogoutRoundedIcon
              className="sidenav-menu"
              onClick={handlelogout}
            />
          </div>
        </div>

        <div className="resprofile-outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
