/* eslint-disable no-use-before-define */
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "emotion-theming";

import { FusionContextProvider } from "../../lib/fusion-extension";
import ErrorBoundary from "../global-components/error-boundary";
import propSystem from "../global-components/prop-system";

propSystem.config({ useTheme, styled });

const Layout = styled.div({
  display: "flex",
  justifyContent: "center"
});

const ContentContainer = styled.div(({ theme }) => ({
  display: "flex",
  position: "inherit",
  width: "100%",
  flexDirection: "column",
  background: theme.palette.background.default
}));

const DefaultLayout = ({ children = [] }) => {
  return (
    <FusionContextProvider featurePack="sample-featurepack" defLang="es">
      <ErrorBoundary>
        <Layout>
          <ContentContainer>
            {children[0] /* Cabecera de página */}
            <div role="main">{children[1] /* Contenido */}</div>
            {children[2] /* Pie de página */}
          </ContentContainer>
        </Layout>
      </ErrorBoundary>
    </FusionContextProvider>
  );
};

DefaultLayout.sections = ["Cabecera de página", "Contenido", "Pie de página"];
DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
