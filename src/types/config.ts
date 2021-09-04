export interface IConfig {
  auth: Auth;
  cors: Cors;
  database: Database;
  server: Server;
}
export interface Auth {
  secretOrKey: string;
}
export interface Cors {}
export interface Database {
  connectionString: string;
  options: {};
}
export interface Server {
  port: number;
  logger: boolean;
  loggerMode: string;
}
