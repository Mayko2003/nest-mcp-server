export interface AppEnv {
  NODE_ENV: string;
  PORT: number;
  APP_ROOT: string;

  DATABASE_TYPE: string;
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_SCHEMA: string;
}
