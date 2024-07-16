import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DataSource } from 'typeorm';

const ENV = !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}`;

const path = resolve(__dirname, `../${ENV}`);

const envConfig = dotenv.parse(readFileSync(path));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  logging: true,
  // synchronize: process.env.DB_SYNCRONIZE === 'true' ? true : false,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
});
