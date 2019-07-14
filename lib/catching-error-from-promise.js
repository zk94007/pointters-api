module.exports = (promise) => promise.catch((error) => ({ error }));
