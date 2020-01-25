const addEventListener = (event, handler) => {};
const removeEventListener = (event, handler) => {};
const dispatchEvent = (event, value) => {};

export default function MockConsumer(Component) {
  return (...props) => {
    const consumerContext = {
      addEventListener,
      removeEventListener,
      dispatchEvent
    };
    return new Component(...consumerContext, ...props);
  };
}
