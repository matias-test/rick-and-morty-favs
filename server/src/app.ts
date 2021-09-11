import express, { Express } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from "mongoose"
import routes from './routes';

const app: Express = express()

app.use(cors({ origin: "http://localhost:3000" }))
app.use(routes);

const PORT: string | number = process.env.PORT || 4000;

var mongoDB = process.env.REACT_APP_MONGO_URL;

if (!mongoDB) {
  throw new Error('Please configure the REACT_APP_MONGO_URL');
}

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('Connected to mongo');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch(error => {
    throw error;
  })
