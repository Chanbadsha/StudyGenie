let mod;

try {
  mod = require('./entry.bundle');
} catch (e) {
  mod = async (req, res) => {
    res.status(500).json({
      success: false,
      error: 'Bundle load failed',
      message: e.message,
      stack: e.stack,
    });
  };
}

const handler = mod.default || mod;

module.exports = async (req, res) => {
  try {
    await handler(req, res);
  } catch (e) {
    res.status(500).json({
      success: false,
      error: 'Handler execution failed',
      message: e.message,
      stack: e.stack,
    });
  }
};
