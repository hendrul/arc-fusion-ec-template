import React from "react";

import Panel from "./panel";

export default ({ children, ...props }) => (
  <Panel
    maxWidth={{ xs: "calc(100% - 40px)", sm: "300px", md: "360px" }}
    borderRadius="5px"
    alignItems={{ xs: "center" }}
    {...props}
  >
    {children}
  </Panel>
);
