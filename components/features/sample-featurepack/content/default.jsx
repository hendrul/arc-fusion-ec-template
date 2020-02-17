import React from "react";
import { useTheme } from "emotion-theming";

import Picture from "../../../global-components/picture";

export default props => {
  const theme = useTheme();
  return (
    <Picture
      hidden={{ xs: true, sm: false }}
      srcSet={theme.images.ecBuilding}
    />
  );
};
