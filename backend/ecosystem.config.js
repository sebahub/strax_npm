module.exports = {
  apps: [
    {
      name: 'strapi',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      exp_backoff_restart_delay: 100,
    },
  ],
};