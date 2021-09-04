export interface IKernel {
  database: NameMiddlewareOrDatabase;
  middleware: Middleware;
  plugins: [];
}
export interface NameMiddlewareOrDatabase {}
export interface Middleware {
  globalMiddleware: [];
  nameMiddleware: NameMiddlewareOrDatabase;
}
