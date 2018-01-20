import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { loginController } from './controllers/login-controller';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login', loginController);

app.listen(port, function() {
  // eslint-disable-next-line
  console.log(`app listening on port ${port}`);
});
