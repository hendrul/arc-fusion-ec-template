export default function getProperties(site) {
  const arcSite = site || Fusion.mockConfig.arcSite;
  try {
    let siteProps = require(`../../properties/sites/*.js`);
    siteProps = siteProps[arcSite];
    return siteProps.default || siteProps;
  } catch (e) {
    let siteProps = require(`../../properties/sites/${arcSite}`);
    siteProps = siteProps.default || siteProps;
    return siteProps;
  }
}
