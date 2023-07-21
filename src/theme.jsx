import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0A5EF5",
      light: "#6FDA44",
      contrastText: "#fff",
    },
    secondary: {
      main: "#06044a",
      light: "#4c02f1",
      contrastText: "#000000",
    },
    text: {
      primary: "#000",
      secondary: "#35343f",
    },
  },
  typography: {
    fontFamily: "'Jost', sans-serif",
    h4: {
      fontWeight: 600,
      fontSize: "16px",
    },
    h1: {
      fontWeight: 700,
      fontSize: "28px",
    },
    h2: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h3: {
      fontWeight: 700,
      fontSize: "18px",
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "white",
        color: "black",
      },
      ".img-fluid": {
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
};

theme = responsiveFontSizes(theme);

export default theme;
