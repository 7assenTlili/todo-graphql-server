import mongoose from "mongoose";
import config from "../../../config";

const mongoDBConfig = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default async (): Promise<mongoose.Mongoose> =>
  mongoose.connect(config.mongoDB.uri, mongoDBConfig);

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection is open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection is disconnected');
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Application terminated, Mongoose default connection is now disconnected");
  process.exit(0);
});
