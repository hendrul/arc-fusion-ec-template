import getProperties from "../fusion-properties";

export const useFusionContext = () => {
  if (typeof window !== "undefined") {
    const { name } = window.fusionMock;
    const mockData = require(`./configs/${name}`);
    const siteProperties = getProperties(mockData.arcSite);
    return {
      ...mockData,
      deployment: i => require("../../.." + i),
      siteProperties
    };
  }
};
