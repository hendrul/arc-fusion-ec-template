import React from "react";
import { useTheme } from "emotion-theming";

export default props => {
  const theme = useTheme();
  return <Picture hideOnScreenSize="xs" srcSet={theme.images.ecBuilding} />;
};
