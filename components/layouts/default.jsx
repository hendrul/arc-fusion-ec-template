/** @jsx jsx */
/* eslint-disable no-use-before-define */
import React from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/core";
import Styled from "@emotion/styled";
import ThemeProvider from "emotion-theming";
import { useFusionContext } from "fusion:context";

import { FusionContextProvider } from "../../lib/fusion-extension";
import ErrorBoundary from "../global-components/error-boundary";
import propSystem from "../global-components/prop-system";

const DefaultLayout = ({ children = [] }) => {
  const {
    arcSite,
    siteProperties: { gecSites },
    theme
  } = useFusionContext();

  siteKeyMap = gecSites.reduce(
    (prev, site) => ({
      ...prev,
      [site.arcSite]: site.key
    }),
    {}
  );

  propSystem.config({
    site: siteKeyMap[arcSite],
    sites: Object.values(siteKeyMap),
    breakpoints: theme.breakpoints.values,
    Styled
  });
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
