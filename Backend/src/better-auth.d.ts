declare module 'better-auth' {
  export function betterAuth(options: Record<string, unknown>): {
    handler: (request: Request) => Promise<Response>;
    api: Record<string, unknown>;
    options: Record<string, unknown>;
  };
}

declare module 'better-auth/node' {
  import type { IncomingMessage, ServerResponse } from 'http';
  export function toNodeHandler(auth: {
    handler: (req: Request) => Promise<Response>;
  }): (req: IncomingMessage, res: ServerResponse) => void;
  export function fromNodeHeaders(
    headers: Record<string, string | string[] | undefined>
  ): Headers;
}

declare module 'better-auth/adapters/mongodb' {
  export function mongodbAdapter(
    db: unknown,
    config?: { client?: unknown; usePlural?: boolean }
  ): (options: unknown) => unknown;
}
