import getProperties from "fusion:properties";

export const useFusionContext = () => {
  if (typeof window !== "undefined") {
    const { name } = window.fusionMock;
    let mockData = {};
    try {
      mockData = require(`./configs/${name}`);
    } catch (e) {
      mockData = require("./configs/*.json");
      mockData = mockData[name];
    }
    if (!mockData.arcSite) {
      throw new Error("Configuración de prueba no válida");
    }
    const siteProperties = getProperties(mockData.arcSite);
    return {
      ...mockData,
      deployment: i => {
        try {
          return require("../../.." + i);
        } catch (e) {
          try {
            return require("../../../*.*")[i];
          } catch (e) {
            throw new Error(`No se encontró el recurso ${i}`);
          }
        }
      },
      siteProperties
    };
  }
};
