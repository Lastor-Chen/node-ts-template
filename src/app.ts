import express from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express + TS');
});

app.listen(3000, () => {
  console.log('server started');
});

console.log('SOME_ENV', process.env.SOME_ENV);
