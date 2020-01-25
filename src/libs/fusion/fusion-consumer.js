export default (() => {
  try {
    return require("fusion:consumer");
  } catch (e) {
    return require("../mocks/fusion/fusion-consumer");
  }
})();
