import React from "react";
import { withProps } from "recompose";
import { styled, useTheme } from "@material-ui/core/styles";
import {
  compose,
  sizing,
  spacing,
  flexbox,
  shadows,
  borders,
  palette
} from "@material-ui/system";

const PanelBase = styled("div")(
  compose(
    sizing,
    spacing,
    flexbox,
    shadows,
    borders,
    palette
  )
);

const Panel = ({
  valing,
  elevation = 1,
  backgroundColor,
  bgColor,
  ...restProps
}) => {
  const theme = useTheme();
  const mappedProps = {
    boxShadow: elevation,
    justifyContent: valing ? "center" : undefined,
    bgColor:
      bgColor ||
      backgroundColor ||
      (theme ? theme.palette.background.paper : "#fff"),
    ...restProps
  };
  return <PanelBase {...mappedProps} />;
};

const Panel2 = withProps(
  ({
    theme,
    valing,
    elevation = 1,
    backgroundColor,
    bgColor,
    ...restProps
  }) => ({
    boxShadow: elevation,
    justifyContent: valing ? "center" : undefined,
    bgColor:
      bgColor ||
      backgroundColor ||
      (theme ? theme.palette.background.paper : "#fff"),
    ...restProps
  })
)(styled("div")(compose(sizing, spacing, flexbox, shadows, borders, palette)));

Panel.defaultProps = {
  display: "flex",
  alignItems: "flex-start",
  flexDirection: "column",
  margin: "initial"
};

export default Panel;
