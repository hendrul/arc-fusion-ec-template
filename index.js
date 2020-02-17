import React from "react";
import ReactDOM from "react-dom";

import SamplePage from "Pages/sample-page";

// Importante: Inicializar el mock de fusion
import Fusion from "Fusion";

const FusionAppContext = Fusion.contexts.app.Provider;
const mockConfig = {
  arcSite: "some-site",
  contextPath: "/pf",
  globalContent: {},
  globalContentConfig: {},
  isAdmin: false,
  outputType: "default",
  requestUri: "/home/?_website=somesite&outputType=default",
  template: "page/p9kGju1KbU3MNr",
  layout: "default",
  key: "default",
  collection: "layouts",
  type: "default",
  metas: {
    lang: "es",
    langPack: "sample-featurepack",
    theming: "sample-featurepack"
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FusionAppContext value={mockConfig}>
    <SamplePage />
  </FusionAppContext>,
  rootElement
);
