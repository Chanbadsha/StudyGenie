import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  entryPoints: [path.join(__dirname, '..', 'src', 'vercel-handler.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: path.join(__dirname, '..', 'api', 'entry.bundle.js'),
  format: 'cjs',
  external: [],
  loader: {
    '.ts': 'ts',
  },
  resolveExtensions: ['.ts', '.js', '.json', '.mjs', '.cjs'],
});
