import React from "react";
import { ThemeProvider } from "emotion-theming";
import { useFusionContext } from "fusion:context";

import { colorManipulators } from "./utils";

export default ({ app, children }) => {
  const fusionContext = useFusionContext();
  const {
    arcSite: site,
    siteProperties: {
      [app]: { images }
    }
  } = fusionContext;

  let theme = {};
  try {
    const themeOpts = require(`./${app}/${site}`);
    theme = React.useRef(
      createTheme({
        ...(themeOpts.default || themeOpts),
        images
      })
    ).current;
  } catch (e) {
    throw new Error(
      `No ha definido un tema para el sitio web "${site}" de "${app}"`
    );
  }
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

/**
 * Una pequeña modificacion a createMuiTheme de material-ui
 * que soporta un argumento boolean adicional al final de las
 * funciones utilitarias de "breakpoints" (up, down, between y only),
 * por defecto es "true", con este argumento se puede especificar
 * si se quiere o no que el media query inicie con "@media "
 */
const createTheme = options => {
  const palette = {
    ...options.palette,
    ...colorManipulators
  };
  const theme = createMuiTheme({ ...options, palette });
  const { breakpoints } = theme;

  const bpFuncWrapper = fn => (...args) => {
    const fullMediaQuery = args[args.length - 1];
    if (typeof fullMediaQuery === "boolean" && !fullMediaQuery) {
      return fn(...args).replace(/^@media\s*/, "");
    }
    return fn(...args);
  };

  breakpoints.up = bpFuncWrapper(breakpoints.up);
  breakpoints.down = bpFuncWrapper(breakpoints.down);
  breakpoints.only = bpFuncWrapper(breakpoints.only);
  breakpoints.between = bpFuncWrapper(breakpoints.between);

  return theme;
};
