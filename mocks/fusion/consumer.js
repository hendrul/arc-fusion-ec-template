/* global Fusion */
const React = require("react");
const { useContext } = React;

const { useFusionContext } = require("./context");

const contentGetter = require("./_shared/content-getter");
const { useEditableContent } = require("./_shared/local-edits");

const CONSUMER_PROPS = "__fusion_consumer_props__";
const IS_MOUNTED = Symbol("is-mounted");

const isFunction = Component => Component instanceof Function;
const isClassComponent = Component =>
  Component && Component.prototype instanceof React.Component;
const getComponentName = Component =>
  Component.displayName || Component.name || "Component";

function ExtendClassComponent(Component) {
  class ConsumerExtension extends Component {
    componentDidMount(...args) {
      this[IS_MOUNTED] = true;
      super.componentDidMount && super.componentDidMount(...args);
    }

    componentWillUnmount(...args) {
      super.componentWillUnmount && super.componentWillUnmount(...args);
      this[IS_MOUNTED] = false;
    }

    get isMounted() {
      return this[IS_MOUNTED];
    }

    addEventListener(eventType, eventHandler) {
      const listeners = (this.props[CONSUMER_PROPS].eventListeners[eventType] =
        this.props[CONSUMER_PROPS].eventListeners[eventType] || []);
      listeners.push(eventHandler);
    }

    dispatchEvent(eventType, data) {
      const listeners =
        this.props[CONSUMER_PROPS].eventListeners[eventType] || [];
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (_) {}
      });
    }

    removeEventListener(eventType, eventHandler) {
      const listeners =
        this.props[CONSUMER_PROPS].eventListeners[eventType] || null;
      if (listeners) {
        this.props[CONSUMER_PROPS].eventListeners[eventType] = listeners.filter(
          listener => listener !== eventHandler
        );
      }
    }

    getContent(sourceOrConfig /* , query, filter, inherit */) {
      if (!(sourceOrConfig instanceof Object)) {
        return this.getContent({
          source: arguments[0],
          query: arguments[1],
          filter: arguments[2],
          inherit: arguments[3]
        });
      }

      return this.props[CONSUMER_PROPS].getContent(sourceOrConfig);
    }

    fetchContent(configMap) {
      this.state = this.state || {};

      Object.assign(
        this.state,
        ...Object.keys(configMap).map(name => {
          const contentConfig = configMap[name];

          const { cached, fetched } = this.getContent({
            ...contentConfig,
            name
          });
          fetched.then(data => {
            if (this.isMounted) {
              this.setState({ [name]: data });
            }
          });
          return { [name]: cached };
        })
      );
    }
  }

  for (let key in Component) {
    ConsumerExtension[key] = Component[key];
  }
  ConsumerExtension.displayName = getComponentName(Component);

  return ConsumerExtension;
}

function Consumer(Component) {
  if (this instanceof Consumer) {
    // if Consumer is used as a base-class, this function will be called as super constructor
    throw new Error("Consumer may not be used as a base class");
  }

  if (!isFunction(Component)) {
    throw new Error("Consumer must be used as an HOC");
  }

  const isExtendable = isClassComponent(Component);
  const ConsumerComponent = isExtendable
    ? ExtendClassComponent(Component)
    : Component;

  const WrappedComponent = props => {
    const context = useFusionContext();
    const { eventListeners, getContent } = useContext(Fusion.contexts.app);
    const { localEdits } = useContext(Fusion.contexts.component);
    const editableFns = useEditableContent();

    return React.createElement(ConsumerComponent, {
      ...context,
      ...editableFns,
      ...props,
      [CONSUMER_PROPS]: {
        eventListeners,
        getContent: contentGetter(
          getContent,
          localEdits,
          () => context && context.globalContent
        )
      }
    });
  };

  for (let key in Component) {
    WrappedComponent[key] = Component[key];
  }
  WrappedComponent.displayName = `FusionConsumer(${getComponentName(
    Component
  )})`;

  return WrappedComponent;
}

module.exports = Consumer;
