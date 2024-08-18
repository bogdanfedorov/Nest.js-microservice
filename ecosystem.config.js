const localhost = "localhost";

const app = (folder, env) => ({
  namespace: "NEST_TODO_DEV",
  name: folder,
  script: `yarn --cwd ./${folder} start:dev`, // OR `npm --prefix ./${folder} run start`
  env: {
    MONGO_DB_URL: "mongodb://localhost:27017/",
    NODE_ENV: "development",
    ...env,
  },
});

module.exports = {
  apps: [
    app("api-gateway", {
      PORT: "3000",
      AUTH_SERVICE_HOST: localhost,
      AUTH_SERVICE_PORT: "3001",
    }),
    app("auth-service", {
      PORT: "3001",
      JWT_SECRET: "my super puper seccret key",
      JWT_EXPIRES_IN: "1h",
    }),
    app("task-management-service", {
      PORT: "3002",
    }),
    app("user-management-service", {
      PORT: "3003",
    }),
  ],
};
