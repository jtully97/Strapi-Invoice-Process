// this will be removed and only used for testing, a cron job is to come...

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/invoice-process",
      handler: "client.invoiceProcessAction",
      config: {
        auth: false,
      },
    },
  ],
};
