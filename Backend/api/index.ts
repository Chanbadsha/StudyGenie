let handler: any;

try {
  handler = require('../src/vercel-handler').default;
} catch (e: any) {
  handler = async (_req: any, res: any) => {
    res.status(500).json({
      success: false,
      message: e?.message || 'Module load error',
      stack: e?.stack,
    });
  };
}

export default handler;
