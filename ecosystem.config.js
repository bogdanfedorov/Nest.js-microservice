const MONGO_DB_URL = "mongodb://localhost:27017/";
const NODE_ENV = "development";
const developmentEnv = {
  MONGO_DB_URL,
  NODE_ENV,
};

// Script for npm
// npm --prefix ./example run start

module.exports = {
  apps: [
    {
      name: "api-geteway",
      script: "yarn --cwd ./api-gateway start:dev",
      env: {
        ...developmentEnv,
        PORT: "3000",
        AUTH_SERVICE_URL: "http://localhost:3001",
      },
    },
    {
      name: "auth-service",
      script: "yarn --cwd ./auth-service start:dev",
      env: {
        ...developmentEnv,
        PORT: "3001",
        JWT_SECRET: "mo6bfdc3c44facbb2edfc93504f44a70360dc88a8b8a1fb08b7fa087",
        JWT_EXPIRES_IN: "1h",
      },
    },
  ],
};

/*
 
    {
      name: "auth-service",
      script: "./app.js",
      env: {
        PORT: "3001",
        JWT_SECRET: "mo6bfdc3c44facbb2edfc93504f44a70360dc88a8b8a1fb08b7fa087",
        JWT_EXPIRES_IN: "1h",
        MONGO_DB_URL,
      },
    },
    {
      name: "task-management-service",
      env: {
        PORT: "3002",
        MONGO_DB_URL,
      },
    },
    {
      name: "user-management-service",
      env: {
        PORT: "3003",
        MONGO_DB_URL,
      },
    },




 * */
