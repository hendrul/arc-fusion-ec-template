const React = require("react");

const getComponentName = Component =>
  Component.displayName || Component.name || "Component";

module.exports = FusionComponent => (obj, ...children) => {
  if (obj instanceof Function) {
    // FusionComponent being used as HOC to wrap obj as component
    const Component = obj;

    const WrappedComponent = props =>
      React.createElement(FusionComponent, {
        ...props,
        children: Component
      });

    for (let key in Component) {
      WrappedComponent[key] = Component[key];
    }
    WrappedComponent.displayName = `Fusion${getComponentName(
      FusionComponent
    )}(${getComponentName(Component)})`;
    WrappedComponent.propTypes = {
      ...(Component.propTypes || {}),
      ...(FusionComponent.propTypes || {})
    };

    return WrappedComponent;
  } else {
    // FusionComponent being used as function component to render obj as props
    const props = obj;

    return React.createElement(FusionComponent, {
      ...props,
      children: props.render || props.children || children
    });
  }
};
