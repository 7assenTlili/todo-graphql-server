import dotenv from "dotenv";
dotenv.config();

/**
 * Safely returns the env variable {name} from process. Throws error if it does not exist.
 * @param {string} name
 * @return {string}
 */
const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env.${name}`);
  }

  return value;
};

interface IConfig {
  // port: number;
  // graphqlPath: string;
  // isDev: boolean;
  mongoDB: {
    uri: string;
  };
  MIN_PASSWORD_LENGTH: number;
  MIN_USERNAME_LENGTH: number;
  MAX_USERNAME_LENGTH: number;
  MIN_TASK_TITLE_LENGTH: number;
  MAX_TASK_TITLE_LENGTH: number;
  SECRET: string;
}

const config: IConfig = {
  // port: +env("PORT"),
  // graphqlPath: env("GRAPHQL_PATH"),
  // isDev: env("NODE_ENV") === "development",
  mongoDB: {
    // TODO build the whole URI: pw, user, host...
    uri: env("MONGODB_URI"),
  },
  MIN_PASSWORD_LENGTH: 8,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MIN_TASK_TITLE_LENGTH: 3,
  MAX_TASK_TITLE_LENGTH: 255,
  SECRET: env("APP_SECRET"),
};

export default config;
