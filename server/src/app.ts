import express, { Express } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import userRoutes from './routes/user.routes';
import charactersRoutes from './routes/characters.routes';
import authChecker from './guards/authChecker';

async function connectToMongo() {
  let mongoUri;
  if (process.env.MONGO_MEMORY_SERVER) {
    const mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
  } else {
    mongoUri = process.env.MONGO_URL;
    if (!mongoUri) {
      throw new Error('Please configure the REACT_APP_MONGO_URL');
    }
  }

  return mongoose.connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
  );
}

const app: Express = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use('/user', userRoutes);
app.use('/characters', authChecker, charactersRoutes);

const PORT: string | number = process.env.PORT || 4000;

connectToMongo()
  .then(() => {
    console.log('Connected to mongo'); // eslint-disable-line no-console
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((error) => {
    throw error;
  });
