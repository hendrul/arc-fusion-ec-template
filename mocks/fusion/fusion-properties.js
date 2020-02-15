export default function getProperties(site) {
  try {
    let siteProps = require(`../../properties/sites/*.js`);
    siteProps = siteProps[site];
    return siteProps.default || siteProps;
  } catch (e) {
    let siteProps = require(`../../properties/sites/${site}`);
    siteProps = siteProps.default || siteProps;
    return siteProps;
  }
}
