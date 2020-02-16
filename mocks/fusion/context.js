import React, { useContext } from "react";
import getProperties from "fusion:properties";

/* global Fusion */

const mockConfig = Fusion.mockConfig;
const siteProperties = getProperties(mockConfig.arcSite);
const { metas } = mockConfig;
Fusion.mockConfig = {
  ...mockConfig,
  deployment: i => {
    const j = i.replace(mockData.contextPath || "");
    try {
      return require("../../resources/" + j);
    } catch (e) {
      try {
        return require("../../resources/*.*")[j];
      } catch (e) {
        throw new Error(`No se encontró el recurso ${j}`);
      }
    }
  },
  metaValue: meta => (metas || {})[meta],
  siteProperties
};

const { applyLocalEdits } = require("./_shared/local-edits");
const HOCWrapper = require("./_shared/wrapper");

const useComponentContext = () => {
  const { editedGlobalContents, props: appContext = {} } = useContext(
    Fusion.contexts.app
  );
  const { localEdits, ...componentContext } = useContext(
    Fusion.contexts.component
  );

  return {
    ...componentContext,
    get globalContent() {
      // globalContent must be hydrated with localEdits within the context of each Fusion component
      // however, multiple child components may access globalContent within the same component context
      // there is no reason to re-calculate each time, so cache on component id
      if (!editedGlobalContents.hasOwnProperty(componentContext.id)) {
        editedGlobalContents[componentContext.id] = applyLocalEdits(
          appContext.globalContent,
          localEdits
        );
      }
      return editedGlobalContents[componentContext.id];
    }
  };
};

const useAppContext = () => {
  const { props = {} } = useContext(Fusion.contexts.app);
  const componentContext = useComponentContext();
  return {
    ...props,
    get globalContent() {
      // use the localEdit-hydrated globalContent for the current component context
      return componentContext.globalContent;
    }
  };
};

const useFusionContext = () => {
  const appContext = useAppContext();
  const componentContext = useComponentContext();

  return {
    ...appContext,
    ...componentContext
  };
};

function ContextComponent(contextHook) {
  return ({ children, ...props }) => {
    const childArray = [].concat(children || []);

    const context = contextHook();

    return React.createElement(
      React.Fragment,
      {},
      childArray.map((child, index) =>
        React.createElement(child, {
          key: index,
          ...context,
          ...props
        })
      )
    );
  };
}

const withContext = useWhichContext => Component => props => {
  const context = useWhichContext();

  return React.createElement(Component, {
    ...props,
    ...context
  });
};

const AppContext = HOCWrapper(ContextComponent(useAppContext));
const ComponentContext = HOCWrapper(ContextComponent(useComponentContext));
const FusionContext = HOCWrapper(ContextComponent(useFusionContext));

module.exports = FusionContext;
module.exports.AppContext = AppContext;
module.exports.ComponentContext = ComponentContext;
module.exports.FusionContext = FusionContext;
module.exports.useAppContext = useAppContext;
module.exports.useComponentContext = useComponentContext;
module.exports.useFusionContext = useFusionContext;
module.exports.withAppContext = withContext(useAppContext);
module.exports.withComponentContext = withContext(useComponentContext);
module.exports.withFusionContext = withContext(useFusionContext);
