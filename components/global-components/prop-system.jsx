import React from "react";
import isPlainObject from "is-plain-object";

import useMediaQuery from "./use-media-query";

const mapProps = propsMapper => BaseComponent => {
  const factory = React.createFactory(BaseComponent);
  const WrappedComp = props => factory(propsMapper(props));
  WrappedComp.displayName =
    BaseComponent.displayName || BaseComponent.name || "Component";
  return WrappedComp;
};

const withPropSystem = function(Component, _opts = {}) {
  const opts = { ...(withPropSystem._opts || {}), ..._opts };
  const { includes, excludes, styled, breakpoints } = opts;
  if (
    Array.isArray(includes) &&
    Array.isArray(excludes) &&
    includes.length > 0 &&
    excludes.lenght > 0
  ) {
    // No puede agregar includes y excludes a la vez
    throw new Error("Only can use one of includes or excludes");
  }

  let Comp = Component;
  if (styled && breakpoints) {
    const system = tryImportSystem();
    if (system) {
      opts.responsiveExcludes = system.filterProps;
      const theme = {
        breakpoints: {
          keys: Object.keys(breakpoints),
          up: bp => `@media (min-width:${breakpoints[bp]}px)`
        }
      };
      Comp = styled(Comp)(system);
      // Asegurar que hay un tema con breakpoints
      // Como lo exige @material-ui/system
      Comp = mapProps(props => ({ theme, ...props }))(Comp);
    }
  }

  // prettier-ignore
  Comp = mapProps(props => responsivePropertyMapper(props, opts))(Comp);
  return mapProps(props => multisitePropertyMapper(props, opts))(Comp);
};
withPropSystem.config = opts => (withPropSystem._opts = opts);
export default withPropSystem;

const multisitePropertyMapper = (props, opts) => {
  let { sites, site, includes = [], excludes = [] } = Object.assign(
    withPropSystem._opts,
    opts
  );
  if (!sites || !site) return props;
  if (typeof sites === "function") sites = sites();
  if (typeof site === "function") site = site();
  const newProps = {};
  for (let propKey in props) {
    if (includes.includes(propKey) || !excludes.includes(propKey)) {
      const propValue = props[propKey];
      if (propKey === site) {
        if (isPlainObject(propValue)) {
          Object.assign(newProps, propValue);
        } else {
          newProps[propKey] = propValue;
        }
      } else if (sites.includes(propKey)) {
        continue;
      } else if (propValue && propValue[site]) {
        newProps[propKey] = propValue[site];
      } else {
        newProps[propKey] = propValue;
      }
    }
  }
  return newProps;
};

const responsivePropertyMapper = (props, opts) => {
  let {
    includes = [],
    excludes = [],
    responsiveExcludes = [],
    breakpoints
  } = Object.assign(withPropSystem._opts, opts);

  excludes = [...excludes, ...responsiveExcludes];
  if (!breakpoints) return props;
  if (typeof breakpoints === "function") breakpoints = breakpoints();
  const breakpointKeys = Object.keys(breakpoints);
  const matches = useBreakpointMatches(breakpoints);
  const newProps = {
    breakpoints: props.breakpoints || matches
  };
  for (let propKey in props) {
    const propValue = props[propKey];
    newProps[propKey] = propValue;
    if (propValue !== undefined && propValue !== null) {
      if (includes.includes(propKey) || !excludes.includes(propKey)) {
        if (Array.isArray(propValue)) {
          const bpKeys = breakpointKeys.slice(0, propValue.length);
          const rbpKeys = bpKeys.slice().reverse();
          const idx = rbpKeys.findIndex(
            bpKey =>
              !!breakpointKeys
                .slice(breakpointKeys.indexOf(bpKey))
                .find(k => matches[k])
          );
          if (idx >= 0) {
            newProps[propKey] = propValue.slice().reverse()[idx];
          } else {
            // Ningun breakpoint activo
            newProps[propKey] = undefined;
          }
        } else {
          const bpKeys = breakpointKeys
            .slice()
            .reverse()
            .filter(
              bpKey =>
                propValue[bpKey] !== undefined && propValue[bpKey] !== null
            );
          if (bpKeys.length > 0) {
            const bpKey = bpKeys.find(
              bpKey =>
                !!breakpointKeys
                  .slice(breakpointKeys.indexOf(bpKey))
                  .find(k => matches[k])
            );
            if (bpKey) {
              newProps[propKey] = propValue[bpKey];
            } else {
              // Ningun breakpoint activo
              newProps[propKey] = undefined;
            }
          }
        }
      }
    }
  }
  return newProps;
};

export const useBreakpointMatches = breakpoints => {
  if (!breakpoints)
    throw new Error(
      "You need to pass the breakpoints you defined for your app"
    );
  const breakpointKeys = Object.keys(breakpoints);
  return breakpointKeys.reduce(
    (prev, bp) => ({
      ...prev,
      [bp]: useMediaQuery(`@media (min-width:${breakpoints[bp]}px)`)
    }),
    {}
  );
};

function tryImportSystem() {
  try {
    const {
      breakpoints,
      compose,
      sizing,
      spacing,
      palette,
      borders,
      display,
      flexbox,
      positions,
      shadows,
      typography
    } = require("@material-ui/system");

    return breakpoints(
      compose(
        sizing,
        spacing,
        palette,
        borders,
        display,
        flexbox,
        positions,
        shadows,
        typography
      )
    );
  } catch (e) {}
}
