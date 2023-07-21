import { styled } from "@mui/material";
import Button from "@mui/material/Button";

const ButtonMain = styled(Button)({
  borderRadius: "5px",
  fontFamily: "Roboto",
  fontSize: "15px",
  fontWeight: 500,
  background: "#095DF5",

  color: "#fff",

  "&:hover": {
    background: "#0249cb",
  },
});
export default ButtonMain;
