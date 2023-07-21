import { Backdrop } from "@mui/material";
import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets10.lottiefiles.com/packages/lf20_uwR49r.json"
          style={{ width: "250px" }}
        ></lottie-player>
      </Backdrop>
    </div>
  );
};

export default Loading;
