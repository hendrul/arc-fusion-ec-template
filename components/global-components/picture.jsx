/** @jsx jsx */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Url from "url-parse";

import system from "./prop-system";

const Picture = system(
  props => {
    const { hidden, srcSet = "", ...restProps } = props;

    let types = [];
    if (typeof srcSet === "object") {
      types = Object.keys(srcSet);
    } else if (typeof srcSet === "string") {
      const { pathname } = new Url(srcSet);
      const match = pathname.match(/\.(webp|jpg|jpeg|png|gif|svg)/);
      if (match) types = [match[1]];
    }
    return (
      !hidden && (
        <picture css={{ lineHeight: "0px" }}>
          {types.map(type => (
            <source
              key={`source_${type}`}
              srcSet={srcSet[type] || srcSet}
              type={`image/${type}`}
            />
          ))}
          <img src={srcSet[types[0]]} {...restProps} />
        </picture>
      )
    );
  },
  { styled }
);

Picture.propTypes = {
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

export default Picture;
