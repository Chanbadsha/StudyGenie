module.exports = async (req, res) => {
  if (process.env.VERCEL && process.env.NODE_ENV === 'production') {
    const handler = require('./entry.bundle');
    return handler(req, res);
  }
  res.status(503).json({ error: 'Build script did not run' });
};
