/* global Fusion */
import React from "react";
import path from "path";
import { useFusionContext } from "fusion:context";

import interpolate from "./utils/interpolate";
import wrapperHOC from "./utils/wrapper";

/**
 * Extiende el contexto de fusion con temas, i18n,
 * propiedades de sitio interpoladas y urls de recursos
 * resueltas. Las propiedades pasadas son tambien
 * incluidas en el contexto de fusion.
 *
 * NOTA: Esto es una prueba de concepto, la idea es
 * que estas extensiones las agregue Arc en su producto,
 * por el momento depende de renderizar en el cliente
 * para tener acceso al contexto de fusion que se expone
 * en el global window.Fusion.contexts.app
 *
 * @param {*} props
 */
export default function FusionContextProvider(props) {
  const value = useFusionContext();
  const { children, ...extensions } = props;

  // NOTE: Fallará al renderizar en el servidor, ya que no hay window

  const AppContext = Fusion.contexts.app;

  const {
    arcSite: site,
    siteProperties,
    contextPath,
    metaValue,
    requestUri
  } = value;

  const fusionExtensions = React.useRef(
    (() => {
      const theming = metaValue("theming");
      const theme = getTheme(site, theming);

      const langPack = metaValue("langPack");
      const defLang = metaValue("lang");
      const strings = getMessages(langPack, site, defLang);

      const interpolatedSiteProperties = interpolate(siteProperties, {
        contextPath
        // TODO: añadir isProd y hasParamas
      });

      const { resources = {} } = interpolatedSiteProperties;
      const { images = {} } = resources;
      const finalSiteProperties = {
        ...interpolatedSiteProperties,
        resources: {
          ...resources,
          images: getImageDeployments(images)
        }
      };

      const finalTheme = {
        ...theme,
        images: finalSiteProperties.resources.images
      };

      return {
        siteProperties: finalSiteProperties,
        theme: finalTheme,
        strings: strings
      };
    })()
  ).current;

  const Provider = AppContext.Provider;
  const WrapperContext = wrapperHOC(
    ContextComponent(() => React.useContext(AppContext))
  );
  // extend the old value with the new extensions
  const newValue = {
    ...value,
    ...fusionExtensions,
    ...(extensions || {})
  };

  return (
    <Provider value={newValue}>
      <WrapperContext {...props}>{children}</WrapperContext>
    </Provider>
  );
}

function getMessages(langPack, site, lang) {
  let msgs = {};
  try {
    const msgsPath = path.join(langPack, lang, site);
    msgs = require(`../../i18n/${msgsPath}`).default;
  } catch (e) {
    msgs = require("../../i18n/**/*.*");
    msgs = msgs[langPack] ? msgs[langPack] : msgs;
    msgs = msgs[lang] ? msgs[lang] : msgs;
    msgs = msgs[site] ? msgs[site] : msgs;
  }
  return {
    ...msgs,
    // Incluye funcion para interpolar mensajes
    $interpolate: interpolate
  };
}

function getTheme(site, theming) {
  let theme = {};
  try {
    const themePath = path.join(theming, site);
    theme = require(`../../themes/${themePath}`).default;
  } catch (e) {
    theme = require("../../themes/**/*.*");
    theme = theme[theming] ? theme[theming] : theme;
    theme = theme[site] ? theme[site] : site;
  }
  return theme;
}

/**
 * Devuelve un mapa de todas las urls finales de las imagenes de la aplicacion,
 * una url para cada formato disponible. Estas imagenes deben almacenarse
 * dentro de la carpeta "resources" del proyecto, y su respectivo nombre y
 * ruta local en la carpeta resources se debe listar en siteProperties
 *
 * @param images Objeto con un mapa de nombre de imagenes y sus rutas
 */
const getImageDeployments = images => {
  const fusionContext = useFusionContext();
  const { arcSite, contextPath, deployment } = fusionContext;
  return Object.keys(images).reduce((prev, key) => {
    const imagePath = path.join(
      contextPath,
      "/resources/",
      arcSite,
      "/images/",
      images[key]
    );
    const imgExts = ["png", "webp", "jpg", "jpeg", "gif", "svg"];
    const regexp = new RegExp(`(.*)[.](${imgExts.join("|")})$`);
    const match = imagePath.match(regexp);
    let resolvedUrls = {};
    if (match) {
      const basepath = match[1];
      resolvedUrls = imgExts.reduce((prev2, ext) => {
        try {
          const img = deployment(`${basepath}.${ext}`);
          if (img) {
            return {
              ...prev2,
              [ext]: img
            };
          }
        } catch (e) {}
        return prev2;
      }, {});
    } else if (imagePath.startsWith("data:")) {
      resolvedUrls = {
        data: imagePath // No resolver imagenes url data
      };
    } else {
      return prev;
    }

    return {
      ...prev,
      [key]: resolvedUrls
    };
  }, {});
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
