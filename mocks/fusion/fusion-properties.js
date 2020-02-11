import files from "files.macro";

const propsDir = "../../properties/sites";
let properties = loadProperties();

export default function getProperties(arcSite) {
  const site = arcSite || Object.keys(properties)[0];
  const siteProperties = properties[site];
  return siteProperties;
}

/**
 * Importa los archivos de propiedad de todos los sitios
 * funciona en parcel y webpack
 */
function loadProperties() {
  try {
    return require("../../properties/sites/*.js");
  } catch (e) {
    let propFiles = [];
    try {
      const propFiles = JSON.parse(files(propsDir));
      propFiles = propFiles
        .filter(file => /^[A-Za-z0-9][^.]*[.](js|json)/.test(file))
        .map(file => file.substring(0, file.lastIndexOf(".")));
    } catch (e) {
      console.warn(`Error loading mock site properties files`);
    }
    return propFiles.reduce(
      (prev, file) => ({
        ...prev,
        [file]: require(`${propsDir}/${file}`)
      }),
      {}
    );
  }
}
