/* global Fusion */

const PropTypes = require("prop-types");
const React = require("react");

const EntryComponent = ({ id }) =>
  React.createElement("div", {
    id: `${EntryComponent.prefix}:${id}`,
    style: { display: "none" }
  });

EntryComponent.prefix = "fusion-static-enter";

class ExitComponent extends React.PureComponent {
  render() {
    return React.createElement("div", {
      id: `${ExitComponent.prefix}:${this.props.id}`,
      style: { display: "none" },
      ref: this.props.setRef
    });
  }
}

ExitComponent.prefix = "fusion-static-exit";

class Static extends React.PureComponent {
  constructor(props) {
    super(props);

    // only render children on the server
    this.childArray =
      typeof window === "undefined" ? [].concat(props.children || []) : [];

    this.setExitElement = this.setExitElement.bind(this);
  }

  componentDidMount() {
    if (this.exitElement) {
      const staticElements = Fusion.staticElements[this.props.id];
      if (staticElements && staticElements.length) {
        const parent = this.exitElement.parentElement;
        staticElements.forEach(staticElement => {
          const insertElement = this.props.htmlOnly
            ? staticElement.cloneNode(true)
            : staticElement;
          parent.insertBefore(insertElement, this.exitElement);
        });
      }
    }
  }

  setExitElement(exitElement) {
    this.exitElement = exitElement;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return React.createElement(React.Fragment, {}, [
      React.createElement(EntryComponent, {
        id: this.props.id,
        key: EntryComponent.prefix
      }),
      ...this.childArray,
      React.createElement(ExitComponent, {
        id: this.props.id,
        key: ExitComponent.prefix,
        setRef: this.setExitElement
      })
    ]);
  }
}

Static.propTypes = {
  id: PropTypes.string.isRequired
};

module.exports = require("./_shared/wrapper")(Static);
module.exports.EntryComponent = EntryComponent;
module.exports.ExitComponent = ExitComponent;
