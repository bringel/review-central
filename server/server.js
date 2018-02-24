import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';

import { sessionStore } from './session-store';

import loginController from './controllers/login-controller';
import userController from './controllers/user-controller';
import webhooksController from './controllers/webhooks-controller';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const sessionOptions = {
  store: sessionStore,
  // store: RedisStore,
  secret: 'millenium falcon', // TODO: use a randomly generated string in environment variable
  cookie: {
    // maxAge: 7 * 24 * 60 * 60 * 1000
    maxAge: 60 * 60 * 1000
  },
  rolling: true,
  saveUninitialized: true,
  resave: true
};

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.use(cookieParser());
app.use(session(sessionOptions));

app.use('/login', loginController);
app.use('/api/user', userController);
app.use('/webhooks', webhooksController);

app.listen(port, function() {
  // eslint-disable-next-line
  console.log(`app listening on port ${port}`);
});
