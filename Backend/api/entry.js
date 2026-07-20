module.exports = async (req, res) => {
  const handler = require('./entry.bundle');
  return handler(req, res);
};
