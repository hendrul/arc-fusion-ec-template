import tinycolor from "tinycolor2";
import {
  lighten,
  darken,
  emphasize,
  fade,
  rgbToHex
} from "@material-ui/core/styles/colorManipulator";

// Color manipulation functions
const invert = color => {
  const hex = tinycolor(color).toHexString();
  // prettier-ignore
  const colors = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
  let inverseColor = "#";
  hex
    .replace("#", "")
    .split("")
    .forEach(i => {
      const index = colors.indexOf(i);
      inverseColor += colors.reverse()[index];
    });
  return inverseColor;
};

export const colorManipulators = {
  lighten,
  darken,
  emphasize,
  fade,
  rgbToHex,
  invert
};
