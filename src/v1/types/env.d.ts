declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: number;
      API_NAME: string;
      ROOT_ENDPOINT: string;
      MONGO_URI: string;
      SALT_ROUNDS: number;
      JWT_SECRET: string;
      SESSION_SECRET: string;
    }
  }
}

export { ChartData };
