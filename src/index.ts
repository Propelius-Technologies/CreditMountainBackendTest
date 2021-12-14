import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import path from 'path';
import dotEnv from 'dotenv';
import morgan from 'morgan';
import apiRouter from './routes';
import { DEV } from './constants';

const main = async () => {
  dotEnv.config({ path: path.join(__dirname, `../env/.${process.env.NODE_ENV}.env`) });

  // typeorm db connection
  await createConnection({
    type: 'postgres',
    // extra: { ssl: { rejectUnauthorized: false } },
    host: process.env.DBHOST,
    username: process.env.DBUSER,
    logging: DEV,
    synchronize: DEV,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [path.join(__dirname, './entities/*')],
    subscribers: [path.join(__dirname, './subscribers/*')], // database subscribers
    cli: {
      migrationsDir: 'migrations',
    },
  });

  const app = express();

  app.use(morgan('dev'));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/api', apiRouter);

  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('The application is listening on port 3000!');
  });
};

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
