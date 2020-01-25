/* eslint-disable no-use-before-define */
import React from "react";
import PropTypes from "prop-types";
import styled from "@material-ui/core/styles/styled";

import { FusionContextProvider } from "../../libs/fusion/fusion-context";

const Layout = styled("div")({
  display: "flex",
  justifyContent: "center"
});

const ContentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  position: "inherit",
  width: "100%",
  flexDirection: "column",
  background: theme.palette.background.default
}));

const DefaultLayout = ({ children = [] }) => {
  return (
    <FusionContextProvider app="paywall" defLang="es">
      <Layout>
        <ContentContainer>
          {children[0] /* Cabecera de página */}
          <div role="main">{children[1] /* Contenido */}</div>
          {children[2] /* Pie de página */}
        </ContentContainer>
      </Layout>
    </FusionContextProvider>
  );
};

DefaultLayout.sections = ["Cabecera de página", "Contenido", "Pie de página"];
DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
