import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Landing from "../../pages/Landing/Landing";

export default function ProtectedLayoutRes() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("restoken") == null) {
      setLoggedIn(false);
    }
  }, []);
  return (
    <div>
      {loggedIn ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <Landing/>
        </>
      )}
    </div>
  );
}