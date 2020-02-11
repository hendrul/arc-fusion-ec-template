import React from "react";
import mapProps from "recompose/mapProps";
import isPlainObject from "is-plain-object";

const withPropSystem = function(Component, opts) {
  let { theme, useTheme, includes, excludes, styled } =
    opts || withPropSystem._opts;
  const system = styled ? tryImportSystem() : undefined;
  theme = useTheme ? useTheme : theme;

  if (
    Array.isArray(includes) &&
    Array.isArray(excludes) &&
    includes.length > 0 &&
    excludes.lenght > 0
  ) {
    // No puede agregar includes y excludes a la vezsss
    throw new Error("Only can use one of includes or excludes");
  }
  let Comp = Component;
  if (!includes && system) {
    // Excluir las propiedades de estilo de @materia-ui/system
    // estas manejan la responsividad mediante css media queries
    excludes = [...(excludes || []), ...system.filterProps];
  }
  if (typeof styled === "function") {
    Comp = styled(Comp)(system);
  }
  // prettier-ignore
  Comp = mapProps(props => responsivePropertyMapper(props, includes, excludes))(Comp);
  return mapProps(props => multisitePropertyMapper({ theme, ...props }))(Comp);
};
withPropSystem.config = opts => (withPropSystem._opts = opts);
export default withPropSystem;

const multisitePropertyMapper = props => {
  let theme = (props || {}).theme;
  if (typeof theme === "function") theme = theme();
  const { sites, site } = theme || {};
  if (!sites || !site) return props;
  const siteKeys = Object.keys(sites);
  const siteProps = Object.values(sites);
  if (siteKeys.length === 0) return props;
  const siteKey = sites[site];
  if (!siteKey) return props;
  const newProps = {};
  for (let propKey in props) {
    const propValue = props[propKey];
    if (propKey === siteKey) {
      if (isPlainObject(propValue)) {
        Object.assign(newProps, propValue);
      } else {
        newProps[propKey] = propValue;
      }
    } else if (siteProps.includes(propKey)) {
      continue;
    } else if (propValue && propValue[siteKey]) {
      newProps[propKey] = propValue[siteKey];
    } else {
      newProps[propKey] = propValue;
    }
  }
  return newProps;
};

const responsivePropertyMapper = (props, includes, excludes) => {
  let theme = (props || {}).theme;
  if (typeof theme === "function") theme = theme();
  const breakpointKeys = ((theme || {}).breakpoints || {}).keys;
  if (!breakpointKeys) {
    console.warn("Can't find breakpoints key on theme");
    return props;
  }
  const matches = useBreakpointMatches(theme);
  const newProps = {};
  for (let propKey in props) {
    const propValue = props[propKey];
    newProps[propKey] = propValue;
    if (propValue !== undefined && propValue !== null) {
      if (
        (!includes && !excludes) ||
        (includes && includes.length > 0 && includes.includes(propKey)) ||
        (excludes && excludes.length > 0 && !excludes.includes(propKey))
      ) {
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

export const useBreakpointMatches = theme => {
  if (!theme) return {};
  const breakpoints = (theme.breakpoints || {}).keys;
  const up = (theme.breakpoints || {}).up;
  if (!breakpoints) return {};
  return breakpoints.reduce(
    (prev, bp) => ({
      ...prev,
      [bp]: useMediaQuery(up(bp))
    }),
    {}
  );
};

export function useMediaQuery(queryInput, options = {}) {
  let query = queryInput;
  query = query.replace(/^@media( ?)/m, "");

  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    noSsr = false,
    ssrMatchMedia = null
  } = options;

  const [match, setMatch] = React.useState(() => {
    if (noSsr && supportMatchMedia) {
      return matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  React.useEffect(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia(query);
    const updateMatch = () => {
      // Workaround Safari wrong implementation of matchMedia
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  return match;
}

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
