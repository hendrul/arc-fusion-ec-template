import { grey, amber, lightBlue, pink, red } from "@material-ui/core/colors";

export default {
  name: "elcomercio",
  palette: {
    background: { default: grey[200] },
    divider: grey[600],
    primary: {
      main: amber[400],
      contrastText: "#000"
    },
    secondary: {
      main: lightBlue[800]
    },
    terciary: {
      main: "#000",
      light: grey[700],
      contrastText: grey[100]
    },
    common: { black: "#000", blackboard: "#444444", white: "#fff" },
    success: {
      main: "#22810b",
      light: "rgba(34, 129, 11, 0.1)"
    },
    error: {
      light: pink[50],
      main: red[700],
      contrastText: "#fff"
    },
    action: {
      disabledBackground: grey[100]
    }
  },
  breakpoints: {
    values: { xs: 0, sm: 640, md: 1024, lg: 1280, xl: 1920 }
  },
  typography: {
    fontWeightHeavy: 700
  },
  icon: {
    logo: "eco_logo",
    logo_full: "eco_logo_full",
    loading: "eco_loading",
    arrowRight: "arrowRight"
  }
};
