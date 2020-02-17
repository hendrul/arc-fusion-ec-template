import React, { useContext } from "react";
import path from "path";
import getProperties from "fusion:properties";

/* global Fusion */

function useMockContext() {
  const mockConfig = useContext(Fusion.contexts.app);
  if (!Fusion.mockConfig) {
    const siteProperties = getProperties(mockConfig.arcSite);
    const { metas } = mockConfig;
    Fusion.mockConfig = {
      ...mockConfig,
      deployment: i => {
        const j = i
          .replace(path.join(mockConfig.contextPath, "resources"), "")
          .replace(/^\/|\/$/g, "");
        try {
          return require("../../resources/" + j);
        } catch (e) {
          try {
            let res = require("../../resources/**/*.*");
            const dirs = j.split("/");
            const file = dirs[dirs.length - 1];
            const fileName = file.slice(0, file.lastIndexOf("."));
            let ext = file.lastIndexOf(".");
            ext = ext >= 0 ? file.slice(ext + 1) : undefined;
            dirs.slice(0, -1).forEach(d => (res = res[d]));
            res = res[fileName][ext] || res[fileName];
            return res;
          } catch (e) {}
        }
      },
      metaValue: meta => (metas || {})[meta],
      siteProperties
    };
  }
  return Fusion.mockConfig;
}

const { applyLocalEdits } = require("./_shared/local-edits");
const HOCWrapper = require("./_shared/wrapper");

const useComponentContext = () => {
  return {};
  // const { editedGlobalContents, props: appContext = {} } = useContext(
  //   Fusion.contexts.app
  // );
  // const { localEdits, ...componentContext } = useContext(
  //   Fusion.contexts.component
  // );

  // return {
  //   ...componentContext,
  //   get globalContent() {
  //     // globalContent must be hydrated with localEdits within the context of each Fusion component
  //     // however, multiple child components may access globalContent within the same component context
  //     // there is no reason to re-calculate each time, so cache on component id
  //     if (!editedGlobalContents.hasOwnProperty(componentContext.id)) {
  //       editedGlobalContents[componentContext.id] = applyLocalEdits(
  //         appContext.globalContent,
  //         localEdits
  //       );
  //     }
  //     return editedGlobalContents[componentContext.id];
  //   }
  // };
};

const useAppContext = () => {
  const mockConfig = useMockContext();
  const { props = {} } = useContext(Fusion.contexts.app);
  const componentContext = useComponentContext();
  return {
    ...props,
    get globalContent() {
      // use the localEdit-hydrated globalContent for the current component context
      return componentContext.globalContent;
    },
    ...mockConfig
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
