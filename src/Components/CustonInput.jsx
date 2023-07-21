import React from "react";
import { TextField } from "@mui/material";

const inputStyle = {
  Input: {
    fontWeight: 600,
    fontSize: "20px",
    color: "#000",
    textAlign: "center",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 600,
      fontSize: "20px",
      color: "#000",
    },
  },
  width: "100%",
  borderRadius: "5px",
  background: "#fff",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
};

const CustomInput = (props) => {
  return <TextField {...props} size="small" sx={inputStyle} />;
};

export default CustomInput;
