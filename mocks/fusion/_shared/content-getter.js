const { applyLocalEdits } = require("./local-edits");

const identity = data => data;

module.exports = (getContent, localEdits, getGlobalContent) => config => {
  const { name, filter, inherit } = config;

  if (inherit || config.global) {
    const globalContent = getGlobalContent();
    return {
      cached: globalContent,
      fetched: Promise.resolve(globalContent)
    };
  }

  const source = config.sourceName || config.source || config.contentService;

  if (!source) {
    return {
      fetched: Promise.resolve()
    };
  }

  const query = config.query || config.contentConfigValues || config.key;

  const { cached, fetched } = getContent({
    source,
    query,
    filter
  });

  const transform = config.transform || identity;
  const mutate = content =>
    applyLocalEdits(transform(content), localEdits, name);

  return {
    cached: mutate(cached),
    fetched: fetched.then(mutate)
  };
};
