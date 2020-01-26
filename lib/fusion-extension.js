import React from "react";
import { useFusionContext } from "fusion:context";

import interpolate from "../utils/interpolate";
import ThemeProvider from "../../themes/mui-theme-provider";

export const Context = React.createContext();

export const FusionContextProvider = ({ app, defLang, children }) => {
  // prettier-ignore
  const fusionContext = React.useRef(useFusionContext()).current;
  const { arcSite: site, siteProperties, contextPath } = fusionContext;
  // i18n: Cargar mensajes para app/lenguaje/sitio
  const strings = React.useRef(getMessages(app, site, defLang)).current;
  const interpolatedSiteProperties = React.useRef(
    interpolate(siteProperties, {
      contextPath
      // TODO: añadir isProd y hasParamas
    })
  ).current;
  const { [app]: appProps = {} } = interpolatedSiteProperties;
  const { images = {} } = appProps;
  const resolvedImages = useImageDeployments(images);

  const finalSiteProperties = {
    ...interpolatedSiteProperties,
    [app]: {
      ...appProps,
      images: { ...resolvedImages }
    }
  };
  const finalFusionContext = {
    ...fusionContext,
    siteProperties: finalSiteProperties,
    strings
  };
  return (
    <Context.Provider value={finalFusionContext}>
      <ThemeProvider app={app}>{children}</ThemeProvider>
    </Context.Provider>
  );
};

export const useStrings = () => {
  const { strings } = React.useContext(Context);
  return strings;
};

function getMessages(app, site, lang) {
  let msgs = {};
  try {
    msgs = require(`../../i18n/${app}/${lang}/${site}`).default;
  } catch (e) {
    // Los mensajes por defecto no tienen una carpeta con codigo de lenguaje
    try {
      msgs = require(`../../i18n/${app}/${site}`).default;
    } catch (e2) {}
  }
  return {
    ...msgs,
    // Funcion utilitaria para interpolar cadenas u objetos recursivamente
    $interpolate: interpolate
  };
}

/**
 * Devuelve un mapa de todas las urls finales de las imagenes de la aplicacion,
 * una url para cada formato disponible. Estas imagenes deben almacenarse
 * dentro de la carpeta "resources" del proyecto, y su respectivo nombre y
 * ruta local en la carpeta resources se debe listar en siteProperties
 *
 * @param images Objeto con un mapa de nombre de imagenes y sus rutas
 */
const useImageDeployments = images => {
  const fusionContext = useFusionContext();
  const { deployment } = fusionContext;
  return Object.keys(images).reduce((prev, key) => {
    const imagePath = images[key];
    const imgExts = ["png", "webp", "jpg", "jpeg", "gif", "svg"];
    const regexp = new RegExp(`(.*)[.](${imgExts.join("|")})$`);
    const match = imagePath.match(regexp);
    let resolvedUrls = {};
    if (match) {
      const basepath = match[1];
      resolvedUrls = imgExts.reduce((prev2, ext) => {
        try {
          return {
            ...prev2,
            [ext]: deployment(`${basepath}.${ext}`)
          };
        } catch (e) {
          return prev2;
        }
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
