import React, { useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading(props) {
  const timerRef = useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  return (
    <div>
      {props.loadtype == "circular" && (
        <Fade
          in={props.loading}
          style={{
            transitionDelay: props.loading ? "800ms" : "0ms",
          }}
          unmountOnExit
        >
          <CircularProgress
            size={props.size || 70}
            thickness={props.thickness || 3}
            color="success"
          />
        </Fade>
      )}

      {props.loadtype == "linear" && <LinearProgress />}
    </div>
  );
}
