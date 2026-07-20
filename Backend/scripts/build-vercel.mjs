import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Building Vercel bundle with esbuild...');

const outfile = path.join(__dirname, '..', 'api', 'entry.js');

await esbuild.build({
  entryPoints: [path.join(__dirname, '..', 'src', 'vercel-handler.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile,
  format: 'cjs',
  external: [],
  loader: {
    '.ts': 'ts',
  },
  resolveExtensions: ['.ts', '.js', '.json', '.mjs', '.cjs'],
});

const stats = fs.statSync(outfile);
console.log(`Bundle created: ${outfile} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
