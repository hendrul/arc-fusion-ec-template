const React = require("react");

module.exports = props =>
  React.createElement("div", {
    style: {
      display: "none"
    },
    ...props
  });
