import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";

import {
  compose,
  sizing,
  spacing,
  positions,
  palette,
  borders,
  shadows,
  display,
  flexbox,
  typography
} from "@material-ui/system";

export const Flex = Box;

export const Text = styled(Typography)(
  compose(
    sizing,
    spacing,
    positions,
    display,
    shadows,
    palette,
    borders,
    flexbox,
    typography
  )
);
Text.propTypes = {
  ...sizing.propTypes,
  ...spacing.propTypes,
  ...positions.propTypes,
  ...display.propTypes,
  ...shadows.propTypes,
  ...palette.propTypes,
  ...borders.propTypes,
  ...flexbox.propTypes,
  ...typography.propTypes
};

export const If = ({ test, children }) => (test ? children : null);

export class Choose extends React.Component {
  getChildContext() {
    return { value: this.props.value };
  }
  render() {
    return this.props.children;
  }
}
Choose.childContextTypes = { value: PropTypes.any };

export const When = (props, { value }) => {
  let shouldRender = test instanceof RegExp ? test.test(value) : value === test;
  return shouldRender ? props.children : null;
};
When.contextTypes = { value: PropTypes.any };
