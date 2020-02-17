import merge from "lodash.merge";
import globalProps from "../../properties";
/* global Fusion */

export default function getProperties(site) {
  const arcSite = site || Fusion.mockConfig.arcSite;
  let siteProps = {};
  try {
    siteProps = require(`../../properties/sites/${arcSite}`);
    siteProps = siteProps.default || siteProps;
  } catch (e) {
    siteProps = require(`../../properties/sites/*.js`);
    siteProps = siteProps[arcSite];
    siteProps = siteProps.default || siteProps;
  }

  return merge({}, globalProps, siteProps);
}
