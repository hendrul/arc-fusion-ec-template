/* global Fusion */
const React = require("react");
const { useContext, useState } = React;

const contentGetter = require("./_shared/content-getter");
const { useEditableContent } = require("./_shared/local-edits");
const { useComponentContext } = require("./context");

const isClient = typeof window !== "undefined";

function useContentImpl(config) {
  const [content, setContent] = useState();
  const { getContent } = useContext(Fusion.contexts.app);
  const { localEdits } = useContext(Fusion.contexts.component);
  const componentContext = useComponentContext();

  if (content) {
    return content;
  }

  const { cached, fetched } = contentGetter(
    getContent,
    localEdits,
    () => componentContext && componentContext.globalContent
  )(config);

  if (isClient) {
    fetched.then(setContent);
  }

  return cached;
}

function useContent(sourceOrConfig /* , query, filter, inherit */) {
  return sourceOrConfig instanceof Object
    ? useContentImpl(sourceOrConfig)
    : useContentImpl({
        source: arguments[0],
        query: arguments[1],
        filter: arguments[2],
        inherit: arguments[3]
      });
}

const withContent = Component => props => {
  const content = useContentImpl(props);

  return React.createElement(Component, {
    ...props,
    content
  });
};

const Content = ({ children, ...props }) => {
  const content = useContentImpl(props) || {};

  const childArray = [].concat(children || []);

  return React.createElement(
    React.Fragment,
    {},
    childArray.map((child, index) =>
      React.createElement(child, {
        key: index,
        ...content
      })
    )
  );
};

module.exports = require("./_shared/wrapper")(Content);

module.exports.useContent = useContent;
module.exports.useEditableContent = useEditableContent;
module.exports.withContent = withContent;
