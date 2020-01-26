/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import styled from "@material-ui/core/styles/styled";
import { useTheme } from "@material-ui/core/styles";
import Url from "url-parse";
import {
  spacing,
  flexbox,
  sizing,
  positions,
  shadows,
  display
} from "@material-ui/system";

const NoLineHeightPicture = styled("picture")({
  lineHeight: "0px"
});

const Picture = props => {
  const theme = useTheme();
  const { hideOnMedia, hideOnScreenSize, srcSet = "", ...restProps } = props;
  let types = [];
  if (typeof srcSet === "object") {
    types = Object.keys(srcSet);
  } else if (typeof srcSet === "string") {
    const { pathname } = new Url(srcSet);
    const match = pathname.match(/\.(webp|jpg|jpeg|png|gif|svg)/);
    if (match) types = [match[1]];
  }

  return (
    <NoLineHeightPicture>
      {(hideOnMedia || hideOnScreenSize) && (
        <source
          media={hideOnMedia || theme.breakpoints.down(hideOnScreenSize, false)}
          srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        />
      )}
      {types.map(type => (
        <source
          key={`source_${type}`}
          srcSet={srcSet[type] || srcSet}
          type={`image/${type}`}
        />
      ))}
      <img src={srcSet[types[0]]} {...restProps} />
    </NoLineHeightPicture>
  );
};

const StyledPicture = styled(Picture)(
  spacing,
  flexbox,
  sizing,
  positions,
  shadows,
  display
);

StyledPicture.propTypes = {
  /**
   * Conjunto de urls para cada formato de imagen disponible. Es un objeto
   * donde cada atributo es un formato de imagen y su valor es la uri para
   * acceder esa imagen, tambien puede ser una cadena con la uri a una imagen
   * especifica
   */
  srcSet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      webp: PropTypes.string,
      jpg: PropTypes.string,
      jpeg: PropTypes.string,
      png: PropTypes.string,
      gif: PropTypes.string,
      svg: PropTypes.string
    })
  ]),

  /**
   * No mostrar en pantallas con tamaño igual o menor al breakpoint
   * especificado (xs, sm, md, lg, xl)
   */
  hideOnScreenSize: PropTypes.string,

  /**
   * No mostrar en pantallas con tamaño igual o menor al media query
   * especificado
   */
  hideOnMedia: PropTypes.string,

  /**
   * Altura de la imagen. Esta propiedad es responsiva y soporta los
   * breakpoints (xs, sm, md, lg, xl)
   */
  height: PropTypes.string,

  /**
   * Ancho de la imagen. Esta propiedad es responsiva y soporta los
   * breakpoints (xs, sm, md, lg, xl)
   */
  width: PropTypes.string,

  /**
   * Texto alternativo de la imagen
   */
  alt: PropTypes.string
};

export default StyledPicture;
