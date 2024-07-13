const EnvironmentConfig = {
  service: process.env.SERVICE ? process.env.SERVICE : "Unknown",
  env: process.env.ENVIRONMENT ? process.env.ENVIRONMENT : "Unknown",
};

export default {
  EnvironmentConfig,
};
