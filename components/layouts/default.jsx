/** @jsx jsx */
/* eslint-disable no-use-before-define */
import React from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/core";
import { useTheme } from "emotion-theming";
import ThemeProvider from "emotion-theming";
import { useFusionContext } from "fusion:context";

import { FusionContextProvider } from "../../lib/fusion-extension";
import ErrorBoundary from "../global-components/error-boundary";

const DefaultLayout = ({ children = [] }) => {
  const {
    arcSite,
    theme
  } = useFusionContext();

const Layout = styled.div({
  display: "flex",
  justifyContent: "center"
  return (
    <FusionContextProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <div
            css={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              css={{
                display: "flex",
                position: "inherit",
                width: "100%",
                flexDirection: "column",
                background: theme.palette.background.default
              }}
            >
              {children[0] /* Cabecera de página */}
              <div role="main">{children[1] /* Contenido */}</div>
              {children[2] /* Pie de página */}
            </div>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </FusionContextProvider>
  );
};

DefaultLayout.sections = ["Cabecera de página", "Contenido", "Pie de página"];
DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
