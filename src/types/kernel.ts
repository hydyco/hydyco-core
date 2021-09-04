export interface IKernel {
  database: NameMiddlewareOrDatabase;
  middleware: Middleware;
  plugins?: null[] | null;
}
export interface NameMiddlewareOrDatabase {}
export interface Middleware {
  globalMiddleware?: null[] | null;
  nameMiddleware: NameMiddlewareOrDatabase;
}
