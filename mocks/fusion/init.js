import React from "react";

if (!window.Fusion) {
  window.Fusion = {
    staticElements: [],
    contexts: {
      app: React.createContext(),
      component: React.createContext()
    }
  };
}
