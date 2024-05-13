import "./resprofile.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function RestaurantProfile() {
  const navigate = useNavigate();
  const handlelogout = () => {
    
    localStorage.removeItem("restoken");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <div className="res-profile-container">
        <div className="sidenav-resprofile">
          <h3 className="res-pro-head">Restaurant Details</h3>
          <div className="sidenav-res">
            <NavLink to="/partner/profile">
              <p className="sidenav-menu">AddMenu</p>
            </NavLink>

            <NavLink to="/partner/profile/menulist">
              <p className="sidenav-menu">Menu List</p>
            </NavLink>
            <NavLink to="/partner/profile/:id">
              <p className="sidenav-menu">Profile</p>
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
