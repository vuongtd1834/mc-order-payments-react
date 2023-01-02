module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'payment-microservice',
      script: 'main.js',
      watch: true,
    },
  ],
};
