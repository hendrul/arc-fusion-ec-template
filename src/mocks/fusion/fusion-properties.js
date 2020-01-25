import elcomercio from "../../properties/sites/elcomercio";
import gestion from "../../properties/sites/gestion";

const properties = {
  elcomercio,
  gestion
};

export default function getProperties(arcSite) {
  const site = arcSite || Object.keys(properties)[0];
  const siteProperties = properties[site];
  return siteProperties;
}
