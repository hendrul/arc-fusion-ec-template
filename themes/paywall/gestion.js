import { red, grey, lightBlue } from "@material-ui/core/colors";
export default {
  name: "gestion",
  palette: {
    background: { default: grey[200] },
    divider: grey[600],
    primary: {
      main: "#8f071f",
      light: red[400],
      contrastText: "#f4f4f4"
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
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
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
    logo: "ges_logo",
    logo_full: "ges_logo_full",
    loading: "ges_loading",
    arrowRight: "arrowRight"
  }
};
