type Env = {
  PORT: number;
  NODE_ENV: "development" | "production";
  JWT_SECRET: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_PRIVATE_KEY: string;
  FIREBASE_CLIENT_EMAIL: string;
};

export default Env;
